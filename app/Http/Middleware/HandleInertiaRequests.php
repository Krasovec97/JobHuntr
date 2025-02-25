<?php

namespace App\Http\Middleware;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $ziggy = new Ziggy($group = null, $request->url());

        return array_merge(parent::share($request), [
            // Add in Ziggy routes for SSR
            'ziggy' => $ziggy->toArray(),
            'auth' => [
                'user' => Auth::guard('web')->user(),
                'company' => Auth::guard('web_business')->user(),
            ],
            'app_url'=> env('APP_URL'),
            'business_url'=> env('APP_BUSINESS_URL'),
        ]);
    }
}
