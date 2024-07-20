<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property int $sector_id
 * @property string $created_at
 * @property string $updated_at
 */

class WorkField extends Model
{
    use HasFactory;

    protected $table = 'work_fields';

    protected $fillable = [
        'name',
        'sector_id'
    ];

    public function workArea() {
        return $this->belongsTo(Sector::class, 'sector_id', 'id');
    }

    public static function getById(int $id): self
    {
        return self::query()->findOrFail($id);
    }

}
