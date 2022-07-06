<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function store(Request $request)
    {
        Log::debug($request->all());

        $validator = Validator::make($request->all(), [
            'animal_kind' => 'required',
            'post_kind' => 'required',
            'content' => 'required|string|max:400',
            'img_url1' => 'required',
        ]);

        if ($validator->fails()) {

            return response()->json(['message' => '投稿ルールに反しています。'], 400);
        } else {
            DB::beginTransaction();

            try {
                $fileName = $request->file('image')->getClientOriginalName();
                Storage::putFileAs('public/post_images', $request->file('image'), $fileName);
                $fullFilePath = 'storage/post_images/' . $fileName;

                $fileName2 = $request->file('image2')->getClientOriginalName();
                Storage::putFileAs('public/post_images', $request->file('image2'), $fileName2);
                $fullFilePath2 = 'storage/post_images/' . $fileName2;

                $fileName3 = $request->file('image3')->getClientOriginalName();
                Storage::putFileAs('public/post_images', $request->file('image3'), $fileName3);
                $fullFilePath3 = 'storage/post_images/' . $fileName3;

                $post = new Post();
                $post->user_id = Auth::user()->id;
                $post->animal_kind = $request->animal;
                $post->post_kind = $request->kind;
                $post->content = $request->content;
                $post->img_url1 = $fullFilePath;
                $post->img_url2 = $fullFilePath2;
                $post->img_url3 = $fullFilePath3;
                $post->save();
                DB::commit();
            } catch (Exception $exception) {
                DB::rollBack();
            }
        }
    }
}
