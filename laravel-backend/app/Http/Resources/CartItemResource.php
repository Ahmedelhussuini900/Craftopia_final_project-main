<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
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
            'quantity' => $this->quantity,
            'user_id' => $this->user_id,
            'product_id' => $this->product_id,
            'user' => new UserResource($this->whenLoaded('user')), 
            'product' => new ProductResource($this->whenLoaded('product')), 
            'created_at' => $this->created_at->toDateTimeString(), 
            'updated_at' => $this->updated_at->toDateTimeString(), 
        ];
    }
}
