<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $region
 * @property string $sub_region
 * @property string $created_at
 * @property string $updated_at
 */
class Country extends Model
{
    protected $table = 'countries';

    protected $fillable = [
        'name',
        'code',
        'region',
        'sub_region',
    ];
}
