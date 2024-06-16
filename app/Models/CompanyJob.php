<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * @property int $id
 * @property int $company_id
 * @property string $title
 * @property string $description
 * @property string $employment_type
 * @property float $salary
 * @property string $salary_currency
 * @property int $work_area_id
 * @property int $work_field_id
 * @property string $work_location
 * @property string $preferred_gender
 * @property string $preferred_education
 * @property int $open_positions_count
 * @property string $status
 * @property string $expires_at
 * @property string $posted_at
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 * @property string $city
 * @property string $zip
 * @property string $street
 * @property string $country
 * @property string $job_application_mail
 * @property Point $coordinates
 */
class CompanyJob extends Model
{
    use HasFactory;

    protected $casts = [
        'coordinates' => Point::class
    ];

    protected $fillable = [
        'id',
        'company_id',
        'title',
        'description',
        'employment_type',
        'salary',
        'salary_currency',
        'work_area_id',
        'work_field_id',
        'work_location',
        'preferred_gender',
        'preferred_education',
        'open_positions_count',
        'status',
        'expires_at',
        'posted_at',
        'created_at',
        'updated_at',
        'deleted_at',
        'city',
        'zip',
        'street',
        'country',
        'coordinates',
        'job_application_mail'
    ];

    public static function getById($id): ?CompanyJob
    {
        return self::query()->find($id);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function workField(): HasOne
    {
        return $this->hasOne(WorkField::class, 'id', 'work_field_id');
    }

    public function workArea(): HasOne
    {
        return $this->hasOne(WorkArea::class, 'id', 'work_area_id');
    }
}
