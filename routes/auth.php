<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PartnershipController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

App::setLocale(request()->getPreferredLanguage(['sl', 'en'] ?? 'sl'));


Route::middleware('guest')->group(function () {
    Route::get('/register', [UserController::class, 'displayRegisterPage'])->name('register');
    Route::post('/register/personal', [UserController::class, 'create']);
    Route::post('/register/company', [CompanyController::class, 'create']);
    Route::get('/preregister/{vatId}', [CompanyController::class, 'displayPrefilledRegistrationPage']);

    Route::get('/login', [AuthenticatedSessionController::class, 'renderPersonalLoginView'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'loginUser']);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'getDashboardPage']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'logoutPersonal'])->name('logout');
    Route::post('/user/update', [UserController::class, 'update']);


    Route::middleware('auth_sales')->group(function () {
        Route::get('/sales', [PartnershipController::class, 'getSalesDashboardPage']);
        Route::get('/sales/jobs', [PartnershipController::class, 'getSalesJobsPage']);
        Route::get('/sales/job', [PartnershipController::class, 'getAddNewCompanyPage']);
        Route::post('/sales/job', [PartnershipController::class, 'getSalesJobDetailsPage']);

        Route::post('/company/preregistration/validate', [PartnershipController::class, 'checkExistingCompany']);
        Route::post('/company/preregistration', [PartnershipController::class, 'createPreRegistration']);
    });
});
