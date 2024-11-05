<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomOrderResource extends JsonResource
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
            'id' => $this->id, // Include the primary key if needed
            'description' => $this->description,
            'price_from' => $this->price_from,
            'price_to' => $this->price_to,
            'image' => $this->image,
            'seller' => new UserResource($this->whenLoaded('seller')), 
            //In this context, the 'seller' inside the whenLoaded function is 
            //the name of the relationship being checked or loaded from the User model.
            'owner' => new UserResource($this->whenLoaded('owner')), 
            'product' => new ProductResource($this->whenLoaded('product')), 
            'created_at' => $this->created_at->toDateTimeString(), 
            'updated_at' => $this->updated_at->toDateTimeString(), 
        ];
    }
}
