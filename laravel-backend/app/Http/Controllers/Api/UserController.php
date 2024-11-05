<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Customer;
use App\Models\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function login(Request $request) {
        try {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
            'device_name' => 'required|string|max:255',

        ], [
            "email.required" => "Email is required.",
            "email.email" => "The email format you provided is invalid.",
            "password.required" => "Password is required.",
            "password.min" => "Password must be at least 8 characters.",
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
    

        $user = User::where('email', $request->email)->first();
    
        if (!$user) {
            return response()->json(['error' => 'Email not found.'], 404);
        }
    
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'Invalid password.'], 401);
        }

    
        $status = null;
        if ($user->role === 'customer') {
            $status = Customer::where('user_id', $user->id)->value('status'); 
        } elseif ($user->role === 'seller') {
            $status = Seller::where('user_id', $user->id)->value('status'); 
        }

        return response()->json([
            'token' => $user->createToken($request->device_name)->plainTextToken,
            'user' => $user,
            'status' => $status, 
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
    
    

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                "message"=>"Email does not exist in our records."
            ], 404);
        }

        $status = Password::sendResetLink(
            $request->only(keys: 'email')
        );

        if ($status === Password::RESET_LINK_SENT) {

            return response()->json([
                "message"=>"Password reset link sent!"
            ], 200);

        } elseif ($status === Password::RESET_THROTTLED) {

            return response()->json([
                "message"=>"Password reset link sent!"
            ], 200);
        } else {

            return response()->json([
                "message"=>"Unable to send reset link to the provided email."
            ], 500);

        }
    }
    public function resetPassword(Request $request)
    {
        
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $resetPassword = DB::table('password_reset_tokens')->where('email',$request->email)->first();
        if (Hash::check($request->token,$resetPassword->token )) {
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->password = Hash::make($password);
                    $user->save();
                }
            );
        } else {
            return response()->json(['message' => 'Invalid token.'], 401);
        }

        if ($status === Password::PASSWORD_RESET) {
        
            return response()->json([
                "message"=>"Password reset successful!"
            ] , 200);
        } else {
        
            return response()->json([
                "message"=>"Invalid token or email."
            ] , 404);
        }
    }



    public function updatePassword(Request $request)
{

    $std_validator = Validator::make($request->all(), [
        'currentPassword' => 'required',
        'newPassword' => 'required|min:8',
        'password_confirmation' => 'required|same:newPassword',
    ]);

    if ($std_validator->fails()) {
        return response()->json(['errors' => $std_validator->errors()], 400);
    }


    if (!Hash::check($request->currentPassword, Auth::user()->password)) {
        return response()->json(['error' => 'Invalid current password.'], 401);
    }


    $user = Auth::user();
    $user->password = Hash::make($request->newPassword);
    $user->save();

    return response()->json(['message' => 'Password updated successfully.'], 200);

}


    function register(Request $request) {
        try {
        $std_validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'device_name' => 'required|string|max:255',

            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'role' => 'required|string|max:50',
            'gender' => 'required|string|in:male,female,other',
            'last_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15', 
            'shop_name' => 'nullable|string|max:255',
            'about' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
        ], [
            "email.required" => "You must add an email to log in.",
            "email.email" => "The email format you provided is invalid.",
            "password.confirmed" => "The password confirmation does not match.",
            "image.image" => "The image must be a valid image file.",
            "image.mimes" => "The image must be in jpeg, png, jpg, or gif format.",
            "image.max" => "The image size should not exceed 2MB.",
        ]);
    
        $std_validator->sometimes('shop_name', 'required|string|max:255', function($input) {
            return $input->role === 'seller';
        });
        $std_validator->sometimes('about', 'required|string|max:255', function($input) {
            return $input->role === 'seller';
        });
        $std_validator->sometimes('address', 'required|string|max:255', function($input) {
            return $input->role === 'seller' || $input->role === 'customer';
        });
        $std_validator->sometimes('phone', 'required|string|max:255', function($input) {
            return $input->role === 'seller' || $input->role === 'customer';
        });
        if ($std_validator->fails()) {
            return response()->json(['errors' => $std_validator->errors()], 400);
        }


        $my_path = '';
        if(request()->hasFile("image")){
            $image = request()->file("image");
            $my_path=$image->store('users','uploads');
            $my_path= asset('uploads/' . $my_path); 
        }

        $user = new User();
        $user->image = $my_path; 
        $user->email = $request->email;
        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->role = $request->role;
        $user->gender = $request->gender;
        $user->password = Hash::make($request->password);
        $user->save();

        if ($request->role === 'customer') {
            $customer = new Customer();
            $customer->user_id = $user->id; 
            $customer->total_spent = 0;
            $customer->phone = $request->phone;
            $customer->address = $request->address;
            $customer->status = 'active';
            $customer->save(); 

        } elseif ($request->role === 'seller') {
            $seller = new Seller();
            $seller->user_id = $user->id; 
            $seller->total_sales = 0;
            $seller->phone = $request->phone;
            $seller->address = $request->address;
            $seller->status = 'active';
            $seller->about = $request->about; 

            $seller->shope_name = $request->shop_name; 
            $seller->save(); 
        }

        $token = $user->createToken($request->device_name)->plainTextToken;
        $user->sendEmailVerificationNotification();

        return response()->json(['token' => $token , 'user' => new UserResource($user)], 201); 
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
    public function show(User $user)
    {}


    function logoutFromOneDevice()
    {
        try {
            auth()->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Successfully logged out from this device'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error logging out from this device', 'error' => $e->getMessage()], 500);
        }
    }

 
    public function getUser(User $user)
    {
 
        $user = auth()->user();


        return new UserResource($user);

    }

    public function updateUser(Request $request) {
        $user = Auth::user(); 
    
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:15',
            'gender' => 'nullable|string|in:male,female,other',
            'address' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'shop_name' => 'nullable|string|max:255',
            'about' => 'nullable|string|max:255',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $my_path = $image->store('users', 'uploads');
            $user->image = $my_path;
        }
    
        $user->name = $request->name ?? $user->name;
        $user->last_name = $request->last_name ?? $user->last_name;
        $user->email = $request->email ?? $user->email;
        $user->gender = $request->gender ?? $user->gender;
    
        $user->save();
    
        if ($user->role === 'customer') {
            $customer = Customer::where('user_id', $user->id)->first();
            if ($customer) {
                $customer->phone = $request->phone ?? $customer->phone;
                $customer->address = $request->address ?? $customer->address;
                $customer->save();
            }
        } elseif ($user->role === 'seller') {
            $seller = Seller::where('user_id', $user->id)->first();
            if ($seller) {
                $seller->phone = $request->phone ?? $seller->phone;
                $seller->address = $request->address ?? $seller->address;
                $seller->shop_name = $request->shop_name ?? $seller->shop_name;
                $seller->about = $request->about ?? $seller->about;
                $seller->save();
            }
        }
    
        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    public function index(Request $request)
    {
        // جلب جميع المستخدمين أو أي منطق تريده هنا
        $users = User::all();
        return response()->json($users);
    }
}