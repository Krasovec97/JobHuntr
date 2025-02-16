<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * @property int $id
 * @property string $email
 * @property string $name
 * @property int $country_id
 * @property int $referrer_id
 * @property string $street
 * @property string $city
 * @property string $zip
 * @property string $company_number
 * @property string $vat_id
 * @property string $notes
 * @property boolean $is_vat_obligated
 * @property Point $coordinates
 * @property string $registration_completed_at
 * @property string $created_at
 * @property string $updated_at
 *
 */
class CompanyPreRegistration extends Model
{
    protected $table = 'company_pre_registrations';

    protected $casts = [
        'is_vat_obligated' => 'boolean',
        'coordinates' => Point::class
    ];

    public function referrer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'referrer_id', 'id');
    }
}
