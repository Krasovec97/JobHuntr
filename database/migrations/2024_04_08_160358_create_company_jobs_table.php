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
        Schema::create('company_jobs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->references('id')->on('companies');
            $table->string('title');
            $table->mediumText('description');
            $table->string('employment_type');
            $table->double('salary');
            $table->string('salary_currency', 5);
            $table->unsignedBigInteger('work_area_id');
            $table->foreign('work_area_id')->references('id')->on('work_areas');
            $table->unsignedBigInteger('work_field_id');
            $table->foreign('work_field_id')->references('id')->on('work_fields');
            $table->string('work_location');
            $table->string('preferred_gender');
            $table->string('preferred_education');
            $table->unsignedInteger('open_positions_count');
            $table->string('status');
            $table->string('job_application_mail');
            $table->string('expires_at')->nullable();
            $table->string('posted_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_jobs', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
        });
        Schema::dropIfExists('jobs');
    }
};
