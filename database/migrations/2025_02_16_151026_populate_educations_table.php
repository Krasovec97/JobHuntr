<?php

use App\Models\Education;
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
        $education = new Education();
        $education->level = 0;
        $education->title = 'Early childhood education';
        $education->save();

        $education = new Education();
        $education->level = 1;
        $education->title = 'Primary education';
        $education->save();

        $education = new Education();
        $education->level = 2;
        $education->title = 'Lower secondary education';
        $education->save();

        $education = new Education();
        $education->level = 3;
        $education->title = 'Upper secondary education';
        $education->save();

        $education = new Education();
        $education->level = 4;
        $education->title = 'Post-secondary non-tertiary education';
        $education->save();

        $education = new Education();
        $education->level = 5;
        $education->title = 'Short-cycle tertiary education';
        $education->save();

        $education = new Education();
        $education->level = 6;
        $education->title = 'Bachelor’s or equivalent level';
        $education->save();

        $education = new Education();
        $education->level = 7;
        $education->title = 'Master’s or equivalent level';
        $education->save();

        $education = new Education();
        $education->level = 8;
        $education->title = 'Doctoral or equivalent level';
        $education->save();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Education::query()->truncate();
    }
};
