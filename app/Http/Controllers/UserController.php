<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function __construct(User $user, Profile $profile)
    {
        $this->user    = $user;
        $this->profile = $profile;

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->user->name              = $request->name;
        $this->user->email             = $request->email;
        $this->user->email_verified_at = now();
        $this->user->password          = Hash::make( $request->password );
        $this->user->remember_token    = Str::random( 10 );

        $this->user->save();
        $user_id = $this->user->id;

        $this->profile->user_id     = $user_id;
        $this->profile->description = "自己紹介は未登録です。";
        $this->profile->img_url     = "storage/post_images/noimg.png";
        $this->profile->profileName = 'ニックネーム';
        $this->profile->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
