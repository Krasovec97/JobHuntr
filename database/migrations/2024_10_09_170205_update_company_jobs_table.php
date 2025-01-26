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
            $table->dropColumn('description');
            $table->dropColumn('salary');
            $table->double('salary_from')->default(0);
            $table->double('salary_to')->nullable();
            $table->mediumText('benefits')->nullable();
            $table->mediumText('expectations')->nullable();
            $table->mediumText('assignments')->nullable();
            $table->string('intro')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_jobs', function (Blueprint $table) {
            $table->mediumText('description');
            $table->double('salary');
            $table->dropColumn('salary_from');
            $table->dropColumn('salary_to');
            $table->dropColumn('benefits');
            $table->dropColumn('expectations');
            $table->dropColumn('assignments');
            $table->dropColumn('intro');
        });
    }
};
