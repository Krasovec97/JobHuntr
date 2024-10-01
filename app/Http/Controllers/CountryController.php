<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CountryController extends Controller
{
    public function getCountries() {
        $countries = Cache::get('countries');

        if (!$countries) {
            $countries = Country::all();
            Cache::put('countries', $countries);
        }

        return $countries;
    }

    public function getCountryByCode(string $countryCode) {
        return Country::query()->where('code', $countryCode)->first();
    }

    public function getCountryById(int $id) {
        return Country::query()->findOrFail($id);
    }
}
