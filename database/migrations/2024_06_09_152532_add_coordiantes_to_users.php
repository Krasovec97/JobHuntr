<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->geography('coordinates', 'point');
        });

        $user = new \App\Models\User();
        $user->email = 'mitjakrasovec1@gmail.com';
        $user->name = 'Mitja';
        $user->surname = 'Krasovec';
        $user->contact_phone = '123456789';
        $user->country = 'Slovenia';
        $user->street = 'Main Street';
        $user->city = 'Ljubljana';
        $user->zip = '1000';
        $user->email_verified_at = now();
        $user->email_verification_token = \Illuminate\Support\Facades\Hash::make('Test-123-test');
        $user->password = \Illuminate\Support\Facades\Hash::make(env('JOBHUNTR_PASS'));
        $user->coordinates = new \MatanYadaev\EloquentSpatial\Objects\Point(0, 0);
        $user->save();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('coordinates');
        });
    }
};
