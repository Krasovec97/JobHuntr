<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Country;
use App\Models\WorkField;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use MatanYadaev\EloquentSpatial\Objects\Point;

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
        /** @var WorkField $workField */
        $workField = WorkField::query()
            ->inRandomOrder()
            ->first();

        /** @var Company $company */
        $company = Company::query()->first();
        $status = fake()->randomElement(["active", "draft"]);
        $jobPostedAt = null;
        $expiresAt = null;
        if ($status === "active") {
            $jobPostedAt = Carbon::now();
            $expiresAt = Carbon::now()->addMonth();
        }

        $country = Country::query()
            ->inRandomOrder()
            ->first();

        return [
            "title" => fake()->jobTitle,
            "description" => fake()->realText,
            "employment_type" => fake()->randomElement(['full_time', 'part_time']),
            "work_location" => fake()->randomElement(['remote', 'hybrid', 'on_location']),
            "open_positions_count" => fake()->numberBetween(1, 7),
            "salary" => fake()->numberBetween(10000, 200000),
            "salary_currency" => fake()->randomElement(['USD', 'EUR', 'GBP']),
            "preferred_education" => fake()->randomElement(['none', 'primary', 'high_school', 'bachelor', 'master', 'doctorate']),
            "application_mail" => fake()->email,
            "status" => $status,
            "posted_at" => $jobPostedAt,
            "expires_at" => $expiresAt,
            "company_id" => $company->id,
            "work_field_id" => $workField->id,
            "country_id" => $country->id,
            "street" => fake()->streetName,
            "city" => fake()->city,
            "zip" => fake()->postcode,
            "coordinates" => new Point(0, 0),
        ];
    }
}
