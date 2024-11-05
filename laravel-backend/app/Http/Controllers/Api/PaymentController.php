<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session; 
use Exception;
use App\Models\User;
use App\Models\Order;
use App\Models\Seller;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\BaseController;

use App\Models\Product;


class PaymentController extends Controller
{



    public function success($orderId)
    {
        try {

        $order2 = Order::with('orderItems.product.user')->findOrFail($orderId);

    
        $order2->update(['payment_status' => 'payed']);

        if (!$order2) {
            return response()->json(['success' => false, 'error' => 'order not found'], 404);
        }

        foreach ($order2->orderItems as $item) {
            $product = $item->product;
            $seller= Seller::where('user_id',$product->user->id)->first();

       if (!$seller) {
            return response()->json(['success' => false, 'error' => 'seller not found'], 404);
        }

            $totalOffers = $this->calculateTotalOffers($product); 
            $offersPrecintage = ($totalOffers /100);
            $priceAfterOffers = $product->price - ($product->price *  $offersPrecintage); 
            $productTotal = $priceAfterOffers * $item->quantity;     
            //$seller->increment('total_sales', $productTotal );
        }
        return view('payment_done');

    } catch (Exception $e) {

        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
    }
    protected function calculateTotalOffers(Product $product)
{
    return $product->addedOffers->sum(function ($offer) {
        return $offer->getDiscountAmount();
    });
}
    public function handlePayment(Request $request)
    {


        $request->validate([
            'id' => 'required|exists:orders,id', 
        ]);

        try {

            Stripe::setApiKey(env('STRIPE_TEST_SK'));



             $order = Order::find($request->id);
 
            

             if (!$order) {
                return response()->json(['error' => 'order not found'], 404);
            }

          
            if ($order->payment_status == 'payed') {
                return response()->json([ 'error' => 'order is already payed'], 403);
            }

            $amount = $order->total * 100;
            $message =''; 
            foreach ($order->orderItems as $item) {
                $product = $item->product;
                $message .= 'product: '.$product->name . '  price:' . $product->price .'no.'.$item->quantity. "\n";

            }
            $session = Session::create([
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => 'USD',
                            'product_data' => [
                                'name' => 'order For User: '. Auth()->user()->name ,
                            ],
                            'unit_amount' =>   $amount,  
                        ],
                        'quantity' => 1,
                    ],
                ],
                'mode' => 'payment',
                'success_url' => route('success', ['orderId' => $order->id]), 
                'cancel_url' => route('cancel'),
            ]);


            
            return response()->json(['url' => $session->url]);

        } catch (Exception $e) {

            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function cancel()
    {

return view('cancelled_payment');
    }
}