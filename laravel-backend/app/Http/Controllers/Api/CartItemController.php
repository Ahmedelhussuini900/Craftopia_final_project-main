<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\CartItemResource;

class CartItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function getMyItems()
    {
        try{
        $cartItems = CartItem::with('product','product.addedOffers')->where('user_id',Auth::id())->get();
        return CartItemResource::collection($cartItems);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{

     
        $std_validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id', 
            'quantity' => 'required|numeric|min:1', 
        ]);
    if ($std_validator->fails()) {
        return response()->json(['errors' => $std_validator->errors()], 400);
    }
    $product = Product::find($request->product_id);
    if(!$product){
        return response()->json(['errors' => "product not found"], 404);

    }
    
    if($product->stock < $request->quantity){
        return response()->json(['errors' => "no enough product availbel in stock"], 409);

    }

    $exists = CartItem::where('product_id', $request->product_id)
    ->where('user_id', Auth::id())
    ->exists(); 

if ($exists) {
    return response()->json(['errors' => "Item already added to cart"], 403);
}
    
    $cartItem = new CartItem();
    $cartItem->product_id = $request->product_id;

    $cartItem->user_id = Auth::id();
    $cartItem->quantity = $request->quantity;
    $cartItem->save();
    return response()->json(['message' => "added successfully"], 200);

    return response()->json(['message' => "added successfully"], 200);

} catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}
    }

    /**
     * Display the specified resource.
     */
    public function show(CartItem $cartItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        try{

     
            $std_validator = Validator::make($request->all(), [
                'stock' => 'required|numeric|min:1', 
            ]);
        if ($std_validator->fails()) {
            return response()->json(['errors' => $std_validator->errors()], 400);
        }
        if($cartItem->product->stock < $request->stock){
        
            $cartItem->quantity = $cartItem->product->stock;
            $cartItem->save();
            
            // return response()->json(['errors' => "no enough product availbel in stock"], 409);

        }else{

            $cartItem->quantity = $request->stock;
            $cartItem->save();
        }
        return response()->json(['message' => 'updated successfully' , 'stock'=> $request->stock], 200);


    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
       

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CartItem $cartItem)
    {
        
        $cartItem->delete();
        return response()->json(['message' => 'CartItem  deleted successfully.']);
    }
}
