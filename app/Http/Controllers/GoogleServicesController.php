<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class GoogleServicesController extends Controller
{
    public function autoComplete(Request $request): Response|JsonResponse
    {
        $params = $request->json();

        $validator = Validator::make($params->all(), [
            'input' => ['required', 'string'],
            'session' => ['required', 'string']
        ]);

        if ($validator->fails()) {
            return new JsonResponse([
                'error' => $validator->errors()->all()
            ], 400);
        }

        $googleApiKey = config('jobhuntr.google.api_key');
        $sessionId = $params->get('session');

        return Http::post("https://places.googleapis.com/v1/places:autocomplete?key=$googleApiKey&sessionToken=$sessionId", [
            'input' => $params->get('input'),
            "includedRegionCodes" => ["si"]
        ]);
    }

    public function getPlace(Request $request, string $placeId) {
        $googleApiKey = config('jobhuntr.google.api_key');
        return Http::get("https://places.googleapis.com/v1/places/$placeId?fields=addressComponents,location&key=$googleApiKey");
    }
}
