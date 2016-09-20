<?php

use Illuminate\Http\Request;

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

Route::get('/get-user/{user_id}', 'ApiController@getUser')->middleware('auth:api');
Route::get('/get-all-users', 'ApiController@getUsers')->middleware('auth:api');
Route::get('/get-all-countries', 'ApiController@getCountries')->middleware('auth:api');