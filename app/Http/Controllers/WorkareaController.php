<?php

namespace App\Http\Controllers;

use App\Models\WorkArea;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkareaController extends Controller
{
    public function getWorkFields(Request $request, int $workAreaId) {
        $workarea = WorkArea::getById($workAreaId);

        return $workarea->workFields;
    }
}
