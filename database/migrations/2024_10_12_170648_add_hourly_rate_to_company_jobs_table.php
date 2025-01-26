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
            $table->double('salary_from')->nullable()->change();
            $table->double('hourly_rate')->nullable();
            $table->string('method_of_payment')->default('salary');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_jobs', function (Blueprint $table) {
            $table->double('salary_from')->default(0)->change();
            $table->dropColumn('hourly_rate');
            $table->dropColumn('method_of_payment');
        });
    }
};
