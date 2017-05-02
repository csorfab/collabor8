<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'description', 'numberOfParticipants',
        'availabilityFrom', 'availabilityTill',
        'location', 'devices',
        'testMethods', 'payment', 'languageNative',
        'languageSecond', 'additional'
    ];

    protected $appends = [
        'user'
    ];

    protected $hidden = [

    ];

    protected $casts = [
        'location' => 'array',
        'devices' => 'array',
        'testMethods' => 'array'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getUserAttribute(){
        return User::find($this->user_id);
    }
}
