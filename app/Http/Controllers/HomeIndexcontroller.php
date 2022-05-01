<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        $query = Post::query();

        $page = $request->get('page');


        if ($page == 1) {

            $result = Post::orderBy('id', 'ASC')->take(10)->get();
            // Log::debug($result);
            return $result;
        } else {
            $page = $page - 1;
            $start = 15 * $page;
            $result = Post::orderBy('id', 'ASC')->skip($start)->take(10)->get();
            return $result;
        }
    }
}
