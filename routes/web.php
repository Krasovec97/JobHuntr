<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WebController;
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

Route::get('/', [WebController::class, 'getWelcomePage']);

Route::get('/remote', [WebController::class, 'getRemoteJobsPage']);

Route::get('/companies', [WebController::class, 'getCompaniesPitchPage']);

Route::get('/jobs', [WebController::class, 'getJobsPage']);
Route::get('/job/{id}', [WebController::class, 'getJobDetailsPage']);
Route::get('/api/jobs', [WebController::class, 'getAvailableJobs']);
Route::get('/api/job/{id}', [WebController::class, 'getJobDetails']);


require __DIR__.'/auth.php';
