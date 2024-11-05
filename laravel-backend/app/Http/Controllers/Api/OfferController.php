<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Offer;
use Illuminate\Http\Request;
use App\Http\Resources\OfferResource;
use App\Models\Product;
use App\Models\AddedOffer;
class OfferController extends Controller
{
    

    public function addOfferToProducts(Request $request)
    {
        
        $validatedData = $request->validate([
            'product_ids' => 'required|array|min:1',
            'product_ids.*' => 'exists:products,id',
            'offer_id' => 'required|exists:offers,id',
        ]);


        $productIds = $validatedData['product_ids'];
        $offerId = $validatedData['offer_id'];

        foreach ($productIds as $productId) {

            $existingOffer = AddedOffer::where('product_id', $productId)
                                       ->where('offer_id', $offerId)
                                       ->first();

            if (!$existingOffer) {
                
                AddedOffer::create([
                    'product_id' => $productId,
                    'offer_id' => $offerId,
                ]);
            }
        }

        return response()->json(['message' => 'Offer successfully added to products'], 200);
    }

    public function index()
    {
        try{
        $offers = Offer::all();

        return OfferResource::collection($offers);
    }catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
        
    }



    public function getMyOffers()
    {
        try{


            
        $offers = Offer::where('user_id' , Auth::id())->get();
        // return response()->json(['message' => $offers], 200);

        return OfferResource::collection($offers);
    }catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
        
    }
 
    


public function store(Request $request)
{

    // return response()->json(['errors' => $request->all()], 400);

    $validator = Validator::make($request->all(), [
        // 'start_date' => 'required|date|after:today',
        // 'end_date' => 'required|date|after:start_date',
        'discount' => 'required|integer|min:1',
    ]);

    
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);

    }

    $offer = new Offer();
    $offer->start_date = $request->input('start_date');
    $offer->end_date = $request->input('end_date');
    $offer->discount = $request->input('discount');
    // return response()->json(['errors' => Auth::id()], 400);

    $offer->user_id = Auth::id(); 
    $offer->save();
    return response()->json(['message' => "added successfully"], 200);

    return redirect()->route('offers.index')->with('success', 'Offer created successfully!');
}

    /**
     * Display the specified resource.
     */
    public function show(Offer $offer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Offer $offer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offer $offer)
    {
        try{
    $offer->delete();
    return response()->json(['message' => 'deleted successfully'], 200);
}catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
