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
        Schema::table('company_jobs', function (Blueprint $table) {
            $table->dropColumn('sector_id');
        });

        Schema::table('work_fields', function (Blueprint $table) {
            $table->dropColumn('sector_id');
        });

        Schema::dropIfExists('sectors');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('sectors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('company_jobs', function (Blueprint $table) {
            $table->foreignId('sector_id')->constrained('sectors');
        });

        Schema::table('work_fields', function (Blueprint $table) {
            $table->foreignId('sector_id')->constrained('sectors');
        });
    }
};
