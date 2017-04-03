<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lab extends Model
{
    //
    function users(){
      return $this->hasMany(User::class);
    }
}
