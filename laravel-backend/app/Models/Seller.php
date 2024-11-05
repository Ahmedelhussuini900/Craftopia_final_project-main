<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone', 'address', 'shope_name', 'about', 'total_sales', 'status', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
