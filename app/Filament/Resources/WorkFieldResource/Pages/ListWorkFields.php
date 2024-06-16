<?php

namespace App\Filament\Resources\WorkFieldResource\Pages;

use App\Filament\Resources\WorkFieldResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListWorkFields extends ListRecords
{
    protected static string $resource = WorkFieldResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
