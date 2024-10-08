<?php

namespace App\Filament\Resources\CompanyJobResource\Pages;

use App\Filament\Resources\CompanyJobResource;
use App\Models\WorkField;
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
        $field = WorkField::query()->find($data['work_field_id']);
        $data['work_field_id'] = $field->id;
        return static::getModel()::create($data);
    }
}
