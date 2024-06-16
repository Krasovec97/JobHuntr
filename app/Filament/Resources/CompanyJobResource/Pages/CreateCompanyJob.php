<?php

namespace App\Filament\Resources\CompanyJobResource\Pages;

use App\Filament\Resources\CompanyJobResource;
use App\Models\WorkArea;
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
        $workArea = WorkArea::getById($data['work_area_id']);
        $data['work_area_id'] = $workArea->id;
        $field = $workArea->workFields()->find($data['work_field_id']);
        $data['work_field_id'] = $field->id;
        return static::getModel()::create($data);
    }
}
