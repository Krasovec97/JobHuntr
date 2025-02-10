<?php

namespace App\Filament\Resources\CompanyPreRegistrationResource\Pages;

use App\Filament\Resources\CompanyPreRegistrationResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCompanyPreRegistrations extends ListRecords
{
    protected static string $resource = CompanyPreRegistrationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
