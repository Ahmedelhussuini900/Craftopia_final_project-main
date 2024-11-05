<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_name', 'price', 'description', 'stock', 'user_id', 'category_id' ,'video'
    ];
    protected $dates = ['deleted_at'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
    public function addedOffers()
    {
        return $this->hasMany(AddedOffer::class);
    }

    public function wishlistItems()
    {
        return $this->hasMany(WishList::class);
    }
}
