<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BusinessProfileController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\JobsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebController;

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

Route::get('/', [AuthenticatedSessionController::class, 'renderBusinessLoginView']);

Route::post('/login', [AuthenticatedSessionController::class, 'loginCompany']);

Route::middleware('auth_business')->group(function () {
    Route::get('/dashboard', [BusinessProfileController::class, 'displayDashboard']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'logoutCompany']);

    Route::get('/jobs', [JobsController::class, 'getJobsPage']);

    Route::get('/jobs/new', [JobsController::class, 'getJobCreationPage']);
    Route::post('/jobs/new', [JobsController::class, 'updateCreateJob']);

    Route::get('/job/{jobId}/update', [JobsController::class, 'getJobCreationPage']);
    Route::post('/job/{jobId}/update', [JobsController::class, 'updateCreateJob']);
    Route::post('/job/{jobId}/activate', [JobsController::class, 'activateJobListing']);
    Route::post('/job/{jobId}/cancel', [JobsController::class, 'cancelJobListing']);
    Route::get('/job/{id}', [JobsController::class, 'getJobDetailsPage']);

    Route::get('/account', [BusinessProfileController::Class, 'displayAccountSettings']);
    Route::post('/account', [BusinessProfileController::Class, 'updateAccountSettings']);

    Route::get('/google/places', [WebController::class, 'getGooglePlacesResponse']);
});
