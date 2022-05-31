<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
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

        $query = Post::query();
        Log::debug($query);
        $query->withCount('likes')->withCount('reviews');

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
        return $result;
    }


    public function showdetail(Request $request)
    {
        $result = [];
        $id = $request->get('id');
        $detail = Post::find($id);
        $result[] = $detail;
        $result[] = User::find($detail->user_id);
        $result[] = Profile::find($detail->user_id);

        return $result;
    }

    // public function showuser(Request $request)
    // {
    //     $id = $request->get('id');
    //     $user = User::find($id);
    //     Log::debug('okkk');
    //     return $user;
    // }
}
