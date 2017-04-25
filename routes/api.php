<?php

use Illuminate\Http\Request;
//require_once '../vendor/autoload.php';








/*
---------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
	return $request->user();
});

// Route::get('/authenticate', function () {
// 	return Auth::user();
// }
// )->middleware('auth.oauth');

// Route::get('/authenticate/{method}/{authToken}', function ($method, $authToken) {
// 	echo 'anyad';
// 	$client = new Google_Client();
// 	$client->setAuthConfig('../config/client_credentials.json');

// 	$payload = $client->verifyIdToken($id_token);
// 	if ($payload) {
// 		$userid = $payload['sub'];
// 		return response(['a' => 'lofasz']);
// 	}
// 	else {
// 		return response(['a' => 'lofasz']);
// 	}
// }
// );
