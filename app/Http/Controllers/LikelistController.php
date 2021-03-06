<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LikelistController extends Controller
{
    public function index(Request $request)
    {
        $ids = Like::where('user_id', $request->get('user_id'))->pluck('post_id');

        $list = [];
        foreach ($ids as $id) {
            $list[] = DB::table('posts')
                ->select('posts.id as id', 'posts.img_url1', 'posts.content', 'posts.created_at', 'users.name', 'profiles.img_url')
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->leftJoin('profiles', 'users.id', '=', 'profiles.user_id')
                ->where('posts.id', $id)->get();
            // $list[] = Post::find($id);
        }
        $result = [];
        foreach ($list as $a) {
            $result[] = $a[0];
        }
        return $result;
    }
}
