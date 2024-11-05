<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SellerResource extends JsonResource
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
            'phone' => $this->phone,
            'address' => $this->address,
            'shop_name' => $this->shope_name,
            'about' => $this->about,
            'total_sales' => $this->total_sales,
            'status' => $this->status,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
