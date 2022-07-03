<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create( [
            'name' => '赤司征十郎',
            'email' => 'rakuzan@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make( '12345678' ),
            'remember_token' => Str::random( 10 ),
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ] );
    }
}
