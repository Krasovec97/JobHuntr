<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyPreRegistration;
use App\Models\Country;
use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use MatanYadaev\EloquentSpatial\Objects\Point;

class CompanyController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'unique:companies,email'],
            'company_name' => ['required'],
            'company_number' => ['required'],
            'password' => ['required', 'min:8'],
            'contact_phone' => ['required'],
            'contact_person' => ['required'],
            'is_vat_obligated' => ['required', 'boolean'],
            'company_vat_id' => ['required'],
            'coordinates' => ['required'],
            'address' => ['required', 'array:street,city,zip,country_code'],
            "referrer_id" => ['nullable', 'numeric']
        ]);

        if ($validator->fails()) {
            return Inertia::render('Register', [
                'errors' => $validator->errors()->all()
            ]);
        }

        $country = Country::query()->where('code', $request->input('address')['country_code'])->first();

        $company = new Company();
        $company->email = $request->get('email');
        $company->name = $request->get('company_name');
        $company->contact_phone = $request->get('contact_phone');
        $company->contact_person = $request->get('contact_person');
        $company->street = $request->get('address')['street'];
        $company->city = $request->get('address')['city'];
        $company->zip = $request->get('address')['zip'];
        $company->country_id = $country->id;
        $company->is_vat_obligated = $request->get('is_vat_obligated');
        $company->company_number = $request->get('company_number');
        $company->vat_id = $request->get('company_vat_id');
        $company->password = Hash::make($request->get('password'));
        $company->email_verification_token = Str::orderedUuid()->toString();
        $company->coordinates = new Point($request->get('coordinates')['latitude'], $request->get('coordinates')['longitude']);
        if ($request->get('referrer_id') !== null) $company->referrer_id = $request->get('referrer_id');
        $saved = $company->save();

        if ($saved) {
            $company->notify(new EmailVerificationNotification($company->email_verification_token));

            if ($request->get('referrer_id') !== null) {
                /** @var CompanyPreRegistration $preRegistration */
                $preRegistration = CompanyPreRegistration::query()
                    ->where('vat_id', $request->get('company_vat_id'))
                    ->first();


                $preRegistration->registration_completed_at = Carbon::now();
                $preRegistration->save();
            }

            Return Inertia::render('Register');
        }

        return Inertia::render('Register', [
            'errors' => __("An unexpected error occured. Please contact us if the problem persists!")
        ]);
    }

    public function displayPrefilledRegistrationPage(Request $request, string $vatId)
    {
        /** @var CompanyPreRegistration $preRegistration */
        $preRegistration = CompanyPreRegistration::query()->where('vat_id', $vatId)->first();
        if ($preRegistration === null) abort(404);
        /** @var Country $country */
        $country = Country::getById($preRegistration->country_id);

        $preRegistration->country_code = $country->code;

        return Inertia::render('Register', [
            'company' => $preRegistration,
        ]);
    }
}
