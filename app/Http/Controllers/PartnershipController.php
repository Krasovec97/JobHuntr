<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyPreRegistration;
use App\Models\Country;
use App\Models\User;
use App\Notifications\CompanyPreRegistrationSuccessNotification;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use MatanYadaev\EloquentSpatial\Objects\Point;

class PartnershipController extends Controller
{
    public function getAddNewCompanyPage(Request $request) {
        return Inertia::render('Auth/Sales/AddNewCompany', []);
    }

    public function getUserCompaniesPage(Request $request) {
        /** @var User $user */
        $user = Auth::user();
        $userCompanies = $user->companyPreRegistrations;

        return Inertia::render('Auth/Sales/ListCompanies', [
            'userCompanies' => $userCompanies,
        ]);
    }


    public function checkExistingCompany(Request $request)
    {
        $params = $request->json();
        $validator = Validator::make($params->all(), [
            'company_vat_id' => ['required', 'string', 'numeric']
        ]);

        if ($validator->fails()) {
            return Inertia::render('Auth/Sales/AddNewCompany', [
                'errors' => $validator->errors()->all()
            ]);
        }

        $vatId = $params->get('company_vat_id');

        $companyAlreadyRegistered = Company::query()
            ->where('vat_id', $vatId)
            ->exists();

        $companyAlreadyPreRegistered = CompanyPreRegistration::query()
            ->where('vat_id', $vatId)
            ->exists();

        if ($companyAlreadyRegistered || $companyAlreadyPreRegistered) {
            return Inertia::render('Auth/Sales/AddNewCompany', [
                'errors' => __("Company already exists in our database.")
            ]);
        }

        return Redirect::to('/sales/company');
    }

    public function createPreRegistration(Request $request)
    {
        $params = $request->json();
        $validator = Validator::make($params->all(), [
            'email' => ['required', 'unique:companies,email'],
            'company_name' => ['required'],
            'company_number' => ['required'],
            'is_vat_obligated' => ['required', 'boolean'],
            'company_vat_id' => ['required'],
            'coordinates' => ['required'],
            'address' => ['required', 'array:street,city,zip,country_code,region'],
            'notes' => ['nullable']
        ]);

        if ($validator->fails()) {
            return Inertia::render('Auth/Sales/AddNewCompany', [
                'errors' => $validator->errors()->all()
            ]);
        }

        /** @var Country $country */
        $country = Country::query()->where('code', $request->input('address')['country_code'])->first();
        $user = Auth::user();

        $preRegistration = new CompanyPreRegistration();
        $preRegistration->email = $request->get('email');
        $preRegistration->name = $request->get('company_name');
        $preRegistration->street = $request->get('address')['street'];
        $preRegistration->city = $request->get('address')['city'];
        $preRegistration->zip = $request->get('address')['zip'];
        $preRegistration->country_id = $country->id;
        $preRegistration->is_vat_obligated = $request->get('is_vat_obligated');
        $preRegistration->company_number = $request->get('company_number');
        $preRegistration->vat_id = $request->get('company_vat_id');
        $preRegistration->coordinates = new Point($request->get('coordinates')['latitude'], $request->get('coordinates')['longitude']);
        $preRegistration->referrer_id = $user->id;
        if ($params->has('notes')) $preRegistration->notes = $params->get('notes');
        $saved = $preRegistration->save();

        if ($saved) {
            Notification::route('mail', $request->get('email'))->notify(new CompanyPreRegistrationSuccessNotification($request->get('company_vat_id')));

            return Redirect::to('/sales/company');
        }

        return Inertia::render('Auth/Sales/AddNewCompany', [
            'errors' => __("An unexpected error occured. Please contact us if the problem persists!")
        ]);
    }
}
