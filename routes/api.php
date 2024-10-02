<?php

use App\Http\Controllers\CountryController;
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


Route::get('/countries', [CountryController::class, 'getCountries']);
Route::get('/jobs', [WebController::class, 'getAvailableJobs']);
Route::get('/job/{id}', [WebController::class, 'getJobDetails']);

Route::get('/sectors', [WebController::class, 'getSectors']);
Route::get('/work_fields', [WebController::class, 'getWorkFields']);

Route::get('/countries', [CountryController::class, 'getCountries']);
Route::get('/country/code/{code}', [CountryController::class, 'getCountryByCode']);
Route::get('/country/id/{id}', [CountryController::class, 'getCountryById']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
