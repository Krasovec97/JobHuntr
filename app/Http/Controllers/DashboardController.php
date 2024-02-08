<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function getDashboardPage()
    {
        $user = User::getAuthenticatedUser();

        return Inertia::render('Dashboard', [
            'user' => $user,
            'hasVerifiedEmail' => $user->email_verified_at !== null
        ]);
    }
}
