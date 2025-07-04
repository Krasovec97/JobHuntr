<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkField>
 */
class WorkFieldFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $workFields = [
            'Agriculture, food and forestry',
            'Energy and mining',
            'Private services sectors',
            'Manufacturing',
            'Education and research',
            'Infrastructure, construction and related sectors',
            'Public service, utilities and health',
            'Maritime and transport',
            'Arts, Media, and Entertainment ',
            'Business and Finance'
        ];

        return [
            'name' => $this->faker->randomElement($workFields),
        ];
    }
}
