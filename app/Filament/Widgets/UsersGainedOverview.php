<?php

namespace App\Filament\Widgets;

use App\Models\CompanyJob;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class UsersGainedOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $usersWeekly = User::query()
            ->where('created_at', '>=', now()->subDays(7))
            ->count();

        $jobsAdded = CompanyJob::query()
            ->where('created_at', '>=', now()->subDays(7))
            ->where('status', 'active')
            ->count();

        $jobsCreated = CompanyJob::query()
            ->where('created_at', '>=', now()->subDays(7))
            ->count();

        return [
            Stat::make('Users Gained in the last 7 days', $usersWeekly),
            Stat::make('Jobs created in the last 7 days', $jobsCreated),
            Stat::make('Jobs activated in the last 7 days', $jobsAdded),
        ];
    }
}
