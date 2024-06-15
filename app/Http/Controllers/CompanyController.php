<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use App\Notifications\EmailVerificationNotification;
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
            'company_full_name' => ['required'],
            'company_short_name' => ['required'],
            'registration_house' => ['required'],
            'company_number' => ['required'],
            'street' => ['required'],
            'city' => ['required'],
            'country' => ['required'],
            'zip' => ['required'],
            'password' => ['required', 'min:8'],
            'contact_phone' => ['required'],
            'contact_person' => ['required'],
            'is_vat_obligated' => ['required', 'boolean'],
            'company_vat_id' => ['required'],
            'coordinates' => ['required'],
        ]);

        if ($validator->fails()) {
            return Inertia::render('Register', [
                'errors' => $validator->errors()->all()
            ]);
        }

        $company = New Company();
        $company->email = $request->get('email');
        $company->full_name = $request->get('company_full_name');
        $company->short_name = $request->get('company_short_name');
        $company->contact_phone = $request->get('contact_phone');
        $company->contact_person = $request->get('contact_person');
        $company->street = $request->get('street');
        $company->city = $request->get('city');
        $company->zip = $request->get('zip');
        $company->is_vat_obligated = $request->get('is_vat_obligated');
        $company->registration_house = $request->get('registration_house');
        $company->company_number = $request->get('company_number');
        $company->vat_id = $request->get('company_vat_id');
        $company->country = $request->get('country');
        $company->password = Hash::make($request->get('password'));
        $company->email_verification_token = Str::orderedUuid()->toString();
        $company->coordinates = new Point($request->get('coordinates')['latitude'], $request->get('coordinates')['longitude']);
        $saved = $company->save();

        if ($saved) {
//            $company->notify(new EmailVerificationNotification($company->email_verification_token));

            Return Inertia::render('Register');
        }

        Return Inertia::render('Register', [
            'errors' => __("An unexpected error occured. Please contact us if the problem persists!")
        ]);
    }
}
