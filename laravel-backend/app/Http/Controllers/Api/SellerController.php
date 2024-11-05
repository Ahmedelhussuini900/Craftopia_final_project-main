<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SellerResource;
use Illuminate\Support\Facades\Auth;

class SellerController extends Controller
{
    




    public function getSellerById($order_id)
    {


        $orderItem = OrderItem::find($order_id);
    
        if (!$orderItem) {
            return response()->json(['error' => 'Order item not found'], 404);
        }
    
        // $product = Product::find($orderItem->product_id);
        $product = Product::withTrashed()->where('id', $orderItem->product_id)->first();
        
        if (!$product) {
            return response()->json(['error' => 'product not found'], 404);
        }
    
        $seller = Seller::with('user')->where('user_id', $product->user_id)->first();
        
        if (!$seller) {
            return response()->json(['error' => 'seller not found'], 404);
        }
    
        return new SellerResource($seller);
    }


    public function index()
    {
        try {
            $sellers = Seller::with(relations: 'user')->where('status','active')->get();  
            return SellerResource::collection($sellers);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve sellers: ' . $e->getMessage()], 500);
        }
    }



    public function getBanned()
    {
        $sellers = Seller::with(relations: 'user')->where('status','banned')->get();  
        return SellerResource::collection($sellers);
    }

    public function banSeller($id)
    {

        try{
        $seller = Seller::find($id);
        if (!$seller){
            return response()->json(['errors' => 'user not found'], 404);
 
        }  
        $seller->status = 'banned';
        $seller->save();

        return response()->json(['message' => 'banned successfully'], 200);
    }catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }

}
public function unBanSeller($id)
{

    try{
    $seller = Seller::find($id);
    if (!$seller){
        return response()->json(['errors' => 'user not found'], 404);

    }  
    $seller->status = 'active';
    $seller->save();

    return response()->json(['message' => 'activated successfully'], 200);
}catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}

}

  


    /**
     * Store a newly created seller in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate the request data
            $validator = Validator::make($request->all(), [
                'phone' => 'required|string|max:15',
                'address' => 'required|string|max:255',
                'shope_name' => 'required|string|max:255',
                'about' => 'nullable|string|max:255',
                'user_id' => 'required|exists:users,id',  // Ensure the user exists
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            // Create a new Seller
            $seller = Seller::create([
                'phone' => $request->phone,
                'address' => $request->address,
                'shope_name' => $request->shope_name,
                'about' => $request->about,
                'total_sales' => 0,  // Default value for a new seller
                'status' => 'active',  // Default status
                'user_id' => $request->user_id,
            ]);

            return response()->json(['seller' => $seller], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create seller: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified seller.
     */
    public function show($seller)
    {
        try {
            $mySeller = Seller::with('user')->
            where('user_id' , $seller)->first();
            return new SellerResource($seller);  //response()->json($seller->load('user'), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Seller not found: ' . $e->getMessage()], 404);
        }
    }


    public function getSeller()
    {
        try {
            $mySeller = Seller::with('user')
                ->where('user_id', Auth::id())
                ->first();
    
            if (!$mySeller) {
                return response()->json(['error' => 'Seller not found'], 404);
            }
    
            return new SellerResource($mySeller);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Some error happened: ' . $e->getMessage()], 500);
        }
    }
    

    

    

    public function updateSeller(Request $request)
    {
        try {
            
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:150',
                'last_name' => 'required|string|max:150',
                'phone' => 'required|string|max:150',
                'address' => 'required|string|max:255',
                'shop_name' => 'required|string|max:255',
                'about' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',


            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }
            // $data = $request->all();

            $user = Auth::user();
            $seller = Seller::where('user_id',$user->id)->first();
            if(!$seller){
                return response()->json(['errors' => 'some error happend'], 404);
            } 
            $my_path = $user->image ;
        if(request()->hasFile("image")){

            $url = $user->image;

            $relativePath = str_replace(url('uploads/').'/' , '', $url);
            
            if (Storage::disk('uploads')->exists($relativePath)) {
                Storage::disk('uploads')->delete($relativePath);
            }

        
            $image = request()->file("image");
            $my_path=$image->store('users','uploads');
            $my_path= asset('uploads/' . $my_path); 
        }


            $user->name = $request->name;
            $user->last_name = $request->last_name;
            $user->image = $my_path;

            
            $seller->phone = $request->phone;
            $seller->address = $request->address;
            $seller->shope_name = $request->shop_name;
            $seller->about = $request->about;
            $user->save();
            $seller->save();
            // return response()->json(['error' => $seller->user_id], 500);


            return new SellerResource($seller->load('user'));

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update seller: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, Seller $seller)
    {
        try {
            // Validate the request data
            $validator = Validator::make($request->all(), [
                'phone' => 'nullable|string|max:15',
                'address' => 'nullable|string|max:255',
                'shope_name' => 'nullable|string|max:255',
                'about' => 'nullable|string|max:255',
                'status' => 'nullable|string|in:active,inactive',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            // Update seller details
            $seller->update($request->only(['phone', 'address', 'shope_name', 'about', 'status']));

            return response()->json(['message' => 'Seller updated successfully', 'seller' => $seller], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update seller: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified seller from storage.
     */
    public function destroy(Seller $seller)
    {
        try {
            // Delete the seller
            $seller->delete();

            return response()->json(['message' => 'Seller deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete seller: ' . $e->getMessage()], 500);
        }
    }
}
