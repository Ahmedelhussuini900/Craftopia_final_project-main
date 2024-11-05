<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WishList;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class WishListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    


    public function inWishlist(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'product_id' => 'required|integer|exists:products,id',
            ]);
            
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            if (WishList::where('product_id', $request->input('product_id'))
            ->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => true], 200); 
        }
            return response()->json(['message' => false], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    

    public function store(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'product_id' => 'required|integer|exists:products,id',
            ]);
            
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }
            if (WishList::where('product_id', $request->input('product_id'))
            ->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'Item is already in your wishlist'], 409); 
        }

            $item = new WishList();
            $item->product_id = $request->input('product_id');
            $item->user_id = Auth::id();
            $item->save();
    
            return response()->json(['message' => 'item added successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(WishList $wishList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WishList $wishList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // return response()->json(['message' => $product], 200);

        // $wishlist = WishList::where('product_id',$product->id)->first();
        // if (!$wishlist) {
        //     return response()->json(['message' => 'Product not found.'], 404);
        // }

        // $wishlist->destroy();
        // return response()->json(['message' => 'All done.'], 200);
        
    }

    public function removeWishlist($product_id)
    {

        $wishlist = WishList::where('product_id',$product_id)->first();
        if (!$wishlist) {
            return response()->json(['message' => 'Product not found.'], 404);
        }
        // return response()->json(['message' =>  $wishlist], 200);


        $wishlist->delete();
        return response()->json(['message' => 'All done.'], 200);
        
    }


    
}
