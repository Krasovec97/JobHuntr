<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $created_at
 * @property string $updated_at
 */

class WorkField extends Model
{
    use HasFactory;

    protected $table = 'work_fields';

    protected $fillable = [
        'name',
    ];

    public static function getById(int $id): self
    {
        return self::query()->findOrFail($id);
    }

}
