<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Jalankan RoleSeeder terlebih dahulu untuk membuat roles
        $this->call([
            RoleSeeder::class,
        ]);

        // Create 7 users with predefined data
        $users = [
            ['name' => 'John Doe', 'email' => 'john@example.com', 'password' => Hash::make('password123')],
            ['name' => 'Jane Smith', 'email' => 'jane@example.com', 'password' => Hash::make('password123')],
            ['name' => 'Mike Johnson', 'email' => 'mike@example.com', 'password' => Hash::make('password123')],
            ['name' => 'Sarah Wilson', 'email' => 'sarah@example.com', 'password' => Hash::make('password123')],
            ['name' => 'David Brown', 'email' => 'david@example.com', 'password' => Hash::make('password123')],
            ['name' => 'Lisa Davis', 'email' => 'lisa@example.com', 'password' => Hash::make('password123')],
            ['name' => 'Tom Miller', 'email' => 'tom@example.com', 'password' => Hash::make('password123')]
        ];

        foreach ($users as $userData) {
            $user = User::create($userData);
            $user->assignRole('user');
        }

        $admin = User::create([
            'name' => 'admin',
            "email" => "admin@example.com",
            "password" => Hash::make("password"),
        ]);

        $admin->assignRole("admin"); // Perbaiki dari $user menjadi $admin
        
        // Jalankan seeder lainnya setelah users dibuat
        $this->call([
            DonationCategorySeeder::class,
            ForumCategorySeeder::class,
            AffairCategorySeeder::class, // Tambahkan ini jika belum ada
            AffairSeeder::class,
            DonationSeeder::class,
            ForumSeeder::class,
        ]);
    }
}