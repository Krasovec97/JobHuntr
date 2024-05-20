<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Job;
use App\Models\WorkArea;
use App\Models\WorkField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class JobsController extends Controller
{
    public function getJobsPage(Request $request)
    {
        $companyJobs = Company::getAuthenticatedCompany()->jobs;

        foreach ($companyJobs as $job) {
            $job->work_field = WorkField::query()->find($job->work_field_id);
        }

        return Inertia::render('Business/Jobs', [
            'companyJobs' => $companyJobs
        ]);
    }

    public function getNewJobPage(Request $request, int $jobId = null)
    {
        $workAreas = WorkArea::query()->get();
        $job = null;
        if ($jobId !== null) {
            $job = Job::query()->find($jobId);
            $job->work_area = WorkArea::query()->find($job->work_area_id);
            $job->work_field = WorkField::query()->find($job->work_field_id);
        }

        return Inertia::render('Business/NewJob', [
            'workAreas' => $workAreas,
            'job' => $job
        ]);
    }

    public function postNewJob(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "job_title" => ["required"],
            "employment_type" => ["required"],
            "job_description" => ["required"],
            "work_area_id" => ["required", "exists:work_areas,id"],
            "work_field_id" => ["required", "exists:work_fields,id"],
            "work_location" => ["required"],
            "num_of_positions" => ["required", "numeric"],
            "yearly_salary" => ["required", "numeric"],
            "currency" => ["required"],
            "gender" => ["required"],
            "education" => ["required"]
        ]);

        if ($validator->fails()) {
            $workAreas = WorkArea::query()->get();

            return Inertia::render('Business/NewJob', [
                'errors' => $validator->errors()->all(),
                'workAreas' => $workAreas

            ]);
        }

        $company = Company::getAuthenticatedCompany();

        $job = new Job();
        $job->title = $request->input('job_title');
        $job->description = $request->input('job_description');
        $job->employment_type = $request->input('employment_type');
        $job->work_area_id = $request->input('work_area_id');
        $job->work_field_id = $request->input('work_field_id');
        $job->work_location = $request->input('work_location');
        $job->open_positions_count = $request->input('num_of_positions');
        $job->salary = $request->input('yearly_salary');
        $job->salary_currency = strtoupper($request->input('currency'));
        $job->preferred_gender = $request->input('gender');
        $job->preferred_education = $request->input('education');
        $job->company_id = $company->id;
        $job->status = 'draft';
        $jobSaved = $job->save();

        if ($jobSaved) {
            return Inertia::render('Business/JobDetails', [
                "job" => $job
            ]);
        } else {
            $workAreas = WorkArea::query()->get();

            return Inertia::render('Business/NewJob', [
                'errors' => [__("An unexpected error has occurred.")],
                'workAreas' => $workAreas
            ]);
        }
    }

    public function getJobDetailsPage(Request $request, int $jobId) {
        $job = Job::getById($jobId);

        if ($job === null) {
            abort(404);
        }

        $job->work_area = WorkArea::query()->find($job->work_area_id);
        $job->work_field = WorkField::query()->find($job->work_field_id);

        return Inertia::render('Business/JobDetails', [
            "job" => $job
        ]);
    }
}
