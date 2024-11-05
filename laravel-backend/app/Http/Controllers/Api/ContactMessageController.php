<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactMessageController extends Controller
{
    
    public function index()
    {
        try{
        $messages = ContactMessage::all();
        return response()->json(['data' => $messages ], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    
    }

    

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'phone' => 'required|string|min:9',
                'name' => 'required|string|max:255',
                'message' => 'required|string|max:255',
    
            ]);
        
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }
            $message =new ContactMessage();
            $message->email = $request->email;
            $message->phone = $request->phone;
            $message->name = $request->name;
            $message->message = $request->message;
            $message->save();

        
        return response()->json(['message' => 'saved successfully'], 200);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(String $id)
    {
        try{

            $message = ContactMessage::find($id);
            if (!$message){
                return response()->json(['error' => 'message not found' ], 404);

            }
            $message->delete();
            return response()->json(['message' => 'Deleted successfully' ], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    
    }
}
