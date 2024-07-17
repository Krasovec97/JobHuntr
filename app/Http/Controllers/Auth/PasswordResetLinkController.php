<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\PasswordReset;
use App\Models\User;
use App\Notifications\PasswordResetNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function getForgottenPasswordPage(): Response
    {
        return Inertia::render('ForgottenPassword', [
            'status' => session('status'),
        ]);
    }


    public function handleUserPasswordResetRequest(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $requestedEmail = $request->get('email');

        $entity = User::query()->where('email', $requestedEmail)->first();
        if ($entity === null) $entity = Company::query()->where('email', $requestedEmail)->first();
        if ($entity !== null) {
            /** @var PasswordReset $passwordReset */
            $passwordReset = PasswordReset::query()
                ->where('entity_id', $entity->id)
                ->orderBy('id')
                ->first();

            if ($passwordReset === null || $passwordReset->created_at < now()->subMinutes(30) ) {
                /** @var User|Company $entity */
                $passwordReset = new PasswordReset();
                $passwordReset->entity_id = $entity->id;
                $passwordReset->entity_type = get_class($entity);
                $passwordReset->token = Str::orderedUuid();
                $passwordReset->save();

                $entity->notify(new PasswordResetNotification($passwordReset->token));
            }
        }

        return response('', 200);
    }

    public function resetPasswordPage(Request $request, string $token) {
        $passwordReset = PasswordReset::query()
            ->where('token', $token)
            ->first();

        $linkExpired = null;
        if ($passwordReset === null || $passwordReset->created_at < now()->subMinutes(30)) {
            $linkExpired = __("Password reset link has expired.");
        }

        return Inertia::render('ResetPassword', [
            'linkExpired' => $linkExpired,
            'entity_id' => $passwordReset->entity_id,
            'entity_type' => $passwordReset->entity_type,
        ]);
    }

    public function resetEntityPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return Inertia::render('ResetPassword', [
                'errors' => $validator->errors()->all()
            ]);
        }

        if ($request->get('entity_type') === 'App\Models\User') {
            $entity = User::query()->find($request->get('entity_id'));
        } else {
            $entity = Company::query()->find($request->get('entity_id'));
        }

        if ($entity === null) abort(404);

        /** @var User|Company $entity */
        $entity->password = Hash::make($request->get('password'));
        $entity->save();

        return response('', 200);
    }
}
