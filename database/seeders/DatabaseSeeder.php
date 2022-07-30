<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();
        $this->call(UserSeeder::class);
        $this->call(Friend_RelationsSeeder::class);
        $this->call(PostTableSeeder::class);
        $this->call(LikeTableSeeder::class);
        $this->call(ReviewTableSeeder::class);
        $this->call(ProfileTableSeeder::class);
        $this->call(ChatSeeder::class);
        $this->call(AdminSeeder::class);
    }
}
