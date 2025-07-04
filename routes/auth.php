<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobApplicationsController;
use App\Http\Controllers\PartnershipController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserResumeController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;


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
    Route::get('/user/resume', [UserResumeController::class, 'getUserResume']);
    Route::post('/user/resume', [UserResumeController::class, 'uploadUserResume']);
    Route::post('/job/{id}/apply', [JobApplicationsController::class, 'applyForJob']);
    Route::get('/user/applications', [JobApplicationsController::class, 'getUserApplications']);


    Route::middleware('auth_sales')->group(function () {
        Route::get('/sales', [PartnershipController::class, 'getSalesDashboardPage']);
        Route::get('/sales/companies', [PartnershipController::class, 'getUserCompaniesPage']);
        Route::get('/sales/company', [PartnershipController::class, 'getAddNewCompanyPage']);
        Route::post('/sales/company', [PartnershipController::class, 'getSalesJobDetailsPage']);

        Route::post('/company/preregistration/validate', [PartnershipController::class, 'checkExistingCompany']);
        Route::post('/company/preregistration', [PartnershipController::class, 'createPreRegistration']);
    });
});
