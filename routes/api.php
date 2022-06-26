<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FriendRelationController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware( 'auth:sanctum' )->get( '/user', function ( Request $request ) {
    return Auth::user();
} );
Route::post( 'user', [UserController::class, 'store'] );
Route::post( 'login', [AuthController::class, 'login'] );
Route::get( 'logout', [AuthController::class, 'logout'] );

Route::post( '/forgot-password', [MailController::class, 'sendMail'] )->middleware( 'guest' );

Route::group( ['middleware' => ['auth:sanctum']], function () {
    Route::get( 'FriendRelation', [FriendRelationController::class, 'index'] );
    Route::get( 'FriendShow/{id}', [FriendRelationController::class, 'show'] );

    Route::get( 'mypage/likelist', 'App\Http\Controllers\Likelistcontroller@index' );
    Route::get( 'mypage/postlist', 'App\Http\Controllers\Postlistcontroller@index' );
    Route::post( 'mypage/postlist/delete', 'App\Http\Controllers\Postlistcontroller@delete' );
    Route::post( 'detail/review', 'App\Http\Controllers\Homecontroller@postReview' );
    Route::post( 'detail/like', 'App\Http\Controllers\Homecontroller@like' );

    Route::post( 'user/updata', [UserController::class, 'update'] );

    Route::get( 'ProfileShow/{id}', [ProfileController::class, 'show'] );
    Route::post( 'ProfileStor', [ProfileController::class, 'store'] );
    Route::post( 'ProfileUpdate', [ProfileController::class, 'update'] );
} );

Route::get( 'homeIndex', 'App\Http\Controllers\Homecontroller@homeIndex' );
Route::get( 'home/likeCount', 'App\Http\Controllers\Homecontroller@likeCount' );
Route::get( 'detail', 'App\Http\Controllers\Homecontroller@showDetail' );
Route::get( 'detail/checkLike', 'App\Http\Controllers\Homecontroller@checkLike' );
Route::get( 'detail/review', 'App\Http\Controllers\Homecontroller@showReview' );

Route::group( ['middleware' => ['auth:sanctum']], function () {
} );
