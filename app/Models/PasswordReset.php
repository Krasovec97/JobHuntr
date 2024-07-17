<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * @property int $id
 * @property int $entity_id
 * @property string $entity_type
 * @property string $token
 * @property string $created_at
 * @property string $updated_at
 */

class PasswordReset extends Model
{
    use HasFactory;
    protected $table = 'password_resets';
}
