<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\WorkArea;
use App\Models\WorkField;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompanyJob>
 */
class CompanyJobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $workAreasQuery = WorkArea::query();
        $availableWorkAreasCount = $workAreasQuery->count();

        $workArea =  $workAreasQuery
            ->where('id', rand(1, $availableWorkAreasCount))
            ->first(['id']);

        $workFieldQuery = WorkField::query()
            ->where('work_area_id', $workArea->id);
        $workFields = $workFieldQuery->get();
        $workFieldsCount = $workFieldQuery->count();

        $availableWorkFieldIds = [];
        foreach ($workFields as $workField) $availableWorkFieldIds[] = $workField->id;


        $workField =  $workFieldQuery
            ->whereIn('id', $availableWorkFieldIds)
            ->skip(rand(0, ($workFieldsCount - 1)))
            ->first(['id']);

        /** @var Company $company */
        $company = Company::query()->first();
        $status = fake()->randomElement(["active", "draft"]);
        $jobPostedAt = null;
        $expiresAt = null;
        if ($status === "active") {
            $jobPostedAt = Carbon::now();
            $expiresAt = Carbon::now()->addMonth();
        }

        return [
            "title" => fake()->jobTitle,
            "description" => fake()->realText,
            "employment_type" => fake()->randomElement(['full_time', 'part_time']),
            "work_location" => fake()->randomElement(['remote', 'hybrid', 'on_location']),
            "open_positions_count" => fake()->numberBetween(1, 7),
            "salary" => fake()->numberBetween(10000, 200000),
            "salary_currency" => fake()->randomElement(['USD', 'EUR', 'GBP']),
            "preferred_gender" => fake()->randomElement(['male', 'female', 'any']),
            "preferred_education" => fake()->randomElement(['none', 'primary', 'high_school', 'bachelor', 'master', 'doctorate']),
            "status" => $status,
            "posted_at" => $jobPostedAt,
            "expires_at" => $expiresAt,
            "company_id" => $company->id,
            "work_area_id" => $workArea->id,
            "work_field_id" => $workField->id,
        ];
    }
}
