<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ReviewResource;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllReviews($product_id)
{
    $reviews = Review::with(['product', 'user'])
        ->where('product_id', $product_id)
        ->get();

    return ReviewResource::collection($reviews);
}
    
    public function store(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'product_id' => 'required|integer|exists:products,id',
                'feedback' => 'required|string|max:255',
                'rating' => 'required|integer|in:0,1,2,3,4,5',

            ]);
            
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

         

            $item = new Review();
            // 'rating', 'feedback', 'product_id', 'user_id'

            $item->product_id = $request->input('product_id');
            $item->rating = $request->input('rating');
            $item->feedback = $request->input('feedback');

            $item->user_id = Auth::id();
            $item->save();
    
            return response()->json(['message' => 'review added successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        try{
        $review->delete();
        return response()->json(['message' => 'review deleted successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
}
