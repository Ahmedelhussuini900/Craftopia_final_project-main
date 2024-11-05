<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentRequestResource extends JsonResource
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
            'getway' => $this->getway,
            'amount' => $this->amount,
            'account' => $this->account,
            'status' => $this->status,
            'error_message' => $this->error_message,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
