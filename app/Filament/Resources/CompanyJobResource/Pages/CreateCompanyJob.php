<?php

namespace App\Filament\Resources\CompanyJobResource\Pages;

use App\Filament\Resources\CompanyJobResource;
use App\Models\Sector;
use App\Models\WorkField;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use MatanYadaev\EloquentSpatial\Objects\Point;

class CreateCompanyJob extends CreateRecord
{
    protected static string $resource = CompanyJobResource::class;

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Job Created';
    }

    protected function handleRecordCreation(array $data): \Illuminate\Database\Eloquent\Model
    {
        $data['coordinates'] = new Point(0, 0);
        $sector = Sector::getById($data['sector_id']);
        $data['sector_id'] = $sector->id;
        $field = $sector->workFields()->find($data['work_field_id']);
        $data['work_field_id'] = $field->id;
        return static::getModel()::create($data);
    }
}
