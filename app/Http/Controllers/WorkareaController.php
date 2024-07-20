<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkareaController extends Controller
{
    public function getWorkFields(Request $request, int $workAreaId) {
        $workarea = Sector::getById($workAreaId);

        return $workarea->workFields;
    }
}
