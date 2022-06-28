<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProfileTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $text = Str::random(200);
        for ($i = 0; $i < 5; $i++) {
            DB::table('profiles')->insert([
                'user_id' => $i,
                'description' => "ユーザの説明" . $text,
                'img_url' => "storage/post_images/noimg.png",
                'profileName' => "プロフィールネーム",
            ]);
        }
    }
}
