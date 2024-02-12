<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BusinessProfileController;
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

Route::get('/', [AuthenticatedSessionController::class, 'renderBusinessLoginView']);

Route::post('/login', [AuthenticatedSessionController::class, 'loginCompany']);

Route::middleware('auth_business')->group(function () {
    Route::get('/dashboard', [BusinessProfileController::class, 'displayDashboard']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'logoutCompany']);
});
