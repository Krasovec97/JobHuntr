<?php

namespace App\Http\Controllers;

use App\Models\CompanyJob;
use App\Models\WorkField;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class WebController extends Controller
{
    public function getWelcomePage(): Response
    {
        $draftedJobsQuery = CompanyJob::query()
            ->whereNot('title', 'like', '%test%')
            ->where("status", "draft");

        $totalDraftedJobs = $draftedJobsQuery->count();
        $getRandomInteger = rand(1, ($totalDraftedJobs - 4));

        $draftedJobs = $draftedJobsQuery
            ->orderBy("created_at", "desc")
            ->skip($getRandomInteger)
            ->limit(4)
            ->get();

        $newestJobs = CompanyJob::query()
            ->where('expires_at', '>', now())
            ->whereNotNull('posted_at')
            ->whereNot("status", "draft")
            ->orderBy('posted_at', 'desc')
            ->limit(4)
            ->get();

        return Inertia::render('Welcome', [
            'newestJobs' => $newestJobs,
            'draftedJobs' => $draftedJobs
        ]);
    }

    public function getRemoteJobsPage(): Response
    {
        return Inertia::render('RemoteJobs');
    }

    public function getCompaniesPitchPage(): Response
    {
        return Inertia::render('Companies');
    }

    public function getJobsPage(): Response
    {
        return Inertia::render('JobSearch');
    }

    public function getJobDetailsPage(Request $request, int $id): Response
    {
        $job = CompanyJob::getById($id);

        if ($job === null) {
            abort(404);
        }

        $job->job_company = $job->company;
        $job->work_field = WorkField::getById($job->work_field_id);
        $job->country = $job->country()->first()->name;

        return Inertia::render('JobDetails', [
            'job' => $job
        ]);
    }

    public function getAvailableJobs(Request $request): Collection|array
    {
        $jobsQuery = CompanyJob::query()
            ->whereNotNull('posted_at')
            ->where('expires_at', '>', now())
            ->whereNot('status', 'draft');

        $totalJobsCount = $jobsQuery->count();

        $params = $request->query;

        if ($params->get('location') !== null) {
            $location = explode(',', $params->get('location'));
            $jobsQuery->whereIn('work_location', $location);
        }

        if ($params->get('employment_type') !== null) {
            $employmentType = explode(',', $params->get('employment_type'));
            $jobsQuery->whereIn('employment_type', $employmentType);
        }

        if ($params->get('search_string') !== null) {
            $searchString = $params->get('search_string');
            $jobsQuery->where(DB::raw('UPPER(title)'), 'like', '%' . $searchString . '%');
        }

        if ($params->get('work_fields_ids') !== null) {
            $workFieldIds = explode(',', $params->get('work_fields_ids'));
            $jobsQuery->whereIn('work_field_id', $workFieldIds);
        }

        if ($params->get('radius') !== null && $params->get('current_coords') !== null) {
            $radius = $params->getInt('radius');
            $currentCoords = explode(',', $params->get('current_coords'));
            $longitude = $currentCoords[0];
            $latitude = $currentCoords[1];

            $jobsQuery->whereRaw("FLOOR(CAST(ST_DistanceSpheroid(ST_Centroid(coordinates)::geometry,ST_GeomFromText('POINT($longitude $latitude)', 4326),'SPHEROID[\"WGS 8\",6378137,298.257223563]') / 1000 AS numeric)) < $radius");
        }

        $jobs = $jobsQuery
            ->orderBy('created_at', 'desc')
            ->get();

        return new Collection([
            'jobs' => $jobs,
            'total_jobs_count' => $totalJobsCount
        ]);
    }

    public function getJobDetails(Request $request, int $id): CompanyJob
    {
        /** @var CompanyJob $job */
        $job = CompanyJob::getById($id);

        if ($job === null) {
            abort(404);
        }

        $job->company_data = $job->company;
        $job->work_field = WorkField::getById($job->work_field_id);
        $job->country = $job->country()->first()->name;

        return $job;
    }

    public function getWorkFields(Request $request): Collection|array
    {
        $params = $request->query;
        $returnAll = $params->get('all', false);
        if ($returnAll) {
            return WorkField::all();
        }

        $availableWorkFields = CompanyJob::query()
            ->where('status', 'active')
            ->where('expires_at', '>', now()->toDateTimeString())
            ->get('work_field_id');

        return WorkField::query()
            ->whereIn('id', $availableWorkFields)
            ->get();
    }

    public function getGooglePlacesResponse(Request $request)
    {
        $queryParams = $request->query;

        if (!$queryParams->has('searchString')) {
            return response('Missing parameters', 404);
        }

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Goog-Api-Key' => env('GOOGLE_MAPS_API'),
            'X-Goog-FieldMask' => 'places.formattedAddress,places.addressComponents,places.location'
        ])->post('https://places.googleapis.com/v1/places:autocomplete', [
            "input" => base64_decode($request->query->get('searchString')),
        ]);


        return $response->body();
    }
}
