<?php

namespace App\Http\Middleware;

//require_once '../vendor/autoload.php';

use Google_Client;
use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class AuthenticateOAuth
{
	
	
	
	/**
	* Handle an incoming request.
			     *
			     * @param  \Illuminate\Http\Request  $request
			     * @param  \Closure  $next
			     * @return mixed
			     */


    private function authenticateUserOAuth($method, $authToken) {
		$client = new Google_Client();
		$client->setAuthConfig('../config/client_secret.json');

            //  lehet, hogy ertelmetlen ez az egesz??
            // semikkepp nem akarom egy ervenytelen tokennel beengedni
            // tehat mindenkepp csekkolnom kell a guglival?
		// $user = User::where('auth_token', $authToken)->first();
		// if($user) 
        //     return $user;
		
		$payload = $client->verifyIdToken($authToken);
		if(!$payload) 
            return false;



		$authId = $payload['sub'];
		$user = User::where('auth_id', $authId)->first();
		if($user){
			$user->auth_token = $authToken;
			$user->save();
			
			return $user;
		}

		
		$user = User::create([
            'name' => $payload['name'],
            'email' => $payload['email'],
            'password' => Hash::make($authId),
            'auth_type' => 'google',
            'auth_token' => (string) $authToken,
            'auth_id' => $authId
        ]);     

		$user->save();
		
		return $user;
	}
	
	public function handle($request, Closure $next) {
        $user = $this->authenticateUserOAuth($request->authMethod, $request->authId);
		if(!$user) return response('authentication failed', 401);
		
        Auth::login($user);

        return $next($request);
	}
}
