<?php

namespace Database\Seeders;

use App\Models\Forum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ForumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $forums = [
            [
                'title' => 'Tips Berkebun di Lahan Sempit',
                'description' => 'Diskusikan cara-cara efektif berkebun di lahan yang terbatas untuk hasil maksimal. Pelajari teknik vertikultur, hidroponik sederhana, dan pemilihan tanaman yang tepat untuk ruang sempit. Bagikan pengalaman sukses Anda dalam memaksimalkan produktivitas kebun kecil di rumah, mulai dari balkon apartemen hingga pekarangan mungil.',
                'thumbnail' => 'forum-thumbnails/berkebun-lahan-sempit.jpg',
                'is_popular' => rand(0, 1) == 1,
                'user_id' => rand(1, 5),
                'forum_category_id' => rand(1, 5),
            ],
            [
                'title' => 'Resep Masakan Tradisional Nusantara',
                'description' => 'Berbagi resep masakan tradisional dari berbagai daerah di Indonesia lengkap dengan tips dan trik memasak yang autentik. Diskusikan bahan-bahan lokal, cara pengolahan yang benar, dan cerita di balik setiap hidangan warisan nenek moyang. Mari lestarikan kekayaan kuliner nusantara melalui berbagi pengetahuan dan pengalaman memasak.',
                'thumbnail' => 'forum-thumbnails/masakan-tradisional.jpg',
                'is_popular' => rand(0, 1) == 1,
                'user_id' => rand(1, 5),
                'forum_category_id' => rand(1, 5),
            ],
            [
                'title' => 'Budidaya Ikan Lele Modern',
                'description' => 'Teknik budidaya ikan lele dengan teknologi modern untuk pemula hingga professional. Pelajari sistem bioflok, manajemen kualitas air, pemberian pakan yang efisien, dan pencegahan penyakit. Diskusikan analisa usaha, strategi pemasaran, dan tips sukses menjalankan bisnis budidaya lele yang menguntungkan di era modern.',
                'thumbnail' => 'forum-thumbnails/budidaya-lele.jpg',
                'is_popular' => rand(0, 1) == 1,
                'user_id' => rand(1, 5),
                'forum_category_id' => rand(1, 5),
            ],
            [
                'title' => 'Kerajinan Tangan dari Bahan Bekas',
                'description' => 'Ide-ide kreatif membuat kerajinan tangan dari barang bekas yang ada di rumah untuk mengurangi sampah sekaligus menghasilkan karya bernilai. Bagikan tutorial lengkap, tips memilih bahan, teknik finishing yang rapi, dan cara menjual hasil karya. Mari berkreasi dengan konsep reduce, reuse, dan recycle untuk lingkungan yang lebih bersih.',
                'thumbnail' => 'forum-thumbnails/kerajinan-bekas.jpg',
                'is_popular' => rand(0, 1) == 1,
                'user_id' => rand(1, 5),
                'forum_category_id' => rand(1, 5),
            ],
            [
                'title' => 'Usaha Kecil Menengah di Era Digital',
                'description' => 'Strategi mengembangkan UKM dengan memanfaatkan teknologi digital untuk memperluas jangkauan pasar dan meningkatkan efisiensi operasional. Diskusikan pemasaran online, e-commerce, digital payment, manajemen inventory digital, dan customer relationship management. Bagikan pengalaman transformasi digital UKM yang berhasil meningkatkan omzet secara signifikan.',
                'thumbnail' => 'forum-thumbnails/ukm-digital.jpg',
                'is_popular' => rand(0, 1) == 1,
                'user_id' => rand(1, 5),
                'forum_category_id' => rand(1, 5),
            ],
        ];

        foreach ($forums as $forum) {
            Forum::firstOrCreate([
                'title' => $forum['title'],
                'description' => $forum['description'],
                'thumbnail' => $forum['thumbnail'],
                'is_popular' => $forum['is_popular'],
                'user_id' => $forum['user_id'],
                'forum_category_id' => $forum['forum_category_id'],
            ]);
        }
    }
}
