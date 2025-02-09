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
        Schema::table('companies', function (Blueprint $table) {
            $table->string('name')->nullable();
            $table->unsignedInteger('referrer_id')->nullable();
            $table->foreign('referrer_id')->references('id')->on('users');
            $table->dropColumn('short_name');
            $table->dropColumn('registration_house');
            $table->dropColumn('full_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->string('short_name')->nullable();
            $table->string('full_name')->nullable();
            $table->dropForeign(['referrer_id']);
            $table->dropColumn('referrer_id');
            $table->string('registration_house')->nullable();
        });
    }
};
