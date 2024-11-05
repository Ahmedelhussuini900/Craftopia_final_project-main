<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'product_name' => $this->product_name,
            'price' => $this->price,
            'description' => $this->description,
            'stock' => $this->stock,
            'cover_image' => $this->cover_image,
            'size' => $this->size,
            'video' => $this->video,
            'material' => $this->material,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'user' => new UserResource($this->whenLoaded('user')),
            'total_ordered' =>$this->total_ordered,
            'deleted_at' => $this->deleted_at, 
            'images' => ProductImageResource::collection($this->whenLoaded('images')),
            'addedOffers' => AddedOfferResource::collection($this->whenLoaded('addedOffers')),

        ];
    }
}
