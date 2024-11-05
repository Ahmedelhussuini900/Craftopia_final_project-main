<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;



use Illuminate\Http\Request;
use App\Http\Resources\CustomerResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{

    public function index()
    {
        $customers = Customer::where('status','active')->get();  
        return CustomerResource::collection($customers);
    }

    public function getBanned()
    {
        $customers = Customer::where('status','banned')->get();  
        return CustomerResource::collection($customers);
    }

    public function banCustomer($id)
    {

        try{
        $customer = Customer::find($id);
        if (!$customer){
            return response()->json(['errors' => 'user not found'], 404);
 
        }  
        $customer->status = 'banned';
        $customer->save();

        return response()->json(['message' => 'banned successfully'], 200);
    }catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }

}
public function unBanCustomer($id)
{

    try{
    $customer = Customer::find($id);
    if (!$customer){
        return response()->json(['errors' => 'user not found'], 404);

    }  
    $customer->status = 'active';
    $customer->save();

    return response()->json(['message' => 'activated successfully'], 200);
}catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}

}

    

    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'phone' => 'required|string|max:15',
        'address' => 'required|string|max:255',
        'total_spent' => 'nullable|numeric|min:0',
        'status' => 'nullable|string|in:active,inactive',
        'user_id' => 'required|exists:users,id'
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    try {
        $customer = new Customer();
        $customer->phone = $request->phone;
        $customer->address = $request->address;
        $customer->total_spent = $request->total_spent ?? 0;
        $customer->status = $request->status ?? 'active';
        $customer->user_id = $request->user_id;  
        $customer->save();

        return response()->json(['message' => 'Customer created successfully', 'customer' => $customer], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}



public function show(Customer $customer)
    {
        return new ProductResource($customer);
    }




    

    public function getCustomerById($order_id)
    {


        $orderItem = OrderItem::find($order_id);
    
        if (!$orderItem) {
            return response()->json(['error' => 'Order item not found'], 404);
        }
    
        $order = Order::find($orderItem->order_id);
        
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }
    
        $customer = Customer::where('user_id', $order->user_id)->first();
        
        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }
    
        return new CustomerResource($customer);
    }

    public function getMyCustomer()
    {
        $customer = Customer::where('user_id', Auth::id())->first();
        if(!$customer){
            return response()->json(['error' => 'customer not found'], 404);
        }
        return new CustomerResource($customer);
    }


    

    public function update(Request $request, Customer $customer)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
            'total_spent' => 'nullable|numeric|min:0',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $customer->phone = $request->phone ?? $customer->phone;
            $customer->address = $request->address ?? $customer->address;
            $customer->total_spent = $request->total_spent ?? $customer->total_spent;
            $customer->status = $request->status ?? $customer->status;
            $customer->save();

            return response()->json(['message' => 'Customer updated successfully', 'customer' => $customer], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function destroy(Customer $customer)
    {
        try {
            $customer->delete();
            return response()->json(['message' => 'Customer deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    


    

    public function updateCustomer(Request $request)
    {
        try {
            
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:150',
                'last_name' => 'required|string|max:150',
                'phone' => 'required|string|max:150',
                'address' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',


            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }

            $user = Auth::user();
            $customer = Customer::where('user_id',$user->id)->first();
            if(!$customer){
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

            
            $customer->phone = $request->phone;
            $customer->address = $request->address;
            $user->save();
            $customer->save();


            return new CustomerResource($customer->load('user'));

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update seller: ' . $e->getMessage()], 500);
        }
    }

}
