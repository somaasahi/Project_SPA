<?php

namespace Database\Seeders;

use App\Models\Chat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ChatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 5; $i++) {
            Chat::create([
                'from_user_id' => 10,
                'to_user_id' => 1,
                'chat' => Str::random(10),
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }
        for ($i = 0; $i < 5; $i++) {
            Chat::create([
                'from_user_id' => 1,
                'to_user_id' => 10,
                'chat' => Str::random(10),
                'created_at' => date('Y-m-d H:i:s'),
            ]);
        }
    }
}
