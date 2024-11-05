<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AddedOffer;
use Illuminate\Http\Request;

class AddedOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
     public function create()
     {
         return view('AddedOffers.create'); // Adjust the path as necessary
     }
     public function index()
     {
         return response()->json(AddedOffer::all(), 200);
     }
 
     public function store(Request $request)
     {
         // Validate the incoming request
         $request->validate([
             'offer_id' => 'required|integer',
             'product_id' => 'required|integer',
         ]);
 
         // Create a new added offer using mass assignment
         $addedOffer = AddedOffer::create($request->all());
 
         // Redirect to index page with success message
         return redirect()->route('added-offers.index')->with('success', 'Added Offer created successfully.');
     }
     /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json(AddedOffer::findOrFail($id), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $addedOffer = AddedOffer::findOrFail($id);
        $request->validate([
            'offer_id' => 'sometimes|required|integer',
            'product_id' => 'sometimes|required|integer',
        ]);

        $addedOffer->update($request->all());
        return response()->json($addedOffer, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $addedOffer = AddedOffer::findOrFail($id);
        $addedOffer->delete();
        return response()->noContent();
    }
}
