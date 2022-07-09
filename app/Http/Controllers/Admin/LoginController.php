<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return view( 'Admin.Login.index' );
    }

    public function login( Request $request )
    {
        $request->validate( [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ] );
        $credentials = $request->only( ['email', 'password'] );

        if ( Auth::guard( 'admin' )->attempt( $credentials ) ) {
            // ログインしたら管理画面トップにリダイレクト
            return redirect()->route( 'index' )->with( [
                'login_msg' => 'ログインしました。',
            ] );
        }

        return back()->withErrors( [
            'login' => ['ログインに失敗しました'],
        ] );
    }

    public function logout( Request $request )
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // ログアウトしたらログインフォームにリダイレクト
        return redirect()->route( 'admin.index' )->with( [
            'logout_msg' => 'ログアウトしました',
        ] );
    }

}
