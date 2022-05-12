<?php

use App\Http\Controllers\FriendRelationController;
use App\Http\Controllers\HomeIndexcontroller;
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

Route::get('/FriendRelation',[FriendRelationController::class,'index']);
















Route::get('homeIndex', 'App\Http\Controllers\HomeIndexcontroller@homeIndex');
