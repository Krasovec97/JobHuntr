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
 * @property string $employment_type
 * @property float $salary_from
 * @property float $salary_to
 * @property float $hourly_rate
 * @property string $salary_currency
 * @property int $work_field_id
 * @property string $work_location
 * @property string $minimum_education_id
 * @property int $open_positions_count
 * @property string $method_of_payment
 * @property string $status
 * @property string $benefits
 * @property string $expectations
 * @property string $assignments
 * @property string $intro
 * @property string $expires_at
 * @property string $posted_at
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 * @property string $city
 * @property string $zip
 * @property string $street
 * @property string $region
 * @property int $country_id
 * @property string $application_mail
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
        'employment_type',
        'salary_from',
        'salary_to',
        'benefits',
        'expectations',
        'assignments',
        'intro',
        'salary_currency',
        'work_field_id',
        'work_location',
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
        'application_mail'
    ];

    public static function getById($id): CompanyJob|Model
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

    public function country(): HasOne
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }

    public function education(): HasOne
    {
        return $this->hasOne(Education::class, 'id', 'minimum_education_id');
    }

    public function toArray()
    {
        $array = parent::toArray();

        if ($this->minimum_education_id !== null) {
            $array['education'] = __(Education::query()->find($this->minimum_education_id)->title);
        }
        $array['work_field'] = WorkField::query()->find($this->work_field_id);
        $array['company_data'] = $this->company()->first();
        $array['country'] = $this->country()->first()->name;

        return $array;
    }
}
