<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Resource extends Model
{
  protected $guarded = ['id'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
    //
}
