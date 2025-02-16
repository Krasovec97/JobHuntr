<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * @property int $id
 * @property string $email
 * @property string $name
 * @property string $contact_phone
 * @property string $contact_person
 * @property int $country_id
 * @property int $referrer_id
 * @property string $street
 * @property string $city
 * @property string $zip
 * @property string $vat_id
 * @property string $password
 * @property string|null $email_verified_at
 * @property string $email_verification_token
 * @property string $company_number
 * @property boolean $is_vat_obligated
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 * @property Point $coordinates
 * @property HasMany $jobs
 * @property string $company_verified_at
 */
class Company extends Authenticatable
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $casts = [
        'is_vat_obligated' => 'boolean',
        'coordinates' => Point::class
    ];

    protected $hidden = [
        'password',
        'email_verification_token',
    ];

    protected $fillable = [
        'id',
        'email',
        'name',
        'contact_phone',
        'contact_person',
        'country_id',
        'street',
        'city',
        'zip',
        'vat_id',
        'password',
        'email_verified_at',
        'email_verification_token',
        'company_number',
        'is_vat_obligated',
        'created_at',
        'updated_at',
        'deleted_at',
        'coordinates',
        'jobs',
        'company_verified_at',
    ];

    public function jobs(): HasMany
    {
        return $this->hasMany(CompanyJob::class, 'company_id');
    }

    public function country(): HasOne
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }

    public static function getAuthenticatedCompany(): self
    {
        return Auth::guard('web_business')->user();
    }

    public function toArray()
    {
        $array = parent::toArray();

        $array['coordinates'] = [
            'latitude' => $this->coordinates->latitude,
            'longitude' => $this->coordinates->longitude
        ];

        return $array;
    }
}
