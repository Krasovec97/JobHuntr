<?php /** @noinspection PhpMultipleClassDeclarationsInspection */

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyJob;
use App\Models\Country;
use App\Models\Education;
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
        $companyJobs = Company::getAuthenticatedCompany()->jobs()->orderByDesc('id')->get();

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
            /** @var CompanyJob $job */
            $job = CompanyJob::query()->find($jobId);
            if ($job->country_id !== null) $job->country_code = $job->country->code;
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
    public function updateCreateJob(Request $request, int $jobId = null): Response|\Symfony\Component\HttpFoundation\Response
    {
        $validator = Validator::make($request->all(), [
            "job_title" => ["required"],
            "employment_type" => ["required"],
            "expectations" => ["required"],
            "benefits" => ["required"],
            "assignments" => ["required"],
            "intro" => ["required"],
            "method_of_payment" => ["required"],
            "work_field_id" => ["required", "exists:work_fields,id"],
            "work_location" => ["required"],
            "num_of_positions" => ["required", "numeric"],
            "salary_from" => ["nullable", "numeric"],
            "salary_to" => ["nullable", "numeric"],
            "hourly_rate" => ["nullable", "numeric"],
            "currency" => ["required"],
            "education_id" => ["nullable"],
            "application_mail" => ["string", "nullable"],
            "address" => ["nullable", "array:street,city,zip,country_code,region"],
        ]);

        if ($validator->fails()) {
            return Inertia::render('Business/NewJob', [
                'errors' => $validator->errors()->all()
            ]);
        }

        $company = Company::getAuthenticatedCompany();

        $job = CompanyJob::query()->find($jobId);
        if ($job === null) {
            $job = new CompanyJob();
        }
        $job->title = $request->input('job_title');
        $job->expectations = $request->input('expectations');
        $job->benefits = $request->input('benefits');
        $job->assignments = $request->input('assignments');
        $job->intro = $request->input('intro');
        $job->employment_type = $request->input('employment_type');
        $job->work_field_id = $request->input('work_field_id');
        $job->work_location = $request->input('work_location');
        $job->open_positions_count = $request->input('num_of_positions');
        $job->method_of_payment = $request->input('method_of_payment');
        $job->salary_from = $request->input('salary_from');
        $job->salary_to = $request->input('salary_to');
        $job->hourly_rate = $request->input('hourly_rate');
        $job->salary_currency = strtoupper($request->input('currency'));
        if ($request->get('education_id') !== null) $job->minimum_education_id = $request->input('education_id');
        $job->company_id = $company->id;
        $job->status = 'draft';
        $job->application_mail = $request->input('application_mail') ?? $company->email;

        if ($request->get('coordinates')) {
            $job->coordinates = new Point($request->get('coordinates')['latitude'], $request->get('coordinates')['longitude']);
        } else {
            $job->coordinates = new Point($company->coordinates->latitude, $company->coordinates->longitude);
        }

        if ($request->input('address')) {
            $country = Country::query()->where('code', $request->input('address')['country_code'])->first();

            $job->street = $request->input('address')['street'] ?? $company->street;
            $job->city = $request->input('address')['city'] ?? $company->city;
            $job->zip = $request->input('address')['zip'] ?? $company->zip;
            $job->region = $request->input('address')['region'];
            $job->country_id = $country->id ?? $company->country_id;
        }

        $jobSaved = $job->save();


        if ($jobSaved) {
            return Inertia::location('/job/' . ($jobId ?? $job->id));
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

        return Inertia::render('Business/JobDetails', [
            "job" => $job
        ]);
    }
}
