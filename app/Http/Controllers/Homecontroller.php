<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\Profile;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Homecontroller extends Controller
{
    public function homeIndex(Request $request)
    {
        // Log::debug($request->all());
        $animal = $request->get('animal');
        $kind = $request->get('kind');
        $order = $request->get('order');
        $keyword = $request->get('keyword');
        $total = $request->get('total');

        $query = DB::table('posts')
            ->select('posts.id as id', 'posts.img_url1', 'posts.content', 'posts.created_at', 'users.name', 'profiles.img_url')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->leftJoin('profiles', 'users.id', '=', 'profiles.user_id');
        Log::debug('ok');
        // いいね数の取得まだ
        // $query->withCount('likes');

        if (!empty($animal)) {
            $query->where('animal_kind', $animal);
        }
        if (!empty($kind)) {
            $query->where('post_kind', $kind);
        }
        if (!empty($keyword)) {
            $query->where('content', 'LIKE', "%{$keyword}%");
        }
        if ($order === '1') {
            // 後でupdated_atに変更
            $query->orderBy('id', 'desc');
        }
        if ($order === '2') {
            $query->orderBy('likes_count', 'desc');
        }
        if ($order === '3') {
            $query->orderBy('reviews_count', 'desc');
        }
        if (empty($order) || $order === '4') {
            // 後でupdated_atに変更
            $query->orderBy('id', 'asc');
        }
        $query->skip($total)->take(10)->get();

        $result = $query->get();
        // Log::debug($result);
        return $result;
    }


    public function showDetail(Request $request)
    {
        $result = [];
        $id = $request->get('id');
        $detail = Post::withCount('likes')->find($id);
        $result[] = $detail;
        $result[] = User::find($detail->user_id);
        $result[] = Profile::find($detail->user_id);
        return $result;
    }

    public function like(Request $request)
    {
        $check = Like::where('post_id', $request['params']['post_id'])
            ->where('user_id', $request['params']['user_id'])->exists();

        Log::debug($check);
        $like = new Like();
        if (empty($check)) {
            $like->post_id = $request['params']['post_id'];
            $like->user_id = $request['params']['user_id'];
            $like->save();
            $count = Like::where('post_id', $request['params']['post_id'])->count();
            return $count;
        } else {
            $like->where('post_id', $request['params']['post_id'])
                ->where('user_id', $request['params']['user_id'])->delete();
            $count = Like::where('post_id', $request['params']['post_id'])->count();
            return $count;
        }
    }

    public function showReview(Request $request)
    {
        $id = $request->get('id');
        $reviews = Review::select('reviews.id as id', 'reviews.comment', 'reviews.created_at', 'users.name', 'profiles.img_url')
            ->join('users', 'reviews.user_id', '=', 'users.id')->leftJoin('profiles', 'users.id', '=', 'profiles.user_id')->where('reviews.post_id', $id)->get();
        return $reviews;
    }

    public function postReview(Request $request)
    {

        DB::transaction(function () use ($request) {
            $review = new Review();
            $user_id = 1;
            // 仮で1にしている
            // $user_id = $request['params']['user_id'];
            $review->user_id = $user_id;
            $review->post_id = $request['params']['post_id'];
            $review->comment = $request['params']['comment'];
            $review->save();
        });
        $reviews = Review::select('reviews.id as id', 'reviews.comment', 'reviews.created_at', 'users.name', 'profiles.img_url')
            ->join('users', 'reviews.user_id', '=', 'users.id')
            ->leftJoin('profiles', 'users.id', '=', 'profiles.user_id')
            ->where('reviews.post_id', $request['params']['post_id'])->get();
        return $reviews;
    }

    // public function showuser(Request $request)
    // {
    //     $id = $request->get('id');
    //     $user = User::find($id);
    //     Log::debug('okkk');
    //     return $user;
    // }
}
