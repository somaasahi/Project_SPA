<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendMail( Request $request )
    {
        $name  = 'テスト ユーザー';
        $email = 'test@example.com';

        Mail::send( 'app', [
            'name' => $name,
        ], function ( $message ) use ( $email ) {
            $message->to( $email )
                ->subject( 'テストタイトル' );
        } );

        return response()->json( false );
    }
}
