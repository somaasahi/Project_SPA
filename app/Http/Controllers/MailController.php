<?php

namespace App\Http\Controllers;

use App\UseCases\Mail\Validate as MailValidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class MailController extends Controller
{
    public function sendMail( Request $request, MailValidate $MailValidate )
    {
        $error = $MailValidate( $request );

        if ( $error ) {
            return response()->json( ['message' => $error] );
        }

        $status = Password::sendResetLink(
            $request->only( 'email' )
        );
        return $status === Password::RESET_LINK_SENT
        ? back()->with( ['status' => __( $status )] )
        : back()->withErrors( ['email' => __( $status )] );
    }

}
