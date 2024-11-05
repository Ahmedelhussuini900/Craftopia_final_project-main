<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;

use Illuminate\Http\Request;

use Response;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class OrderController extends Controller
{
    public function index()
    {

        $orders = Order::where('status','!=','delivered')->where('user_id', Auth::id())->with('orderItems')->get();
        return response()->json($orders);

    }

    public function getMyOrder()
    {

        $orders = Order::where('user_id', Auth::id())->where('status','!=','delivered')->with('orderItems')->get();
        return response()->json($orders);

    }


    public function getDelivered()
    {

        $orders = Order::where('user_id', Auth::id())->where('status','delivered')->with('orderItems')->get();
        return response()->json($orders);

    }
    

    public function store(Request $request)
    {
try{
        $validator = Validator::make($request->all(), [
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'total' => 'required|integer|min:1',
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }


        $order = Order::create([
            'phone' => $request->phone,
            'address' => $request->address,
            'total' => $request->total,
            'user_id' => Auth::id(),
            'payment_status' => 'not_payed', 
        ]);

        $cartItems = CartItem::where('user_id',Auth::id())->get();
        foreach($cartItems as $cartItem){

            $orderItem =new OrderItem();
            $orderItem->quantity = $cartItem->quantity;
            $orderItem->product_id = $cartItem->product_id;
            $orderItem->order_id = $order->id;
            $orderItem->save();



        }
        CartItem::where('user_id', Auth::id())->delete();
        return response()->json(['message' => 'ordr added successfuly'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }

    }

    public function show(Order $order)
{
    if ($order->user_id !== Auth::id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    return response()->json($order);

}


public function update(Request $request, Order $order)
{
    if ($order->user_id !== Auth::id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    $validator = Validator::make($request->all(), [
        'phone' => 'sometimes|required|string|max:15',
        'address' => 'sometimes|required|string|max:255',
        'total' => 'sometimes|required|integer|min:1',
        'payment_status' => 'sometimes|required|in:payed,not_payed,canceled',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    if ($order->payment_status === 'canceled' || $order->payment_status === 'delivered') {
        return response()->json(['error' => 'Order cannot be canceled'], 422);
    }

    $order->update($request->only(['phone', 'address', 'total', 'payment_status']));

    return response()->json($order, 200);
}


public function destroy(Order $order)
{
    if ($order->user_id !== Auth::id()) {
        return response()->json(['error' => 'Unauthorized'], 40);
    }
 
    if ($order->payment_status == 'payed') {
        return response()->json([ 'error' => 'can not delete a payed order'], 403);
    }
    
    $order->delete();

    return response()->json(null, 204);
}

}



