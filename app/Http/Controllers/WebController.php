<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebController extends Controller
{
    public function getWelcomePage()
    {
        $jobQuery = \App\Models\Job::query();

        $newestJobs = $jobQuery
            ->whereNotNull('posted_at')
            ->orderBy('posted_at', 'desc')
            ->limit(4)
            ->get();

        $draftedJobs = $jobQuery
            ->where('status', 'draft')
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->get(['title']);


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
