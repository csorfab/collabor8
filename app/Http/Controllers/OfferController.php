<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Offer;
use App\User;

class OfferController extends Controller
{
    public function list()
    {
        return response(Offer::orderBy('updated_at', 'desc')->get());
    }

    public function new()
    {
        $newOffer = request()->input('offer');

    	$offer = new Offer($newOffer);
    	$offer->user_id = Auth::user()->id;

    	if($offer->save()){
    		return response($offer->toArray());
    	}
    }

    public function update()
    {
        $user = Auth::user();
    	$newOffer = request()->input('offer');

    	$offer = Offer::find($newOffer['id']);

    	if(!$offer){
    		return $this->new();
    	}

    	if($offer->user_id != $user->id){
    		return response('Not your offer, gtfo', 403);
    	}

    	$offer->fill($newOffer);
    	$offer->save();

    	return response($offer);
    }
}
