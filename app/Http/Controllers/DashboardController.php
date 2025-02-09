<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function getDashboardPage()
    {
        /** @var User $user */
        $user = User::getAuthenticatedUser();
        $userCountry = $user->country;
        $user->country_code = $userCountry->code;

        return Inertia::render('Dashboard', [
            'hasVerifiedEmail' => $user->email_verified_at !== null
        ]);
    }
}
