<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property string $created_at
 * @property string $updated_at
 */
class WorkArea extends Model
{
    use HasFactory;
    protected $table = 'work_areas';

    protected $fillable = [
        'name'
    ];

    public function workFields(): HasMany
    {
        return $this->hasMany(WorkField::class, 'work_area_id');
    }

    public static function getById(int $id): WorkArea
    {
        return self::query()->findOrFail($id);
    }
}
