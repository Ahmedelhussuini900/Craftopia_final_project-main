<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_name' => $this->faker->word(),
            'price' => $this->faker->numberBetween(100, 10000),
            'description' => $this->faker->paragraph(),
            'size' => $this->faker->numberBetween(15, 80),
            'material' => $this->faker->word(), 
            'cover_image' => $this->faker->imageUrl(),
            'stock' => $this->faker->numberBetween(1, 100),
            'user_id' => User::inRandomOrder()->first()->id,
            'category_id' => Category::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
