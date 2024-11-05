<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AddedOfferController;
use App\Http\Controllers\Api\CartItemController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\CustomOrderController;
use App\Http\Controllers\Api\OfferController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderItemController;
use App\Http\Controllers\Api\PaymentRequestController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SellerController;
use App\Http\Controllers\Api\WishListController;
use App\Http\Controllers\Api\VerificationController;
use App\Http\Controllers\Api\ContactMessageController;


use App\Http\Controllers\Api\PaymentController;

Route::get('products/most-selled', [ProductController::class , 'getMostSelledProducts']);
Route::get('products/most-offered', [ProductController::class , 'getMostOfferedProducts']);
Route::get('products/most-ordered-seller', [ProductController::class , 'getMostOrderedProductsSeller'])->middleware('auth:sanctum');




Route::get('order-items/admin-waiting-orderitems', [OrderItemController::class , 'getWaitingOrderItems'])->middleware('auth:sanctum');
Route::get('order-items/admin-done-orderitems', [OrderItemController::class , 'getDoneOrderItems'])->middleware('auth:sanctum');
Route::get('order-items/admin-doing-orderitems', [OrderItemController::class , 'getDoingOrderItems'])->middleware('auth:sanctum');


Route::get('order-items/my-items/{order_id}', [OrderItemController::class , 'getMyOrderItems'])->middleware('auth:sanctum');
Route::get('order-items/seller-orders', [OrderItemController::class , 'getSellerOrdersItems'])->middleware('auth:sanctum');
Route::get('order-items/craft-order/{item_id}', [OrderItemController::class , 'craftOrderItem'])->middleware('auth:sanctum');
Route::get('order-items/serve-order/{item_id}', [OrderItemController::class , 'serveOrderItem'])->middleware('auth:sanctum');
Route::get('order-items/done-order/{item_id}', [OrderItemController::class , 'doneOrderItem'])->middleware('auth:sanctum');
Route::get('order-items/doing-order', [OrderItemController::class , 'getDoingOrders'])->middleware('auth:sanctum');
Route::get('order-items/done-order-seller', [OrderItemController::class , 'getDoneOrders'])->middleware('auth:sanctum');
Route::get('sellers/seller/{order_id}', [SellerController::class , 'getSellerById'])->middleware('auth:sanctum');
Route::get('customers/customer/{order_id}', [CustomerController::class , 'getCustomerById'])->middleware('auth:sanctum');
Route::get('orders/my-orders', [OrderController::class , 'getMyOrder'])->middleware('auth:sanctum');
Route::get('customers/me', [CustomerController::class , 'getMyCustomer'])->middleware('auth:sanctum');
Route::get('order-items/old-order-items', [OrderItemController::class , 'getMyOldOrderItems'])->middleware('auth:sanctum');

Route::post('customers/update/customer', [CustomerController::class , 'updateCustomer'])->middleware('auth:sanctum');

Route::get('order-items/deliver-order/{item_id}', [OrderItemController::class , 'payForOrderItem'])->middleware('auth:sanctum');
Route::post('users/update-password', [UserController::class , 'updatePassword'])->middleware('auth:sanctum');
Route::post('sellers/update/seller', [SellerController::class , 'updateSeller'])->middleware('auth:sanctum');
Route::post('/offers/remove-product-from-offer', [ProductController::class , 'removeProductOffer'])->middleware('auth:sanctum');
Route::get('/cart-items/my-items', [CartItemController::class , 'getMyItems'])->middleware('auth:sanctum');
Route::get('/products/byOffer/{offer_id}', [ProductController::class , 'getProductsByOffer'])->middleware('auth:sanctum');
Route::post('/offers/add-offer-to-products', [OfferController::class , 'addOfferToProducts'])->middleware('auth:sanctum');
Route::get('/offers/getMyOffers', [OfferController::class , 'getMyOffers'])->middleware('auth:sanctum');
Route::get('/products/myProduct', [ProductController::class , 'getMyProduct'])->middleware('auth:sanctum');
Route::post('/products/update', [ProductController::class , 'updateProduct'])->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])
    ->middleware(['signed'])
    ->name('verification.verify');


    
    Route::get('/customers/ban/{id}', [CustomerController::class, 'banCustomer'])->middleware('auth:sanctum');
    Route::get('/customers/unBan/{id}', [CustomerController::class, 'unBanCustomer'])->middleware('auth:sanctum');
    Route::get('/customers/banned', [CustomerController::class, 'getBanned'])->middleware('auth:sanctum');
    
    Route::get('/sellers/ban/{id}', [SellerController::class, 'banSeller'])->middleware('auth:sanctum');
    Route::get('/sellers/unBan/{id}', [SellerController::class, 'unBanSeller'])->middleware('auth:sanctum');
    Route::get('/sellers/banned', [SellerController::class, 'getBanned'])->middleware('auth:sanctum');
    

Route::post('users/reset-password', [UserController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('users/reset', [UserController::class, 'resetPassword'])->name('password.reset');

Route::post('users/email/resend', [VerificationController::class, 'resend'])
    ->middleware('auth:sanctum');

Route::post('users/login', [UserController::class, 'login']);

Route::post('users/register', [UserController::class, 'register']);
Route::get('users/me', [UserController::class, 'getUser'])->middleware('auth:sanctum');

Route::post('/users/logout',
    [UserController::class, 'logoutFromOneDevice'])
    ->middleware('auth:sanctum');

Route::apiResource('users', UserController::class)->middleware('auth:sanctum');


Route::get('/products/deleted',
    [ProductController::class, 'getAlldeleted'])
    ->middleware('auth:sanctum');
Route::get('/products/restore/{product_id}',
    [ProductController::class, 'restore'])
    ->middleware('auth:sanctum');


Route::apiResource('contact-messages', ContactMessageController::class);
Route::apiResource('added-offers', AddedOfferController::class);
Route::apiResource('cart-items', CartItemController::class)->middleware('auth:sanctum');
Route::apiResource('categories', CategoryController::class);
Route::apiResource('customers', CustomerController::class)->middleware('auth:sanctum');
Route::apiResource('custom-orders', CustomOrderController::class);
Route::apiResource('offers', OfferController::class)->middleware('auth:sanctum');
Route::apiResource('orders', OrderController::class)->middleware('auth:sanctum');
Route::apiResource('order-items', OrderItemController::class);
Route::apiResource('payment-requests', PaymentRequestController::class);

Route::middleware('auth:sanctum')->group(function () {
Route::apiResource('products', ProductController::class)->only([ 'store','update', 'destroy']);
});
Route::apiResource('products', ProductController::class)->only(['index', 'show']);
Route::get('products/byCategory/{category}', [ProductController::class, 'getProductsByCategory']);
Route::get('reviews/product/{product_id}', [ReviewController::class, 'getAllReviews']);

Route::apiResource('reviews', ReviewController::class)->middleware('auth:sanctum');
Route::apiResource('sellers', SellerController::class)->middleware('auth:sanctum');


Route::apiResource('wish_lists', WishListController::class)->middleware('auth:sanctum');


Route::post('/payment/handel', [PaymentController::class, 'handlePayment'])->middleware('auth:sanctum');
Route::post('/categories/update', [CategoryController::class, 'updateCategory']);

Route::get('/payment/cancel', [PaymentController::class, 'cancel'])->name('cancel');
Route::get('/payment/success/{orderId}', [PaymentController::class, 'success'])->name('success');

Route::post('wish_lists/myWish', [WishListController::class , 'inWishlist'])->middleware('auth:sanctum');
Route::get('/products/wishlist/all', [ProductController::class , 'productsInWishlist'])->middleware('auth:sanctum');
Route::delete('wish_lists/remove/{product_id}', [WishListController::class , 'removeWishlist'])->middleware('auth:sanctum');
Route::get('/sellers/get/me', [SellerController::class , 'getSeller'])->middleware('auth:sanctum');



// products/wishlist

// GET|HEAD        / .............................................................................................................................
// GET|HEAD        api/added-offers .......................................................... added-offers.index › Api\AddedOfferController@index
// POST            api/added-offers .......................................................... added-offers.store › Api\AddedOfferController@store
// GET|HEAD        api/added-offers/{added_offer} .............................................. added-offers.show › Api\AddedOfferController@show
// PUT|PATCH       api/added-offers/{added_offer} .......................................... added-offers.update › Api\AddedOfferController@update
// DELETE          api/added-offers/{added_offer} ........................................ added-offers.destroy › Api\AddedOfferController@destroy
// GET|HEAD        api/cart-items ................................................................ cart-items.index › Api\CartItemController@index
// POST            api/cart-items ................................................................ cart-items.store › Api\CartItemController@store
// GET|HEAD        api/cart-items/{cart_item} ...................................................... cart-items.show › Api\CartItemController@show
// PUT|PATCH       api/cart-items/{cart_item} .................................................. cart-items.update › Api\CartItemController@update
// DELETE          api/cart-items/{cart_item} ................................................ cart-items.destroy › Api\CartItemController@destroy
// GET|HEAD        api/categories ................................................................ categories.index › Api\CategoryController@index
// POST            api/categories ................................................................ categories.store › Api\CategoryController@store
// GET|HEAD        api/categories/{category} ....................................................... categories.show › Api\CategoryController@show
// PUT|PATCH       api/categories/{category} ................................................... categories.update › Api\CategoryController@update
// DELETE          api/categories/{category} ................................................. categories.destroy › Api\CategoryController@destroy
// GET|HEAD        api/custom-orders ....................................................... custom-orders.index › Api\CustomOrderController@index
// POST            api/custom-orders ....................................................... custom-orders.store › Api\CustomOrderController@store
// GET|HEAD        api/custom-orders/{custom_order} .......................................... custom-orders.show › Api\CustomOrderController@show
// PUT|PATCH       api/custom-orders/{custom_order} ...................................... custom-orders.update › Api\CustomOrderController@update
// DELETE          api/custom-orders/{custom_order} .................................... custom-orders.destroy › Api\CustomOrderController@destroy
// GET|HEAD        api/customers .................................................................. customers.index › Api\CustomerController@index
// POST            api/customers .................................................................. customers.store › Api\CustomerController@store
// GET|HEAD        api/customers/{customer} ......................................................... customers.show › Api\CustomerController@show
// PUT|PATCH       api/customers/{customer} ..................................................... customers.update › Api\CustomerController@update
// DELETE          api/customers/{customer} ................................................... customers.destroy › Api\CustomerController@destroy
// GET|HEAD        api/offers ........................................................................... offers.index › Api\OfferController@index
// POST            api/offers ........................................................................... offers.store › Api\OfferController@store
// GET|HEAD        api/offers/{offer} ..................................................................... offers.show › Api\OfferController@show
// PUT|PATCH       api/offers/{offer} ................................................................. offers.update › Api\OfferController@update
// DELETE          api/offers/{offer} ............................................................... offers.destroy › Api\OfferController@destroy
// GET|HEAD        api/order-items ............................................................. order-items.index › Api\OrderItemController@index
// POST            api/order-items ............................................................. order-items.store › Api\OrderItemController@store
// GET|HEAD        api/order-items/{order_item} .................................................. order-items.show › Api\OrderItemController@show
// PUT|PATCH       api/order-items/{order_item} .............................................. order-items.update › Api\OrderItemController@update
// DELETE          api/order-items/{order_item} ............................................ order-items.destroy › Api\OrderItemController@destroy
// GET|HEAD        api/orders ........................................................................... orders.index › Api\OrderController@index
// POST            api/orders ........................................................................... orders.store › Api\OrderController@store
// GET|HEAD        api/orders/{order} ..................................................................... orders.show › Api\OrderController@show
// PUT|PATCH       api/orders/{order} ................................................................. orders.update › Api\OrderController@update
// DELETE          api/orders/{order} ............................................................... orders.destroy › Api\OrderController@destroy
// GET|HEAD        api/payment-requests .............................................. payment-requests.index › Api\PaymentRequestController@index
// POST            api/payment-requests .............................................. payment-requests.store › Api\PaymentRequestController@store
// GET|HEAD        api/payment-requests/{payment_request} .............................. payment-requests.show › Api\PaymentRequestController@show
// PUT|PATCH       api/payment-requests/{payment_request} .......................... payment-requests.update › Api\PaymentRequestController@update
// DELETE          api/payment-requests/{payment_request} ........................ payment-requests.destroy › Api\PaymentRequestController@destroy
// GET|HEAD        api/products ..................................................................... products.index › Api\ProductController@index
// POST            api/products ..................................................................... products.store › Api\ProductController@store
// GET|HEAD        api/products/{product} ............................................................. products.show › Api\ProductController@show
// PUT|PATCH       api/products/{product} ......................................................... products.update › Api\ProductController@update
// DELETE          api/products/{product} ....................................................... products.destroy › Api\ProductController@destroy
// POST            api/register ...................................................................................... Api\UserController@register
// GET|HEAD        api/reviews ........................................................................ reviews.index › Api\ReviewController@index
// POST            api/reviews ........................................................................ reviews.store › Api\ReviewController@store
// GET|HEAD        api/reviews/{review} ................................................................. reviews.show › Api\ReviewController@show
// PUT|PATCH       api/reviews/{review} ............................................................. reviews.update › Api\ReviewController@update
// DELETE          api/reviews/{review} ........................................................... reviews.destroy › Api\ReviewController@destroy
// GET|HEAD        api/sellers ........................................................................ sellers.index › Api\SellerController@index
// POST            api/sellers ........................................................................ sellers.store › Api\SellerController@store
// GET|HEAD        api/sellers/{seller} ................................................................. sellers.show › Api\SellerController@show
// PUT|PATCH       api/sellers/{seller} ............................................................. sellers.update › Api\SellerController@update
// DELETE          api/sellers/{seller} ........................................................... sellers.destroy › Api\SellerController@destroy
// GET|HEAD        api/user ......................................................................................................................
// GET|HEAD        api/users .............................................................................. users.index › Api\UserController@index
// POST            api/users .............................................................................. users.store › Api\UserController@store
// POST            api/users/login ...................................................................................... Api\UserController@login
// POST            api/users/logout ....................................................................... Api\UserController@logoutFromOneDevice
// GET|HEAD        api/users/me ....................................................................................... Api\UserController@getUser
// GET|HEAD        api/users/{user} ......................................................................... users.show › Api\UserController@show
// PUT|PATCH       api/users/{user} ..................................................................... users.update › Api\UserController@update
// DELETE          api/users/{user} ................................................................... users.destroy › Api\UserController@destroy
// GET|HEAD        api/wish_lists ................................................................ wish_lists.index › Api\WishListController@index
// POST            api/wish_lists ................................................................ wish_lists.store › Api\WishListController@store
// GET|HEAD        api/wish_lists/{wish_list} ...................................................... wish_lists.show › Api\WishListController@show
// PUT|PATCH       api/wish_lists/{wish_list} .................................................. wish_lists.update › Api\WishListController@update
// DELETE          api/wish_lists/{wish_list} ................................................ wish_lists.destroy › Api\WishListController@destroy
// GET|HEAD        sanctum/csrf-cookie ......................................... sanctum.csrf-cookie › Laravel\Sanctum › CsrfCookieController@show
// GET|HEAD        storage/{path} .................................................................................................. storage.local
// GET|HEAD        up ............................................................................................................................
