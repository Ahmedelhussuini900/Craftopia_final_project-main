<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'payment_status' => $this->payment_status,
            'phone' => $this->phone,
            'address' => $this->address,
            'total' => $this->total,
            'error_message' => $this->error_message,
            'user' => new UserResource($this->whenLoaded('user')),
            // 'order_items' => OrderItemResource::collection($this->whenLoaded('orderItems')),
        ];
    }
}
