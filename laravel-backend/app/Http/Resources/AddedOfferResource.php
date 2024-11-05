<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
// use App\Http\Resources\AddedOffer;

class AddedOfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // $addedOffers = AddedOffer::with(['offer', 'product'])->get();

        // return parent::toArray($request);
        return [
            'id' => $this->id, 
            'offer_id' => $this->offer_id,
            'product_id' => $this->product_id,
            'offer' => new OfferResource($this->offer), 
            'product' => new ProductResource($this->whenLoaded('product')), 
            //==>
            //whenLoaded checks if a specified relationship has been loaded. If it has, 
            // the relationship data is included in the response; if not, it is omitted.
            // This prevents N+1 query problems, where each relationship would require a separate query if not eagerly loaded.
            
            'created_at' => $this->created_at->toDateTimeString(), 
            'updated_at' => $this->updated_at->toDateTimeString(), 
        ];
        
    }
    
}
