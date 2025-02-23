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
        return Inertia::render('Auth/Profile/Dashboard');
    }
}
