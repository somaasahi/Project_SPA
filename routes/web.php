<?php

use App\Http\Controllers\Admin\DeleteController;
use App\Http\Controllers\Admin\IndexController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\SearchController;
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
    Route::get( 'getSoftdeletesUser', [IndexController::class, 'getSoftdeletesUser'] )->name( 'getSoftdeletesUser' );
    Route::get( 'getPost', [IndexController::class, 'getPost'] )->name( 'getPost' );
    Route::get( 'detailPost/{id}', [IndexController::class, 'getDetailPost'] )->name( 'detailPost' );
    Route::get( 'detailUser/{id}', [IndexController::class, 'getDetailUser'] )->name( 'detailUser' );
    Route::get( 'softDeleteUser/{id}', [DeleteController::class, 'softDeleteUser'] )->name( 'softDeleteUser' );
    Route::get( 'restoreUser/{id}', [DeleteController::class, 'restoreUser'] )->name( 'restoreUser' );
    Route::get( 'softDeletePost/{id}', [DeleteController::class, 'softDeletePost'] )->name( 'softDeletePost' );
    Route::get( 'restorePost/{id}', [DeleteController::class, 'restorePost'] )->name( 'restorePost' );
    Route::post( 'delete', [DeleteController::class, 'delete'] )->name( 'delete' );
    Route::post( 'getUserSearch', [SearchController::class, 'getUserSearch'] )->name( 'getUserSearch' );
    Route::post( 'getSoftdeletesUserSearch', [SearchController::class, 'getSoftdeletesUserSearch'] )->name( 'getSoftdeletesUserSearch' );
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
