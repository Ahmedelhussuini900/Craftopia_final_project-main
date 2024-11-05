<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentRequest extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'getway',
        'amount',
        'account',
        'status',
        'error_message',
        'user_id',
    ];

 
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
