<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\WorkArea;
use App\Models\WorkField;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WebController extends Controller
{
    public function getWelcomePage(): Response
    {
        $draftedJobsQuery = Job::query()
            ->whereNot('title', 'like', '%test%')
            ->where("status", "draft");

        $totalDraftedJobs = $draftedJobsQuery->count();
        $getRandomInteger = rand(1, ($totalDraftedJobs - 4));

        $draftedJobs = $draftedJobsQuery
            ->orderBy("created_at", "desc")
            ->skip($getRandomInteger)
            ->limit(4)
            ->get();

        $newestJobs = Job::query()
            ->whereNotNull('posted_at')
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
        $job = Job::getById($id);

        if ($job === null) {
            abort(404);
        }

        return Inertia::render('JobDetails', [
            'job' => $job
        ]);
    }

    public function getAvailableJobs(Request $request): Collection|array
    {
        $jobsQuery = Job::query()
            ->whereNotNull('posted_at');

        $params = $request->query;

        if ($params->get('location') !== null) {
            $location = explode(',', $params->get('location'));
            $jobsQuery->whereIn('work_location', $location);
        }

        if ($params->get('employment_type') !== null) {
            $employmentType = explode(',', $params->get('employment_type'));
            $jobsQuery->whereIn('employment_type', $employmentType);
        }

        return $jobsQuery->get();
    }

    public function getJobDetails(Request $request, int $id): Job
    {
        /** @var Job $job */
        $job = Job::getById($id);

        if ($job === null) {
            abort(404);
        }

        $job->company_data = $job->company;
        $job->work_area = WorkArea::getById($job->work_area_id);
        $job->work_field = WorkField::getById($job->work_field_id);

        return $job;
    }
}
