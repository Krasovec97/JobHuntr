<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class TestController extends Controller
{
    public function test (Request $request) {
        Notification::route('mail', 'info@jobhuntr.co')->notify(new EmailVerificationNotification('TEST'));
    }
}
