<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyJob;
use App\Models\JobApplication;
use App\Models\User;
use App\Models\UserResume;
use App\Notifications\NewApplicantNotification;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;

class JobApplicationsController extends Controller
{
    public function applyForJob(Request $request, int $jobId)
    {
        $validator = Validator::make($request->all(), [
            'cover' => ['nullable', 'string', 'max:255']
        ]);

        if ($validator->fails()) {
            return new JsonResponse([
                "errors" => $validator->errors()->all()
            ], 400);
        }

        $user = User::getAuthenticatedUser();
        if ($user === null) abort(401);

        if (!$user->canApply()) {
            return new JsonResponse([
                "errors" => [__("Please complete all required steps before applying for jobs")]
            ], 400);
        }

        $job = CompanyJob::getById($jobId);

        if ($job === null) {
            return new JsonResponse([
                "errors" => [__("This job was not found.")]
            ], 400);
        }

        if ($job->expires_at < Carbon::now()) {
            return new JsonResponse([
                "errors" => [__("This job listing has expired.")]
            ], 400);
        }

        if ($job->status === 'draft') {
            return new JsonResponse([
                "errors" => [__("This job listing is not open for applications.")]
            ], 400);
        }

        $coverLetter = $request->get('cover', null);


        $existingJobApplication = JobApplication::query()->where('user_id', $user->id)->where('job_id', $job->id)->first();
        if ($existingJobApplication !== null) {
            return new JsonResponse([]);
        }

        $jobApplication = new JobApplication();
        $jobApplication->user_id = $user->id;
        $jobApplication->job_id = $job->id;
        if ($coverLetter !== null) $jobApplication->cover_letter = $coverLetter;
        $saved = $jobApplication->save();

        if ($saved) {
            /** @var UserResume $userResume */
            $userResume = $user->resume;


            Notification::route('mail', $job->application_mail)
                ->notify((new NewApplicantNotification($job->title, $userResume->file_name, $userResume->original_file_name, $coverLetter))->locale('sl'));
            return new JsonResponse([]);
        }

        return new JsonResponse([
            "errors" => [__("Error saving job application, please try again.")]
        ], 400);
    }

    public function getUserApplications() {
        $user = User::getAuthenticatedUser();

        $applications = JobApplication::query()
            ->select('job_applications.id', 'job_applications.created_at', 'company_jobs.title', 'company_jobs.employment_type', 'company_jobs.work_location', 'companies.name as company_name')
            ->where('user_id', $user->id)
            ->join('company_jobs', 'company_jobs.id', '=', 'job_applications.job_id')
            ->join('companies', 'companies.id', '=', 'company_jobs.company_id')
            ->orderBy('job_applications.id', 'desc')
            ->get();

        return $applications;
    }
}
