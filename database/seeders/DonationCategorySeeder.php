<?php

namespace Database\Seeders;

use App\Models\DonationCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DonationCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Pakaian',
            'Makanan dan Minuman',
            'Peralatan',
            'Jasa',
        ];

        foreach ($categories as $category) {
            DonationCategory::firstOrCreate([
                'name' => $category,
            ]);
        }
    }
}
