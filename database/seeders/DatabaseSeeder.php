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
        $this->call([
            DonationCategorySeeder::class,
            ForumCategorySeeder::class,
            RoleSeeder::class
            // UserSeeder::class,
        ]);

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $admin = User::create([
            'name' => 'admin',
            "email" => "admin@example.com",
            "password" => Hash::make("password"),
        ]);

        $user->assignRole("user");
        $admin->assignRole("admin");
    }
}
