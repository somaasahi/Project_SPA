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
        $user = User::factory()->create();
        FriendRelation::factory(20)->create([
            'from_user_id' => $user->id
        ]);

        // FriendRelation::create([
        //     'from_user_id'=>'1',
        //     'to_user_id'=>'2',
        // ]);
        // FriendRelation::create([
        //     'from_user_id'=>'1',
        //     'to_user_id'=>'3',
        // ]);
        // FriendRelation::create([
        //     'from_user_id'=>'1',
        //     'to_user_id'=>'4',
        // ]);
        // FriendRelation::create([
        //     'from_user_id'=>'1',
        //     'to_user_id'=>'5',
        // ]);
    }
}
