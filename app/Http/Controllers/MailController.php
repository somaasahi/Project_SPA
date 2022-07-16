<?php

namespace App\Http\Controllers;

use App\UseCases\Mail\Validate as MailValidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class MailController extends Controller
{
    public function sendMail(Request $request, MailValidate $MailValidate)
    {
        $error = $MailValidate($request);

        if ($error) {
            return response()->json(['message' => $error]);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );
        return $status === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }

    public function sendMessage(Request $request)
    {
        $data = [];
        $validator = Validator::make($request->all(), [
            'message' => 'required|max:250',
        ]);
        if ($validator->fails()) {

            return response()->json(['message' => '250文字以内で入力してください'], 400);
        } else {
            // $data = [
            //     'message' => $request->message,
            // ];
            $data = $request->message;
            $user = Auth::user();
            $email = $user->email;
            $name = $user->name;
            Mail::send('message', compact('data', 'email', 'name'), function ($message) {
                $message->to("animal_admin@a.com", 'animal_rescueユーザ')->subject('お問い合わせ');
            });
        }
    }
}
