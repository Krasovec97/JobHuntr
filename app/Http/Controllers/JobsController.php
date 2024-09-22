<?php /** @noinspection PhpMultipleClassDeclarationsInspection */

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyJob;
use App\Models\Sector;
use App\Models\WorkField;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
    use MatanYadaev\EloquentSpatial\Objects\Point;

class JobsController extends Controller
{
    /**
     * Retrieve the jobs page for a company.
     *
     * @param Request $request The HTTP request object.
     *
     * @return Response The Inertia response object.
     */
    public function getJobsPage(Request $request): Response
    {
        $companyJobs = Company::getAuthenticatedCompany()->jobs()->orderBy('id')->get();

        foreach ($companyJobs as $job) {
            $job->work_field = WorkField::query()->find($job->work_field_id);
        }

        return Inertia::render('Business/Jobs', [
            'companyJobs' => $companyJobs
        ]);
    }

    /**
     * Retrieve the new job page.
     *
     * @param Request $request The HTTP request.
     * @param int|null $jobId The job ID, defaults to null.
     * @return Response The Inertia response.
     */
    public function getJobCreationPage(Request $request, int $jobId = null): Response
    {
        $job = null;
        if ($jobId !== null) {
            $job = CompanyJob::query()->find($jobId);
            $job->sector = Sector::query()->find($job->sector_id);
            $job->work_field = WorkField::query()->find($job->work_field_id);
        }

        return Inertia::render('Business/NewJob', [
            'job' => $job
        ]);
    }

    /**
     * Create or update a job.
     *
     * @param Request $request The HTTP request.
     * @param int|null $jobId The job ID, defaults to null.
     */
    public function postNewJob(Request $request, int $jobId = null): Response|\Symfony\Component\HttpFoundation\Response
    {
        $validator = Validator::make($request->all(), [
            "job_title" => ["required"],
            "employment_type" => ["required"],
            "job_description" => ["required"],
            "sector_id" => ["required", "exists:sectors,id"],
            "work_field_id" => ["required", "exists:work_fields,id"],
            "work_location" => ["required"],
            "num_of_positions" => ["required", "numeric"],
            "yearly_salary" => ["required", "numeric"],
            "currency" => ["required"],
            "education" => ["required"],
            "application_mail" => ["string", "nullable"],
            "address" => ["required", "array:street,city,zip,country"]
        ]);

        if ($validator->fails()) {
            return Inertia::render('Business/NewJob', [
                'errors' => $validator->errors()->all()
            ]);
        }

        $company = Company::getAuthenticatedCompany();

        $job = CompanyJob::query()->find($jobId);
        if ($job === null)$job = new CompanyJob();
        $job->title = $request->input('job_title');
        $job->description = $request->input('job_description');
        $job->employment_type = $request->input('employment_type');
        $job->sector_id = $request->input('sector_id');
        $job->work_field_id = $request->input('work_field_id');
        $job->work_location = $request->input('work_location');
        $job->open_positions_count = $request->input('num_of_positions');
        $job->salary = $request->input('yearly_salary');
        $job->salary_currency = strtoupper($request->input('currency'));
        $job->preferred_education = $request->input('education');
        $job->street = $request->input('address')['street'] ?? $company->street;
        $job->city = $request->input('address')['city'] ?? $company->city;
        $job->zip = $request->input('address')['zip'] ?? $company->zip;
        $job->country = $request->input('address')['country'] ?? $company->country;
        $job->company_id = $company->id;
        $job->status = 'draft';
        $job->application_mail = $request->input('application_mail') ?? $company->email;

        if ($request->get('coordinates')) {
            $job->coordinates = new Point($request->get('coordinates')['latitude'], $request->get('coordinates')['longitude']);
        } else {
            $job->coordinates = new Point($company->coordinates->latitude, $company->coordinates->longitude);
        }

        $jobSaved = $job->save();


        if ($jobSaved) {
            return Inertia::location('/job/' . $jobId);
//            return Inertia::render('Business/JobDetails', [
//                'job' => $job
//            ]);
        } else {
            return Inertia::render('Business/NewJob', [
                'errors' => [__("An unexpected error has occurred.")]
            ]);
        }
    }

    /**
     * Retrieve the job details page.
     *
     * @param Request $request The HTTP request.
     * @param int $jobId The job ID.
     * @return Response The Inertia response.
     */
    public function getJobDetailsPage(Request $request, int $jobId): Response
    {
        $job = CompanyJob::getById($jobId);

        if ($job === null) {
            abort(404);
        }

        $job->sector = Sector::query()->find($job->sector_id);
        $job->work_field = WorkField::query()->find($job->work_field_id);

        return Inertia::render('Business/JobDetails', [
            "job" => $job
        ]);
    }

    /**
     * Activate a job listing.
     *
     * @param Request $request The HTTP request.
     * @param int $jobId The job ID.
     * @return Response The Inertia response.
     */
    public function activateJobListing(Request $request, int $jobId): Response
    {
        $job = CompanyJob::getById($jobId);

        if ($job === null) {
            abort(404);
        }

        $job->status = 'active';
        $job->posted_at = now();
        $job->expires_at = $job->expires_at ?? Carbon::now()->addMonth();
        $job->save();

        $job->sector = Sector::query()->find($job->sector_id);
        $job->work_field = WorkField::query()->find($job->work_field_id);

        return Inertia::render('Business/JobDetails', [
            "job" => $job
        ]);
    }

    /**
     * Activate a job listing.
     *
     * @param Request $request The HTTP request.
     * @param int $jobId The job ID.
     * @return Response The Inertia response.
     */
    public function cancelJobListing(Request $request, int $jobId): Response
    {
        $job = CompanyJob::getById($jobId);

        if ($job === null) {
            abort(404);
        }

        $job->status = 'draft';
        $job->posted_at = null;
        $job->save();

        $job->sector = Sector::query()->find($job->sector_id);
        $job->work_field = WorkField::query()->find($job->work_field_id);

        return Inertia::render('Business/JobDetails', [
            "job" => $job
        ]);
    }
}
