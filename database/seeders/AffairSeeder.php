<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AffairSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $affairs = [
            [
            'thumbnail' => 'affair-thumbnails/artjog.jpg',
            'title' => 'ARTJOG 2025 - MOTIF: AMALAN',
            'description' => 'ARTJOG kembali hadir sebagai peristiwa seni tahunan... (dipotong untuk singkat)',
            'date' => now()->addDays(rand(1, 30))->format('Y-m-d'),
            'time' => '10:00',
            'location' => 'Jogja National Museum',
            'affair_category_id' => rand(1, 5),
            'user_id' => rand(1, 5)
            ],
            [
            'thumbnail' => 'affair-thumbnails/bakuhantam.jpg',
            'title' => 'LIEBEN X BAKUHANTAM',
            'description' => 'Rudy GoldenBoy adalah seorang Fighter Influencer... (dipotong untuk singkat)',
            'date' => now()->addDays(rand(1, 30))->format('Y-m-d'),
            'time' => '19:00',
            'location' => 'Jl. Raya Merdeka, RT.04/RW.01, Pabuaran, Cimone, Kec. Karawaci, Kota Tangerang, Banten 15114',
            'affair_category_id' => rand(1, 5),
            'user_id' => rand(1, 5)
            ],
            [
            'thumbnail' => 'affair-thumbnails/law-fun-run.png',
            'title' => 'LAW SOEDIRMAN FUN RUN 2025',
            'description' => 'Dalam rangka memperingati Dies Natalis ke-44 Fakultas Hukum Universitas Jenderal Soedirman... (dipotong)',
            'date' => now()->addDays(rand(1, 30))->format('Y-m-d'),
            'time' => '06:00',
            'location' => 'Fakultas Hukum UNSOED',
            'affair_category_id' => rand(1, 5),
            'user_id' => rand(1, 5)
            ],
            [
            'thumbnail' => 'affair-thumbnails/jogja-coffee.png',
            'title' => 'Jogja Coffee Week #5',
            'description' => 'Setelah suksesnya penyelenggaraan Jogja Coffee Week #4... (dipotong)',
            'date' => now()->addDays(rand(1, 30))->format('Y-m-d'),
            'time' => '10:10',
            'location' => 'Jogja Expo Center',
            'affair_category_id' => rand(1, 5),
            'user_id' => rand(1, 5)
            ],
            [
            'thumbnail' => 'affair-thumbnails/maulid-nabi.jpg',
            'title' => 'Peringatan Maulid Nabi Muhammad SAW 1447 H',
            'description' => 'Mari hadiri peringatan Maulid Nabi Muhammad SAW 1447 H bersama masyarakat setempat... (dipotong)',
            'date' => now()->addDays(rand(1, 30))->format('Y-m-d'),
            'time' => '19:00',
            'location' => 'Masjid Agung Baitussalam, Jl. Jend. Sudirman No. 1, Purwokerto Kulon, Banyumas',
            'affair_category_id' => rand(1, 5),
            'user_id' => rand(1, 5)
            ],
            [
            'thumbnail' => 'affair-thumbnails/seminar.jpg',
            'title' => 'Seminar Nasional: Pelatihan Kemampuan Berpikir Kritis',
            'description' => 'Seminar nasional ini bertujuan untuk meningkatkan kemampuan berpikir kritis di kalangan pendidik dan mahasiswa...',
            'date' => now()->addDays(rand(1, 30))->format('Y-m-d'),
            'time' => '08:00',
            'location' => 'Auditorium Fakultas Keguruan dan Ilmu Pendidikan, Universitas Negeri Yogyakarta',
            'affair_category_id' => rand(1, 5),
            'user_id' => rand(1, 5)
            ]
        ];

        foreach ($affairs as $affair) {
            \App\Models\Affair::firstOrCreate([
                'title' => $affair['title'],
                'description' => $affair['description'],
                'date' => $affair['date'],
                'time' => $affair['time'],
                'location' => $affair['location'],
                'thumbnail' => $affair['thumbnail'],
                'affair_category_id' => $affair['affair_category_id'],
                'user_id' => $affair['user_id'],
            ]);
        }
    }
}
