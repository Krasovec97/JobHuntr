<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->geography('coordinates', 'point');
        });

        $company = new \App\Models\Company();
        $company->contact_person = 'JobHuntr';
        $company->email = 'info@jobhuntr.co';
        $company->short_name = 'JobHuntr';
        $company->full_name = 'JobHuntr';
        $company->country = 'Slovenia';
        $company->street = 'JobHuntr';
        $company->city = 'JobHuntr';
        $company->zip = 'JobHuntr';
        $company->company_number = '12345678';
        $company->registration_house = 'JobHuntr';
        $company->vat_id = '12345678';
        $company->email_verified_at = now();
        $company->email_verification_token = '112345678test';
        $company->is_vat_obligated = false;
        $company->contact_phone = '+12345678';
        $company->password = Hash::make(env('JOBHUNTR_PASS'));
        $company->coordinates = new \MatanYadaev\EloquentSpatial\Objects\Point(0, 0);
        $company->save();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('coordinates');
        });
    }
};
