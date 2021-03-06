<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $init = Str::random(100);
        DB::table('posts')->insert([
            'user_id' => 1,
            'animal_kind' => 1,
            'post_kind' => 1,
            'img_url1' => 'storage/post_images/noimg.png',
            'img_url2' => 'storage/post_images/noimg.png',
            'img_url3' => 'storage/post_images/noimg.png',
            'content' => '4:いいね5/7:いいね3/7:レビュ3/10:レビュ5' . $init,
            'created_at' => '2019-01-01 00:00:00',
            'updated_at' => '2019-01-01 00:00:00',
        ]);
        $text = Str::random(200);
        for ($i = 2; $i < 59; $i++) {
            DB::table('posts')->insert([
                'user_id' => 1,
                'animal_kind' => 1,
                'post_kind' => 1,
                'img_url1' => 'storage/post_images/noimg.png',
                'img_url2' => 'storage/post_images/noimg.png',
                'img_url3' => 'storage/post_images/noimg.png',
                'content' => 'id' . $i . 'です' . $text,
                'created_at' => '2020-01-01 00:00:' . $i,
                'updated_at' => '2020-01-01 00:00:' . $i,
            ]);
        }
    }
}
