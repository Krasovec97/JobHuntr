<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property int $user_id
 * @property string $original_file_name
 * @property string $file_name
 * @property string $content
 * @property string deleted_at
 * @property string $created_at
 * @property string $updated_at
 */
class UserResume extends Model
{
    use SoftDeletes;
    protected $table = 'user_resumes';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
