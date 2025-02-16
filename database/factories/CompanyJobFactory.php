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

        $methodOfPayment = fake()->randomElement(["salary", "hourly", "provision"]);
        $salaryFrom = null;
        $salaryTo = null;
        $hourlyRate = null;

        if ($methodOfPayment === "salary") {
            $salaryFrom = fake()->numberBetween(1200, 2200);
            $salaryTo = fake()->numberBetween(2200, 3500);
        } else if ($methodOfPayment === "hourly") {
            $hourlyRate = fake()->numberBetween(5, 30);
        }

        $availableEmploymentTypesArray = [
            'full_time',
            'full_time_fixed_term',
            'part_time',
            'contract',
            'project',
            'casual',
            'student',
            'practical_training',
            'retiree_work',
        ];

        $availableRegions = [
            'gorenjska',
            'primorska',
            'notranjska',
            'dolenjska',
            'koroska',
            'stajerska',
            'prekmurje',
        ];

        return [
            "title" => fake()->jobTitle,
            "benefits" => fake()->realText,
            "expectations" => fake()->realText,
            "assignments" => fake()->realText,
            "intro" => fake()->realText(250),
            "employment_type" => fake()->randomElement($availableEmploymentTypesArray),
            "work_location" => fake()->randomElement(['remote', 'hybrid', 'on_location', 'field_work']),
            "open_positions_count" => fake()->numberBetween(1, 7),
            "method_of_payment" => $methodOfPayment,
            "salary_from" => $salaryFrom,
            "salary_to" => $salaryTo,
            "hourly_rate" => $hourlyRate,
            "salary_currency" => fake()->randomElement(['USD', 'EUR', 'GBP']),
            "minimum_education_id" => fake()->optional()->numberBetween(1, 9),
            "application_mail" => fake()->email,
            "status" => $status,
            "posted_at" => $jobPostedAt,
            "expires_at" => $expiresAt,
            "company_id" => $company->id,
            "work_field_id" => $workField->id,
            "country_id" => $country->id,
            "street" => fake()->streetName,
            'region' => fake()->randomElement($availableRegions),
            "city" => fake()->city,
            "zip" => fake()->postcode,
            "coordinates" => new Point(fake()->latitude(), fake()->longitude()),
        ];
    }
}
