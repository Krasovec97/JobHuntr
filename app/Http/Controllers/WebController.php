<?php

namespace App\Http\Controllers;

use App\Models\CompanyJob;
use App\Models\Sector;
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
        $job->sector = Sector::getById($job->sector_id);
        $job->work_field = WorkField::getById($job->work_field_id);

        return Inertia::render('JobDetails', [
            'job' => $job
        ]);
    }

    public function getAvailableJobs(Request $request): Collection|array
    {
        $jobsQuery = CompanyJob::query()
            ->whereNotNull('posted_at')
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

        if ($params->get('sector_ids') !== null) {
            $workAreaIds = explode(',', $params->get('sector_ids'));
            $jobsQuery->whereIn('sector_id', $workAreaIds);
        }

        if ($params->get('work_fields_ids') !== null) {
            $workFieldIds = explode(',', $params->get('work_fields_ids'));
            $jobsQuery->whereIn('work_field_id', $workFieldIds);
        }

        return new Collection([
            'jobs' => $jobsQuery->get(),
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
        $job->sector = Sector::getById($job->sector_id);
        $job->work_field = WorkField::getById($job->work_field_id);

        return $job;
    }

    public function getWorkAreas(): Collection
    {
        return Sector::query()->get();
    }

    public function getWorkFields(Request $request): Collection|array
    {
        $workAreaIds = null;
        if ($request->query->get('sector_ids') !== null) {
            $workAreaIds = explode(',', $request->query->get('sector_ids'));
        }

        if($workAreaIds !== null) return WorkField::query()->whereIn('sector_id', $workAreaIds)->get();
        else return [];
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
        ])->post('https://places.googleapis.com/v1/places:searchText', [
            'textQuery' => base64_decode($request->query->get('searchString')),
        ]);


        return $response->body();
    }
}
