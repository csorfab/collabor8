<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'description', 'numberOfParticipants',
        'availabilityFrom', 'availabilityTill',
        'locationString', 'languages',
        'online', 'lab', 'field', 'type'
    ];

    protected $appends = [
        'user'
    ];

    protected $hidden = [

    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getUserAttribute(){
        return User::find($this->user_id);
    }
}
