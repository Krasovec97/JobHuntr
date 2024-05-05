<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $company_id
 * @property string $title
 * @property string $description
 * @property string $employment_type
 * @property float $salary
 * @property string $salary_currency
 * @property int $work_area_id
 * @property int $work_field_id
 * @property string $work_location
 * @property string $preferred_gender
 * @property string $preferred_education
 * @property int $open_positions_count
 * @property string $status
 * @property string $expires_at
 * @property string $posted_at
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 */
class Job extends Model
{
    use HasFactory;

    public static function getById($id): ?Job
    {
        return self::query()->find($id);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
