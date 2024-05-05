<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property int $work_area_id
 * @property string $created_at
 * @property string $updated_at
 */

class WorkField extends Model
{
    use HasFactory;

    protected $table = 'work_fields';

    public function workArea() {
        return $this->belongsTo(WorkArea::class);
    }
}
