<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;
    protected $fillable = [
        'start_date', 'end_date', 'discount' , 'user_id'
    ];

    public function addedOffers()
    {
        return $this->hasMany(AddedOffer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }    

}
