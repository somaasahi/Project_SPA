<?php

use App\Http\Controllers\FriendRelationController;
use App\Http\Controllers\HomeIndexcontroller;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
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
    return $request->user();
});

Route::post('login', [LoginController::class, 'authenticate']);

Route::get('FriendRelation', [FriendRelationController::class, 'index']);
Route::get('FriendShow/{id}', [FriendRelationController::class, 'show']);
Route::post('user', [UserController::class, 'store']);

















Route::get('homeIndex', 'App\Http\Controllers\Homecontroller@homeIndex');
Route::get('home/detail', 'App\Http\Controllers\Homecontroller@showdetail');
Route::get('home/user', 'App\Http\Controllers\Homecontroller@showuser');
