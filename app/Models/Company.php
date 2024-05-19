<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

/**
 * @property int $id
 * @property string $email
 * @property string $full_name
 * @property string $short_name
 * @property string $contact_phone
 * @property string $contact_person
 * @property string $country
 * @property string $street
 * @property string $city
 * @property string $zip
 * @property string $vat_id
 * @property string $password
 * @property string|null $email_verified_at
 * @property string $email_verification_token
 * @property string $registration_number
 * @property string $registration_house
 * @property boolean $is_vat_obligated
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 * @property HasMany $jobs
 */
class Company extends Authenticatable
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $casts = [
        'is_vat_obligated' => 'boolean'
    ];

    protected $hidden = [
        'password',
        'email_verification_token',
        'email_verified_at',
    ];

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class, 'company_id');
    }

    public static function getAuthenticatedCompany(): self
    {
        return Auth::guard('web_business')->user();
    }
}
