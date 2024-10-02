<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

App::setLocale(request()->getPreferredLanguage(['sl', 'en'] ?? 'en'));


Route::middleware('guest')->group(function () {
    Route::get('/register', [UserController::class, 'displayRegisterPage'])->name('register');
    Route::post('/register/personal', [UserController::class, 'create']);
    Route::post('/register/company', [CompanyController::class, 'create']);


    Route::get('/login', [AuthenticatedSessionController::class, 'renderPersonalLoginView'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'loginUser']);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'getDashboardPage']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'logoutPersonal'])->name('logout');
    Route::post('/user/update', [UserController::class, 'update']);
});
