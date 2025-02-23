<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Contracts\Translation\HasLocalePreference;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

/**
 * @property int $id
 * @property string $email
 * @property string $name
 * @property string $surname
 * @property string $contact_phone
 * @property int $country_id
 * @property string $gender
 * @property string $street
 * @property string $city
 * @property string $zip
 * @property string $password
 * @property string|null $email_verified_at
 * @property string $email_verification_token
 * @property string $date_of_birth
 * @property integer $education_id
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 * @property Point $coordinates
 * @property boolean $admin
 * @property boolean $sales
 */
class User extends Authenticatable implements FilamentUser, HasLocalePreference
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasSpatial;

    protected $table = 'users';

    protected $casts = [
        'coordinates' => Point::class,
        'admin' => 'boolean',
        'sales' => 'boolean',
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
        'sales'
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

    public function companyPreRegistrations(): HasMany
    {
        return $this->hasMany(CompanyPreRegistration::class, 'referrer_id', 'id');
    }

    public function education(): HasOne
    {
        return $this->hasOne(Education::class, 'id', 'education_id');
    }

    public function preferredLocale(): string
    {
        return strtolower($this->country->code);
    }

    public function resume(): hasOne
    {
        return $this->hasOne(UserResume::class, 'user_id', 'id');
    }

    public function appliedJobs(): hasMany
    {
        return $this->hasMany(JobApplication::class, 'user_id', 'id');
    }

    public function canApply(mixed $userResume = null): bool
    {
        $userHasResume = $userResume;
        if ($userHasResume === null) $userHasResume = $this->resume;

        return
            $userHasResume !== null &&
            $this->education_id !== null &&
            $this->date_of_birth !== null &&
            $this->email_verified_at !== null;
    }

    public function toArray()
    {
        $array = parent::toArray();
        $userResume = $this->resume;
        $array['coordinates'] = [
            'latitude' => $this->coordinates->latitude,
            'longitude' => $this->coordinates->longitude
        ];

        $array['country'] = $this->country->name;
        $array['country_code'] = $this->country->code;
        $array['resume_uploaded'] = $userResume !== null;
        $array['can_apply'] = $this->canApply($userResume);

        return $array;
    }
}
