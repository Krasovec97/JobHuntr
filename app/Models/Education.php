<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $level
 * @property string $title
 * @property string $created_at
 * @property string $updated_at
 */
class Education extends Model
{
    use HasFactory;
    protected $table = 'educations';

    protected $fillable = [
        'level',
        'title',
    ];
}
