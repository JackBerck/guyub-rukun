<?php

namespace Database\Seeders;

use App\Models\ForumCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ForumCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Diskusi Umum',
            'Tips',
            'Berita',
            'Event',
            'Tutorial'
        ];

    foreach ($categories as $category) {
            ForumCategory::firstOrCreate([
                'name' => $category,
            ]);
        }
    }
}
