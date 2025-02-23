<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $job_id
 * @property string $cover_letter
 * @property string $accepted_at
 * @property string $rejected_at
 * @property string $created_at
 * @property string $updated_at
 */

class JobApplication extends Model
{
    use HasFactory;
    protected $table = 'job_applications';

    function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    function posting(): BelongsTo
    {
        return $this->belongsTo(CompanyJob::class, 'job_id', 'id');
    }
}
