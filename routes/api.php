<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FriendRelationController;
use App\Http\Controllers\Homecontroller;
use App\Http\Controllers\MailController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikelistController;
use App\Http\Controllers\PostlistController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return Auth::user();
});
Route::post('user', [UserController::class, 'store']);
Route::post('login', [AuthController::class, 'login']);
Route::get('logout', [AuthController::class, 'logout']);

Route::post('/forgot-password', [MailController::class, 'sendMail'])->middleware('guest');

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('FriendRelation', [FriendRelationController::class, 'index']);
    Route::get('FriendShow/{id}', [FriendRelationController::class, 'show']);
    Route::post('mypage/update', [FriendRelationController::class, 'update']);
    Route::get('mypage/friendDetail', [FriendRelationController::class, 'friendDetail']);
    Route::get('mypage/chat', [ChatController::class, 'index']);
    Route::post('mypage/chat', [ChatController::class, 'store']);
    Route::post('mypage/post/store', [PostController::class, 'store']);
    Route::get('mypage/post/show', [PostController::class, 'show']);
    Route::post('mypage/post/update', [PostController::class, 'update']);
    Route::get('userInfo/checkFriend', [Homecontroller::class, 'checkFriend']);
    Route::post('userInfo/makeFriend', [Homecontroller::class, 'makeFriend']);

    Route::get('mypage/likelist', [LikelistController::class, 'index']);
    Route::get('mypage/postlist', [PostlistController::class, 'index']);
    Route::post('mypage/postlist/delete', [PostlistController::class, 'delete']);
    Route::post('detail/review', [Homecontroller::class, 'postReview']);
    Route::post('detail/like', [Homecontroller::class, 'like']);

    Route::post('user/updata', [UserController::class, 'update']);

    Route::get('ProfileShow/{id}', [ProfileController::class, 'show']);
    Route::post('ProfileStor', [ProfileController::class, 'store']);
    Route::post('ProfileUpdate', [ProfileController::class, 'update']);
});

Route::get('homeIndex', [Homecontroller::class, 'homeIndex']);
Route::get('home/likeCount', [Homecontroller::class, 'likeCount']);
Route::get('detail', [Homecontroller::class, 'showDetail']);
Route::get('detail/checkLike', [Homecontroller::class, 'checkLike']);
Route::get('detail/review', [Homecontroller::class, 'showReview']);

Route::group(['middleware' => ['auth:sanctum']], function () {
});
