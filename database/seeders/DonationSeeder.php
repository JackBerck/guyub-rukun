<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DonationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $donations = [
            [
                'title' => 'Kursi Roda Bekas Layak Pakai',
                'description' => 'Kursi roda bekas pemakaian pribadi, masih berfungsi dengan baik. Cocok untuk lansia atau penyandang disabilitas. Minat silahkan hubungi saya. Mohon tidak dijual kembali, hanya untuk dibagikan kepada yang membutuhkan.',
                'phone_number' => '081234567890',
                'address' => 'Jl. MT Haryono No.16, Kel. Mlatiharjo, Kec. Semarang Timur, Kota Semarang, Jawa Tengah',
                'is_popular' => rand(0, 1),
                'user_id' => rand(1, 5),
                'donation_category_id' => rand(1, 5),
                'images' => ['kursi-roda-1.webp', 'kursi-roda-2.webp'],
            ],
            [
                'title' => 'Sumbangan Buku Pelajaran Bekas',
                'description' => 'Buku pelajaran SD sampai SMA, bisa untuk taman baca atau komunitas belajar. Atau bisa ambil satu saja. Jika ada pertanyaan hubungi no WA.',
                'phone_number' => '081234567891',
                'address' => 'Jl. Kenanga II No.15, Desa Cibiru Wetan, Kec. Cileunyi, Kab. Bandung, Jawa Barat',
                'is_popular' => rand(0, 1),
                'user_id' => rand(1, 5),
                'donation_category_id' => rand(1, 5),
                'images' => ['buku-bekas-1.jpg', 'buku-bekas-2.jpg'],
            ],
            [
                'title' => 'Nasi Bungkus Harian',
                'description' => 'Menyediakan 20 bungkus nasi dan lauk setiap sore untuk warga kurang mampu atau yang membutuhkan. Terima kasih, semoga Berkah.',
                'phone_number' => '081234567892',
                'address' => 'Jl. Diponegoro No.5B, Kel. Purwokinanti, Kec. Pakualaman, Kota Yogyakarta, DIY',
                'is_popular' => rand(0, 1),
                'user_id' => rand(1, 5),
                'donation_category_id' => rand(1, 5),
                'images' => ['nasi-bungkus-1.jpg', 'nasi-bungkus-2.jpg'],
            ],
            [
                'title' => 'Richeese Sisa Acara',
                'description' => 'Makanan dari acara kantor sisa 15 box, domisili jakut yang minat mengambil hubungi saja nanti akan disalurkan langsung malam ini juga.',
                'phone_number' => '081234567893',
                'address' => 'Jl. Gatot Subroto No.109, Kel. Penjaringan, Kec. Penjaringan, Kota Jakarta Utara, DKI Jakarta',
                'is_popular' => rand(0, 1),
                'user_id' => rand(1, 5),
                'donation_category_id' => rand(1, 5),
                'images' => ['richees-1.jpg'],
            ],
            [
                'title' => 'Jasa Review CV Gratis',
                'description' => 'Bantu koreksi dan perbaiki CV mahasiswa yang mau magang atau lulus. Bisa via email.',
                'phone_number' => '081234567895',
                'address' => 'Jl. Veteran No.27, Kel. Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur',
                'is_popular' => rand(0, 1),
                'user_id' => rand(1, 5),
                'donation_category_id' => rand(1, 5),
                'images' => ['review-cv-1.jpg'],
            ],
            [
                'title' => 'Kelas Bahasa Inggris Gratis',
                'description' => 'Kami membuka kelas Bahasa Inggris gratis khusus untuk anak-anak usia SD (kelas 4–6) yang ingin belajar dasar-dasar percakapan dan kosakata sehari-hari. Kegiatan ini akan berlangsung secara offline dengan metode pembelajaran interaktif dan menyenangkan.',
                'phone_number' => '081234567896',
                'address' => 'Jl. Antasura No.5, Kel. Peguyangan, Kec. Denpasar Utara, Kota Denpasar, Bali',
                'is_popular' => rand(0, 1),
                'user_id' => rand(1, 5),
                'donation_category_id' => rand(1, 5),
                'images' => ['kelas-bahasa-inggris-1.jpg', 'kelas-bahasa-inggris-2.jpg', 'kelas-bahasa-inggris-3.jpg'],
            ],
            [
                'title' => 'Kipas Angin',
                'description' => 'Saya mendonasikan 2 kipas angin yang masih berfungsi dengan baik. Mohon digunakan untuk keperluan panti atau komunitas, bukan untuk diperjualbelikan.',
                'phone_number' => '081234567897',
                'address' => 'Jl. Dr. Cipto No.45, Kel. Sarirejo, Kec. Semarang Timur, Kota Semarang, Jawa Tengah',
                'is_popular' => rand(0, 1),
                'user_id' => rand(1, 5),
                'donation_category_id' => rand(1, 5),
                'images' => ['kipas-angin-1.avif', 'kipas-angin-2.avif'],
            ],
            [
                'title' => 'Nasi Bungkus Jumat Berkah',
                'description' => 'Menyediakan 150 nasi bungkus berisi roti dan air mineral untuk dibagikan selepas salat Jumat. Untuk jamaah masjid, pengemudi ojek online, dan warga yang membutuhkan.',
                'phone_number' => '081234567898',
                'address' => 'Jl. Raya Bogor Km.49, Kel. Cibinong, Kec. Cibinong, Kab. Bogor, Jawa Barat',
                'is_popular' => rand(0, 1),
                'user_id' => rand(1, 5),
                'donation_category_id' => rand(1, 5),
                'images' => ['jumat-berkah-1.jpeg', 'jumat-berkah-2.jpg', 'jumat-berkah-3.jpg'],
            ],
            [
                'title' => 'Antar ke Stasiun Purwokerto',
                'description' => 'Saya akan ke Stasiun Purwokerto Jumat pagi untuk jemput saudara. Kalau ada yang butuh diantar ke stasiun, bisa ikut sekalian. Daerah Arca dan sekitarnya. Khusus 1 orang. Tanpa biaya, cukup bilang saja.',
                'phone_number' => '081234567899',
                'address' => 'Jl. Tegal Sari No.27, Kel. Arcawinangun, Kec. Purwokerto Timur, Kab. Banyumas, Jawa Tengah',
                'is_popular' => rand(0, 1),
                'user_id' => rand(1, 5),
                'donation_category_id' => rand(1, 5),
                'images' => ['st-pwt-1.png'],
            ]
        ];

        foreach ($donations as $donation) {
            $donationModel = \App\Models\Donation::firstOrCreate([
                'title' => $donation['title'],
            ], [
                'description' => $donation['description'],
                'phone_number' => $donation['phone_number'],
                'address' => $donation['address'],
                'is_popular' => $donation['is_popular'] ?? 0,
                'user_id' => $donation['user_id'],
                'donation_category_id' => $donation['donation_category_id'],
            ]);

            // Tambahkan gambar untuk donation
            if (isset($donation['images']) && is_array($donation['images'])) {
                foreach ($donation['images'] as $imageName) {
                    $donationModel->donationImages()->firstOrCreate([
                        'image' => 'donation-images/' . $imageName
                    ]);
                }
            }
        }
    }
}
