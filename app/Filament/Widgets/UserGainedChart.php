<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class UserGainedChart extends ChartWidget
{
    protected static ?string $heading = 'Users gained by days';
    protected int | string | array $columnSpan = 2;

    protected static ?array $options = [
        'plugins' => [
            'legend' => [
                'display' => false,
            ],
        ],
        'scales' => [
            'yAxes' => [
                'ticks' => [
                    'precision' => 0
                ]
            ]
        ]
    ];
    protected function getData(): array
    {
        $users = User::query()
            ->selectRaw('count(*) as count, date(created_at) as date')
            ->where('created_at', '>=', Carbon::now()->subMonth())
            ->groupByRaw('date(created_at)')
            ->get();

        // Generate an array of all dates within the past year
        $dateRange = Carbon::now()->subMonth()->daysUntil(Carbon::now())->toArray();

        // Create an associative array from the results with the date as the key
        $userData = $users->keyBy('date')->map(function ($item) {
            return $item->count;
        });

        // Map over the date range and fill missing dates with 0
        $result = collect($dateRange)->map(function ($date) use ($userData) {
            $formattedDate = $date->format('Y-m-d'); // Format to match the query result
            return [
                'date' => $formattedDate,
                'count' => $userData->get($formattedDate, 0), // Default to 0 if date is missing
            ];
        });

        $data = $result->pluck('count')->toArray();
        $labels = $result->pluck('date')->toArray();

        return [
            'datasets' => [
                [
                    'data' => $data,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
