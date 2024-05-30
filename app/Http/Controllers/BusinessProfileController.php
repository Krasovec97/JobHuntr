<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BusinessProfileController extends Controller
{
    public function displayDashboard()
    {
        return Inertia::render('Business/Dashboard');
    }

    public function displayAccountSettings(Request $request) {
        $company = Company::getAuthenticatedCompany();

        return Inertia::render('Business/AccountSettings', [
            'company' => $company
        ]);
    }

    public function updateAccountSettings(Request $request) {
        $validator = Validator::make($request->all(), [
            'contact_person' => ['string', 'required'],
            'contact_phone' => ['string', 'required'],
            'is_vat_obligated' => ['boolean', 'required']
        ]);
        $company = Company::getAuthenticatedCompany();

        if ($validator->fails()) {
            return Inertia::render('Business/AccountSettings', [
                'company' => $company,
                'errors' => $validator->errors()->all()
            ]);
        }

        $company->contact_person = $request->input('contact_person');
        $company->contact_phone = $request->input('contact_phone');
        $company->is_vat_obligated = $request->input('is_vat_obligated');
        $saved = $company->save();

        if ($saved) {
            return Inertia::render('Business/AccountSettings', [
                'company' => $company
            ]);
        }

        return Inertia::render('Business/AccountSettings', [
            'company' => $company,
            'errors' => __("Error saving company data, please try again. If this error persists, please contact us!")
        ]);
    }
}
