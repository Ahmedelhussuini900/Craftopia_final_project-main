<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\CustomVerifyEmail;

use App\Notifications\MyResetPasswordNotification;


use Laravel\Sanctum\HasApiTokens; 

class User extends Authenticatable  implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email', 'password', 'image', 'role', 'gender' , 'last_name'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function customOrders()
    {
        return $this->hasMany(CustomOrder::class, 'owner_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function wishLists()
    {
        return $this->hasMany(WishList::class);
    }

    // public function sendEmailVerificationNotification()
    // {
    //     $this->notify(new CustomVerifyEmail($this->generateVerificationToken()));
    // }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new MyResetPasswordNotification($token));
    }
}
