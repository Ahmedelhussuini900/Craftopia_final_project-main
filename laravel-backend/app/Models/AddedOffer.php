<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class AddedOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'offer_id', 'product_id'
    ];
    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
    
    public function getDiscountAmount()
{
    $offer = $this->offer;

    if ($offer && Carbon::parse($offer->end_date)->isFuture()) {
        return $offer->discount;
    }

    return 0; 
}

}
