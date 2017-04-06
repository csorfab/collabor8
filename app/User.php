<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Resource;

// Google OAuth Credentials
// Client ID: 585712562710-govrams0k2v0hunlb6oi5266v4gldakf.apps.googleusercontent.com
// Secret: 1zFdUxQe41QwcUqhOI9gWZ0o
// API key: AIzaSyCiEnpb4qnKmN3BXUniMFRNhxCSXefQP8I


class User extends Authenticatable
{
	use Notifiable;
	
	
	
	
	/**
	* The attributes that are mass assignable.
			     *
			     * @var array
			     */
			    protected $fillable = [
			        'name', 'email', 'password',
			    ];
	
	
	
	
	/**
	* The attributes that should be hidden for arrays.
			     *
			     * @var array
			     */
			    protected $hidden = [
			        'password', 'remember_token',
			    ];
	
	public function lab(){
		return $this->belongsTo(Lab::class);
	}
	
}
