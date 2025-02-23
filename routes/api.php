<?php

use App\Http\Controllers\CountryController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\GoogleServicesController;
use App\Http\Controllers\PartnershipController;
use App\Http\Controllers\WebController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// "Api" Routes

Route::get('/countries', [CountryController::class, 'getCountries']);

Route::get('/work_fields', [WebController::class, 'getWorkFields']);
Route::get('/employment_types', [WebController::class, 'getAvailableEmploymentTypes']);

Route::get('/countries', [CountryController::class, 'getCountries']);
Route::get('/country/code/{code}', [CountryController::class, 'getCountryByCode']);

Route::post('/google/places/autocomplete', [GoogleServicesController::class, 'autoComplete']);
Route::get('/google/places/{placeId}', [GoogleServicesController::class, 'getPlace']);

Route::get('/educations', [EducationController::class, 'getEducations']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
