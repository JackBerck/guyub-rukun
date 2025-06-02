<?php

namespace Database\Seeders;

use App\Models\AffairCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AffairCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Musik',
            'Pertunjukan',
            'Olahraga',
        ];

        foreach ($categories as $category) {
            AffairCategory::firstOrCreate([
                'name' => $category,
            ]);
        }
    }
}
