<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use \Illuminate\Support\Facades;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $jobQuery = \App\Models\Job::query();

    $newestJobs = $jobQuery
        ->whereNotNull('posted_at')
        ->orderBy('posted_at', 'desc')
        ->limit(4)
        ->get();

    $draftedJobs = $jobQuery
        ->where('status', 'draft')
        ->orderBy('created_at', 'desc')
        ->limit(6)
        ->get(['title']);


    return Inertia::render('Welcome', [
        'newestJobs' => $newestJobs,
        'draftedJobs' => $draftedJobs
    ]);
});

Route::get('/remote', function () {
    return Inertia::render('RemoteJobs');
});


require __DIR__.'/auth.php';
