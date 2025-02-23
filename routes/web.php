<?php

use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\GoogleServicesController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

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

if(env('APP_ENV') !== 'production') {
    Route::get('/test', [TestController::class, 'test']);
}

Route::get('/', [WebController::class, 'getWelcomePage']);
Route::get('/verify/{token}', [UserController::class, 'verifyUserEmail']);

Route::get('/remote', [WebController::class, 'getRemoteJobsPage']);

Route::get('/companies', [WebController::class, 'getCompaniesPitchPage']);

Route::get('/jobs', [WebController::class, 'getJobsPage']);
Route::get('/job/{id}', [WebController::class, 'getJobDetailsPage']);

Route::get('/google/places', [WebController::class, 'getGooglePlacesResponse']);

Route::get('/forgotten/password', [PasswordResetLinkController::class, 'getForgottenPasswordPage']);
Route::post('/forgotten/password', [PasswordResetLinkController::class, 'handleUserPasswordResetRequest']);

Route::get('/password/reset/{token}', [PasswordResetLinkController::class, 'resetPasswordPage']);
Route::post('/password/reset/', [PasswordResetLinkController::class, 'resetEntityPassword']);

// "Api" Routes
Route::get('/api/jobs', [WebController::class, 'getAvailableJobs']);
Route::get('/api/job/{id}', [WebController::class, 'getJobDetails']);


require __DIR__.'/auth.php';
