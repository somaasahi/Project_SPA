<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReviewTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comment = Str::random(40);
        $comment2 = Str::random(20);
        for ($i = 0; $i < 3; $i++) {
            DB::table('reviews')->insert([
                'user_id' => 1,
                'post_id' => 7,
                'comment' => $comment,
            ]);
        }

        for ($i = 0; $i < 5; $i++) {
            DB::table('reviews')->insert([
                'user_id' => 1,
                'post_id' => 2,
                'comment' => $comment2,
            ]);
        }
    }
}
