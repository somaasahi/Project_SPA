<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{
    public function index(Request $request)
    {
        $a_id = Auth::user()->id;
        $id = $request->input('user_id');
        $chats = Chat::where(function ($query) use ($a_id, $id) {
            $query->orWhere('from_user_id', $a_id)->orWhere('to_user_id', $a_id);
        })->where(function ($query) use ($a_id, $id) {
            $query->orWhere('from_user_id', $id)->orWhere('to_user_id', $id);
        })->orderBy('created_at', 'asc')
            ->get();
        return $chats;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request['params'], [
            'message' => 'required|min:2|max:50',
        ]);
        if ($validator->fails()) {

            return response()->json(['message' => '2~50文字で入力してください'], 400);
        } else {
            DB::beginTransaction();
            try {
                $chat = new Chat();
                $chat->from_user_id = Auth::user()->id;
                $chat->to_user_id = $request['params']['to_user_id'];
                $chat->chat = $request['params']['message'];
                $chat->save();
                DB::commit();
                return $chat;
            } catch (Exception $exception) {
                DB::rollBack();
                return response()->json(['message' => 'システムエラー'], 500);
            }
        }
    }
}
