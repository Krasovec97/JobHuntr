<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function displayRegisterPage(): Response
    {
        return Inertia::render('Register');
    }

    public function createUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'unique:users,email'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'street' => ['required'],
            'city' => ['required'],
            'country' => ['required'],
            'zip' => ['required'],
            'password' => ['required', 'min:8'],
            'contact_phone' => ['required'],
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
        $user->street = $request->get('street');
        $user->city = $request->get('city');
        $user->zip = $request->get('zip');
        $user->country = $request->get('country');
        $user->password = Hash::make($request->get('password'));
        $user->email_verification_token = Str::orderedUuid()->toString();
        $saved = $user->save();

        if ($saved) {
            $user->notify(new EmailVerificationNotification($user->email_verification_token));

            Return Inertia::render('Register');
        }

        Return Inertia::render('Register', [
            'errors' => __("An unexpected error occured. Please contact us if the problem persists!")
        ]);

    }
}
