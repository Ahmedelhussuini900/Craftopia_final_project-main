<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'image' => $this->image,
            'role' => $this->role,
            'gender' => $this->gender,
            'last_name' => $this->last_name,
            'email_verified_at' => $this->email_verified_at,
            // 'custom_orders' => CustomOrderResource::collection($this->whenLoaded('customOrders')),
            // 'products' => ProductResource::collection($this->whenLoaded('products')),
            // 'cart_items' => CartItemResource::collection($this->whenLoaded('cartItems')),
            // 'wish_lists' => WishListResource::collection($this->whenLoaded('wishLists')),
        ];
    }
}
