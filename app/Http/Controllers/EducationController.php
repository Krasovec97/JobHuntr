<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function getEducations(): Collection|array
    {
        return Education::query()
            ->orderBy('level')
            ->get();
    }
}
