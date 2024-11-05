<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\Seller;
use App\Http\Resources\OrderItemResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class OrderItemController extends Controller
{
    

    public function index()
    { 
        
        $orderItems = OrderItem::all();
        return response()->json($orderItems);
    }


    

    public function getMyOldOrderItems()
    { 
     
        try{
            $orders = Order::where('user_id', Auth::id())->get();

            if ($orders->isEmpty()) {
                return response()->json(['error' => 'No orders found'], 404);
            }
    
            $orderIds = $orders->pluck('id');
    
            $orderItems = OrderItem::with('product', 'product.addedOffers', 'product.category')
                ->whereIn('order_id', $orderIds)
                ->where('status', 'delivered')
                ->get();
            
        return OrderItemResource::collection($orderItems);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }


    public function getMyOrderItems($order_id)
    { 
     
        try{
            $order = Order::find($order_id);
        if(!$order){
            return response()->json(['error' => 'order not found'], 404);

            }
            $orderItems = OrderItem::with('product', 'product.addedOffers', 'product.category')
            ->where('order_id', $order_id)
            ->where('status', '!=', 'delivered') 
            ->get();
            
        return OrderItemResource::collection($orderItems);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }







    public function serveOrderItem($item_id)
    { 
     
        try{
            $item = OrderItem::find($item_id);
        if(!$item){
            return response()->json(['error' => 'order not found'], 404);

            }
            $product = Product::find($item->product_id);
            if (!$product){
                return response()->json(['error' => 'product not found'], 404);
            }
            if ($product->stock <= $item->quantity){
                return response()->json(['error' => 'there is no enough in your stock' ], 403);
            }
            $order = Order::find($item->order_id);

            if (!$order){
                return response()->json(['error' => 'order not found'], 404);
            }

            $item->status ='done';
            $item->save();

            $allDone = $order->orderItems->every(function ($orderItem) {
                return $orderItem->status === 'done';
            });
            
            if ($allDone) {
                $order->status = 'done';
                $order->save();
            }

            
            $product->stock =$product->stock - $item->quantity;
            $product->save();

            return response()->json(['message' => "added successfully"], 200);
        } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }

    

    public function doneOrderItem($item_id)
    { 
        try{
            $item = OrderItem::find($item_id);
        if(!$item){
            return response()->json(['error' => 'order not found'], 404);
            }


            $order = Order::find($item->order_id);


            if (!$order){
                return response()->json(['error' => 'order not found'], 404);
            }

            $item->status ='done';
            $item->save();

            $allDone = $order->orderItems->every(function ($orderItem) {
                return $orderItem->status === 'done';
            });
            
            if ($allDone) {
                $order->status = 'done';
                $order->save(); 
            }

            return response()->json(['message' => "added successfully"], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }


    public function craftOrderItem($item_id)
    { 
        try{
            $item = OrderItem::find($item_id);
        if(!$item){
            return response()->json(['error' => 'order not found'], 404);
            }

            $item->status ='doing';
            $item->save();
            return response()->json(['message' => "added successfully"], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
    



    protected function calculateTotalOffers(Product $product)
    {
        return $product->addedOffers->sum(function ($offer) {
            return $offer->getDiscountAmount();
        });
    }
    
public function payForOrderItem($item_id)
{ 

    try{

        $order_item = OrderItem::find($item_id);
        if(!$order_item){
        return response()->json([ 'error' => 'ordr Item not found'], 404);
}

        $product = Product::find($order_item->product_id);
        if(!$product){
            return response()->json([ 'error' => 'product not found'], 404);
        }
        $seller= Seller::where('user_id',$product->user->id)->first();

   if (!$seller) {
        return response()->json([ 'error' => 'seller not found'], 404);
    }

        $totalOffers = $this->calculateTotalOffers($product); 
        $offersPrecintage = ($totalOffers /100);
        $priceAfterOffers = $product->price - ($product->price *  $offersPrecintage); 
        $productTotal = $priceAfterOffers * $order_item->quantity;  
        $seller->increment('total_sales', $productTotal );
        
        $order_id = $order_item->order_id;
        $order = Order::find($order_id);
        $order_item->status = 'delivered';
        $order_item->save();
        
        $allItemsDelivered = $order->orderItems()->where('status', '!=', 'delivered')->count() == 0;
        if ($allItemsDelivered) {
            $order->status = 'delivered';
            $order->save();
        }
        
 
        return response()->json([ 'message' => 'payment Done'], 200);

} catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}
}


public function getDoneOrders()
{ 

    $id = Auth::id();
    
    try{

        $orderItems = OrderItem::with('product', 'product.addedOffers', 'order')
        ->whereHas('product', function($query) use ($id) {
            $query->where('user_id', $id);  
        })
        ->whereHas('order', function($query) {
            $query->where('payment_status', 'payed');  
        })->where('status','done')
        ->get();

    return OrderItemResource::collection($orderItems);
} catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}
}

public function getDoingOrders()
{ 

    $id = Auth::id();
    
    try{

        $orderItems = OrderItem::with('product', 'product.addedOffers', 'order')
        ->whereHas('product', function($query) use ($id) {
            $query->where('user_id', $id);  
        })
        ->whereHas('order', function($query) {
            $query->where('payment_status', 'payed');  
        })->where('status','doing')
        ->get();

    return OrderItemResource::collection($orderItems);
} catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}
}









public function getDoingOrderItems()
{ 
    try{


        $orderItems = OrderItem::with([
            'product' => function($query) {
                $query->withTrashed(); 
            },
            'product.addedOffers',
            'product.user',
            'order'
        ])
        ->whereHas('order', function($query) {
            $query->where('payment_status', 'payed');  
        })
        ->where('status', 'doing')
        ->get();

        // $orderItems = OrderItem::with('product', 'product.addedOffers', 'order')
        // ->whereHas('order', function($query) {
        //     $query->where('payment_status', 'payed');  
        // })->where('status','doing')
        // ->get();

    return OrderItemResource::collection($orderItems);
} catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}
}


public function getWaitingOrderItems()
{ 
    try{


        $orderItems = OrderItem::with([
            'product' => function($query) {
                $query->withTrashed(); 
            },
            'product.addedOffers',
            'product.user',
            'order'
        ])
        ->whereHas('order', function($query) {
            $query->where('payment_status', 'payed');  
        })
        ->where('status', 'waiting')
        ->get();

        // $orderItems = OrderItem::with('product', 'product.addedOffers', 'order')
        // ->whereHas('order', function($query) {
        //     $query->where('payment_status', 'payed');  
        // })->where('status','waiting')
        // ->get();

    return OrderItemResource::collection($orderItems);
} catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}
}

public function getDoneOrderItems()
{ 
    try{

        $orderItems = OrderItem::with([
            'product' => function($query) {
                $query->withTrashed(); 
            },
            'product.addedOffers',
            'product.user',
            
            'order'
        ])
        ->whereHas('order', function($query) {
            $query->where('payment_status', 'payed');  
        })
        ->where('status', 'done')
        ->get();

    return OrderItemResource::collection($orderItems);
} catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}
}




public function getNotPayedOrderItems()
{ 
    try{

        $orderItems = OrderItem::with('product', 'product.addedOffers', 'order')
        ->whereHas('order', function($query) {
            $query->where('payment_status', 'not_payed');  
        })
        ->get();

    return OrderItemResource::collection($orderItems);
} catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
}
}



    public function getSellerOrdersItems()
    { 

        $id = Auth::id();
        
        try{

            $orderItems = OrderItem::with('product', 'product.addedOffers', 'order')
            ->whereHas('product', function($query) use ($id) {
                $query->where('user_id', $id);  
            })
            ->whereHas('order', function($query) {
                $query->where('payment_status', 'payed');  
            })->where('status','waiting')
            ->get();

        return OrderItemResource::collection($orderItems);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
    
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'quantity' => 'required|integer',
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'required|exists:products,id',
        ]);

        $orderItem = OrderItem::create($request->all());

        return response()->json($orderItem, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $orderItem = OrderItem::find($id);

        if (!$orderItem) {
            return response()->json(['message' => 'OrderItem not found'], Response::HTTP_NOT_FOUND);
        }

        //the order belongs to the user
        if (!Auth::user()->isAdmin() && $orderItem->order_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        return response()->json($orderItem);
    }

 
    public function update(Request $request, $id)
    {
        $orderItem = OrderItem::find($id);

        if (!$orderItem) {
            return response()->json(['message' => 'OrderItem not found'], Response::HTTP_NOT_FOUND);
        }

 

        $request->validate([
            'quantity' => 'sometimes|required|integer',
            'order_id' => 'sometimes|required|exists:orders,id',
            'product_id' => 'sometimes|required|exists:products,id',
        ]);

        $orderItem->update($request->all());
        return response()->json($orderItem)->with("orderItem updatad");
    }

    
    public function destroy(OrderItem $orderItem)
    {
        try{
        if ($orderItem->order->payment_status == 'payed' && $orderItem->status != 'delivered') {
            return response()->json(['message' => 'can not delete a payed order item'], 403);
        }
        $order_id = $orderItem->order_id;
        $orderItem->delete();
        $order = Order::find($order_id);

        if ($order->orderItems()->count() == 0) {
            $order->delete();
            return response()->json(['message' => 'Order and OrderItem deleted successfully'], 200);
        }

        return response()->json(['message' => 'OrderItem deleted successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
}

