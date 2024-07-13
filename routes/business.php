<?php /** @noinspection ALL */

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BusinessProfileController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\WorkareaController;
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
\Illuminate\Support\Facades\App::setLocale(request()->getPreferredLanguage(['sl', 'en'] ?? 'en'));

Route::get('/', [AuthenticatedSessionController::class, 'renderBusinessLoginView']);

Route::post('/login', [AuthenticatedSessionController::class, 'loginCompany']);

Route::middleware('auth_business')->group(function () {
    Route::get('/dashboard', [BusinessProfileController::class, 'displayDashboard']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'logoutCompany']);

    Route::get('/jobs', [JobsController::class, 'getJobsPage']);

    Route::get('/jobs/new', [JobsController::class, 'getJobCreationPage']);
    Route::post('/jobs/new', [JobsController::class, 'postNewJob']);

    Route::get('/job/{jobId}/update', [JobsController::class, 'getJobCreationPage']);
    Route::post('/job/{jobId}/update', [JobsController::class, 'postNewJob']);
    Route::post('/job/{jobId}/activate', [JobsController::class, 'activateJobListing']);
    Route::get('/job/{id}', [JobsController::class, 'getJobDetailsPage']);

    Route::get('/work_area/{id}/fields', [WorkareaController::Class, 'getWorkFields']);

    Route::get('/account', [BusinessProfileController::Class, 'displayAccountSettings']);
    Route::post('/account', [BusinessProfileController::Class, 'updateAccountSettings']);

    Route::get('/google/places', [WebController::class, 'getGooglePlacesResponse']);
});
