<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserResume;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserResumeController extends Controller
{
    public function getUserResume(Request $request)
    {
        $user = User::getAuthenticatedUser();
        $userResume = UserResume::query()->where('user_id', $user->id)->first();

        if ($userResume !== null) {
            $file = Storage::get('/resumes/' . $userResume->file_name);

            if ($file !== null) {
                return response($file, 200, [
                    'Content-Type' => 'application/pdf'
                ]);
            }
        }

        return response(__("You have not uploaded any resume yet. Upload your resume now to showcase your skills and experience!"), 404);
    }

    /**
     * @throws FileNotFoundException
     */
    public function uploadUserResume(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'resume' => ['required', 'mimes:pdf', 'max:5120']
        ]);

        if ($validator->fails()) {
            return new JsonResponse([
                'errors' => $validator->errors()->all()
            ], 400);
        }
        $user = User::getAuthenticatedUser();
        if ($user === null) {
            return Inertia::render('Auth/Login');
        }

        if ($user->resume !== null) {
            Storage::delete('/resumes/'.$user->resume->file_name);
            $user->resume()->delete();
        }

        $resume = $request->file('resume');
        $userResume = new UserResume();
        $userResume->user_id = $user->id;
        $userResume->file_name = md5($resume->getClientOriginalName()) . '.' . $resume->getClientOriginalExtension();
        $userResume->original_file_name = $resume->getClientOriginalName();
        $userResume->content = base64_encode($resume->get());
        $resumeSaved = $userResume->save();
        if ($resumeSaved) {
            Storage::putFileAs('/resumes', $resume, $userResume->file_name);

            return new JsonResponse([]);
        }

        Log::error('Error saving resume. For user with id: ' . $user->id);
        return new JsonResponse([
            'errors' => [__("Error saving resume.")]
        ], 400);
    }
}
