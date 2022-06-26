<?php

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

Route::get( '/reset-password/{token}', function ( $token ) {
    return view( 'reset-password', ['token' => $token] );
} )->middleware( 'guest' )->name( 'password.reset' );

Route::post( '/forgot-password', [AuthController::class, 'passwordReset'] )->middleware( 'guest' )->name( 'password.update' );

Route::get( '{any}', function () {
    return view( 'app' );
} )->where( 'any', '.*' );
