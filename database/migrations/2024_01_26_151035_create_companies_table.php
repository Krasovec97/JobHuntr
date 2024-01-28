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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('contact_person');
            $table->string('email');
            $table->string('short_name');
            $table->string('full_name');
            $table->string('country');
            $table->string('street');
            $table->string('city');
            $table->string('zip');
            $table->string('registration_number');
            $table->string('registration_house');
            $table->string('vat_id');
            $table->boolean('is_vat_obligated');
            $table->string('contact_phone');
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
