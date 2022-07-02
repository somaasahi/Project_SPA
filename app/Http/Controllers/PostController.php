<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class PostController extends Controller
{
    public function store(Request $request)
    {
        $post = new Post();
        $post->user_id = Auth::user()->id;
        $post->animal_kind = $request->animal;
        $post->post_kind = $request->kind;
        $post->content = $request->content;
        $post->save();
    }
}
