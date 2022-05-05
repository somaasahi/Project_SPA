<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use function PHPUnit\Framework\isEmpty;

class HomeIndexcontroller extends Controller
{
    public function homeIndex(Request $request)
    {
        Log::debug($request->all());
        $animal = $request->get('animal');
        $kind = $request->get('kind');
        $order = $request->get('order');
        $keyword = $request->get('keyword');
        $page = $request->get('page');

        $query = Post::query()->withCount('likes')->withCount('reviews');

        if (!empty($animal)) {
            $query->where('animal_kind', $animal);
        }
        if (!empty($kind)) {
            $query->where('post_kind', $kind);
        }
        if (!empty($keyword)) {
            $query->where('content', 'LIKE', "%{$keyword}%");
        }

        if ($page == 1) {

            $query->orderBy('id', 'ASC')->take(10)->get();
            // Log::debug($result);
        } else {
            $page = $page - 1;
            $start = 15 * $page;
            $query->orderBy('id', 'ASC')->skip($start)->take(10)->get();
        }

        if ($order ===  1) {
            $query->orderBy('id', 'desc');
        }
        if ($order ===  2) {
            $query->orderBy('likes_count', 'desc');
        }
        if ($order ===  3) {
            $query->orderBy('reviews_count', 'desc');
        }
        if ($order ===  4) {
            $query->orderBy('id', 'asc');
        }
        $result = $query->get();
        return $result;
    }
}
