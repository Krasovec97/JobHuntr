<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use MatanYadaev\EloquentSpatial\Objects\Point;

class UserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function displayRegisterPage(): Response
    {
        return Inertia::render('Register');
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'unique:users,email'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'password' => ['required', 'min:8'],
            'contact_phone' => ['required'],
            'coordinates' => ['required'],
            'address' => ['required', 'array:street,city,zip,country'],
        ]);

        if ($validator->fails()) {
            return Inertia::render('Register', [
                'errors' => $validator->errors()->all()
            ]);
        }

        $user = new User();
        $user->email = $request->get('email');
        $user->name = $request->get('first_name');
        $user->surname = $request->get('last_name');
        $user->contact_phone = $request->get('contact_phone');
        $user->street = $request->get('address')['street'];
        $user->city = $request->get('address')['city'];
        $user->zip = $request->get('address')['zip'];
        $user->country = $request->get('address')['country'];
        $user->password = Hash::make($request->get('password'));
        $user->email_verification_token = Str::orderedUuid()->toString();
        $user->coordinates = new Point($request->get('coordinates')['latitude'], $request->get('coordinates')['longitude']);
        $saved = $user->save();

        if ($saved) {
            $user->notify(new EmailVerificationNotification($user->email_verification_token));

            Return Inertia::render('Register');
        }

        Return Inertia::render('Register', [
            'errors' => __("An unexpected error occured. Please contact us if the problem persists!")
        ]);

    }

    public function update(Request $request) {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required'],
            'street' => ['required'],
            'city' => ['required'],
            'country' => ['required'],
            'zip' => ['required'],
            'education' => ['nullable'],
            'date_of_birth' => ['nullable'],
            'contact_phone' => ['required']
        ]);

        if ($validator->fails()) {
            return Inertia::render('Dashboard', [
                'errors' => $validator->errors()->all()
            ]);
        }

        $user = User::getById($request->get('user_id'));
        $user->contact_phone = $request->get('contact_phone');
        $user->street = $request->get('street');
        $user->city = $request->get('city');
        $user->zip = $request->get('zip');
        $user->country = $request->get('country');
        $user->date_of_birth = $request->get('date_of_birth');
        $user->education = $request->get('education');
        $user->save();

        return Redirect::to('/dashboard');
    }

    public function verifyUserEmail(Request $request, string $token)
    {
        /** @var User|Company $entity */
        $entity = User::query()->where('email_verification_token', $token)->first();
        if ($entity === null) $entity = Company::query()->where('email_verification_token', $token)->first();

        if ($entity === null) abort(404);

        $entity->email_verified_at = now();
        $entity->save();

        return Inertia::render('EmailVerified');
    }
}
