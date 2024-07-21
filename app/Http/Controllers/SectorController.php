<?php

namespace App\Http\Controllers;

use App\Models\Sector;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectorController extends Controller
{

    public function getSectors()
    {
        return Sector::all();
    }
    public function getWorkFields(Request $request, int $sectorId) {
        $sector = Sector::getById($sectorId);

        return $sector->workFields;
    }
}
