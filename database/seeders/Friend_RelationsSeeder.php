<?php

namespace Database\Seeders;

use App\Models\FriendRelation;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Friend_RelationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FriendRelation::create([
            'from_user_id' => 10,
            'to_user_id' => 1,
            'status' => 1,
        ]);
        FriendRelation::create([
            'from_user_id' => 1,
            'to_user_id' => 10,
            'status' => 1,
        ]);
        // FriendRelation::create([
        //     'from_user_id' => '1',
        //     'to_user_id' => '3',
        // ]);
        // FriendRelation::create([
        //     'from_user_id' => '3',
        //     'to_user_id' => '1',
        // ]);
        // FriendRelation::create([
        //     'from_user_id' => '1',
        //     'to_user_id' => '4',
        // ]);
        // FriendRelation::create([
        //     'from_user_id' => '4',
        //     'to_user_id' => '1',
        // ]);
        // FriendRelation::create([
        //     'from_user_id' => '1',
        //     'to_user_id' => '5',
        // ]);
        // FriendRelation::create([
        //     'from_user_id' => '5',
        //     'to_user_id' => '1',
        // ]);
    }
}
