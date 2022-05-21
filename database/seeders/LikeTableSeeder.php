<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LikeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 5; $i++) {
            DB::table('likes')->insert([
                'user_id' => 1,
                'post_id' => 4,
            ]);
        }

        for ($i = 0; $i < 3; $i++) {
            DB::table('likes')->insert([
                'user_id' => 1,
                'post_id' => 7,
            ]);
        }
    }
}
