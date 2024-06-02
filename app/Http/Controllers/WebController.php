<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebController extends Controller
{
    public function getWelcomePage()
    {
        $draftedJobs = Job::query()
            ->where("status", "draft")
            ->orderBy("created_at", "desc")
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

    public function getRemoteJobsPage()
    {
        return Inertia::render('RemoteJobs');
    }

    public function getCompaniesPitchPage()
    {
        return Inertia::render('Companies');
    }

    public function getJobsPage()
    {
        return Inertia::render('JobSearch');
    }

    public function getAvailableJobs(Request $request)
    {

        $jobsQuery = Job::query()
            ->whereNotNull('posted_at');

        $jobs = $jobsQuery->get();

        return $jobs;
    }
}
