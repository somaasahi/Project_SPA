<?php

namespace App\Http\Controllers;

use App\UseCases\Auth\Validate as AuthValidate;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(
        Request $request,
        AuthValidate $AuthValidate
    ) {
        $credentials = $request->validate( [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ] );

        if ( Auth::attempt( $credentials ) ) {
            $request->session()->regenerate();

            return response()->json( Auth::user() );
        }

        return response()->json( [], 401 );
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout( Request $request )
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json( false );
    }

    /**
     * パスワードリセット処理
     *
     * @param  \Illuminate\Http\Request  $request
     * @return
     */
    public function passwordReset( Request $request )
    {
        $request->validate( [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
            'password_confirmation' => 'required',
        ] );

        $status = Password::reset(
            $request->only( 'email', 'password', 'password_confirmation', 'token' ),
            function ( $user, $password ) {
                $user->forceFill( [
                    'password' => Hash::make( $password ),
                ] )->setRememberToken( Str::random( 60 ) );

                $user->save();

                event( new PasswordReset( $user ) );
            }
        );

        return $status === Password::PASSWORD_RESET
        ? redirect( 'login' )->with( 'status', __( $status ) )
        : back()->withErrors( ['email' => [__( $status )]] );
    }

}
