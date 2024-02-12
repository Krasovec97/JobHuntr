<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessProfileController extends Controller
{
    public function displayDashboard()
    {
        return Inertia::render('Business/Dashboard');
    }
}
