<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function renderPersonalLoginView(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     * @throws ValidationException
     */
    public function loginUser(LoginRequest $request): RedirectResponse
    {
        $request->authenticatePersonal();

        $request->session()->regenerate();

        return redirect()->intended('/jobs');
    }

    /**
     * Destroy an authenticated session.
     */
    public function logoutPersonal(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function renderBusinessLoginView(): Response
    {
        return Inertia::render('Business/Login', [
            'status' => session('status'),
            'app_url' => env('APP_URL')

        ]);
    }

    /**
     * Handle an incoming authentication request.
     * @throws ValidationException
     */
    public function loginCompany(LoginRequest $request): RedirectResponse
    {
        $request->authenticateBusiness();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function logoutCompany(Request $request): RedirectResponse
    {
        Auth::guard('web_business')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
