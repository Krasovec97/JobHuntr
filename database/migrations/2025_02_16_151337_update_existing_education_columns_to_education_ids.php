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
            $table->dropColumn('education');
            $table->unsignedBigInteger('education_id')->nullable();
            $table->foreign('education_id')->references('id')->on('educations');
        });

        Schema::table('company_jobs', function (Blueprint $table) {
            $table->dropColumn('preferred_education');
            $table->unsignedBigInteger('minimum_education_id')->nullable();
            $table->foreign('minimum_education_id')->references('id')->on('educations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['education_id']);
            $table->dropColumn('education_id');
            $table->string('education')->nullable();
        });

        Schema::table('company_jobs', function (Blueprint $table) {
            $table->dropForeign(['minimum_education_id']);
            $table->dropColumn('minimum_education_id');
            $table->string('education')->nullable();
        });
    }
};
