<?php

use App\Http\Controllers\Admin\DeleteController;
use App\Http\Controllers\Admin\IndexController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

//管理者ログインルート
Route::prefix( 'admin' )->group( function () {
    Route::get( 'login', [LoginController::class, 'index'] )->name( 'admin.index' );
    Route::post( 'login', [LoginController::class, 'login'] )->name( 'admin.login' );
    Route::get( 'logout', [LoginController::class, 'logout'] )->name( 'admin.logout' );
} );
//管理者認証ルート
Route::prefix( 'admin' )->middleware( 'auth:admin' )->group( function () {
    Route::get( '/', [IndexController::class, 'index'] )->name( 'index' );
    Route::get( 'getUser', [IndexController::class, 'getUser'] )->name( 'getUser' );
    Route::get( 'getPost', [IndexController::class, 'getPost'] )->name( 'getPost' );
    Route::get( 'detailUser/{id}', [IndexController::class, 'getDetailUser'] )->name( 'detailUser' );
    Route::get( 'detailPost', [IndexController::class, 'getPost'] )->name( 'detailPost' );
    Route::post( 'delete', [DeleteController::class, 'delete'] )->name( 'delete' );
} );
//パスワードリセットルート
Route::get( '/reset-password/{token}', function ( $token ) {
    return view( 'reset-password', ['token' => $token] );
} )->middleware( 'guest' )->name( 'password.reset' );
Route::post( '/forgot-password', [AuthController::class, 'passwordReset'] )->middleware( 'guest' )->name( 'password.update' );

//ユーザールート
Route::get( '{any}', function () {
    return view( 'app' );
} )->where( 'any', '.*' );
