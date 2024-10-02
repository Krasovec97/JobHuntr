<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * @property int $id
 * @property string $email
 * @property string $name
 * @property string $surname
 * @property string $contact_phone
 * @property int $country_id
 * @property string $street
 * @property string $city
 * @property string $zip
 * @property string $password
 * @property string|null $email_verified_at
 * @property string $email_verification_token
 * @property string $date_of_birth
 * @property string $education
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 * @property Point $coordinates
 * @property boolean $admin
 */
class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'users';

    protected $casts = [
        'coordinates' => Point::class,
        'admin' => 'boolean'
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verification_token'
    ];

    protected $fillable = [
        'id',
        'email',
        'name',
        'surname',
        'contact_phone',
        'country',
        'street',
        'city',
        'zip',
        'password',
        'email_verified_at',
        'email_verification_token',
        'date_of_birth',
        'education',
        'created_at',
        'updated_at',
        'deleted_at',
        'coordinates',
        'admin',
    ];

    public static function getAuthenticatedUser():?self{
        return Auth::guard('web')->user();
    }

    public static function getById($id): ?self
    {
        return self::query()->find($id);
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->admin;
    }

    public function country(): HasOne
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }
}
