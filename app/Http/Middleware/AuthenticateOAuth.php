<?php

namespace App\Http\Middleware;

//require_once '../vendor/autoload.php';

use Google_Client;
use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticateOAuth
{
	
	
	
	/**
	* Handle an incoming request.
			     *
			     * @param  \Illuminate\Http\Request  $request
			     * @param  \Closure  $next
			     * @return mixed
			     */

	private function verifyToken($token){
		$client = new Google_Client();
		$client->setAuthConfig('../config/client_secret.json');

		return $client->verifyIdToken($token);
	}

    private function authenticateUserOAuth($method, $authToken) {
		try {
			$payload = $this->verifyToken($authToken);
		} catch (BeforeValidException $e)  {
			// leszarjuk
		}
		
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
			'image_url' => $payload['picture'],
            'auth_type' => 'google',
            'auth_token' => (string) $authToken,
            'auth_id' => $authId
        ]);

		$user->save();	
		return $user;
	}
	
	public function handle($request, Closure $next) {
        $user = $this->authenticateUserOAuth($request->authMethod, $request->authToken);
		if(!$user) return response('authentication failed', 401);
		
        Auth::login($user);

        return $next($request);
	}
}
