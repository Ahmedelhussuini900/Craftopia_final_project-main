<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryResource;



class CategoryController extends Controller
{

    public function index()
    {

        $categories = Category::all();
        return CategoryResource::collection($categories);
    }

 
    public function store(Request $request)
    {
        try{

        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string|max:255|unique:categories,category_name',
            'description' => 'required|string|max:500',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',


        ], [
            'category_name.required' => 'Category name is required.',
            'category_name.string' => 'Category name must be a string.',
            'category_name.max' => 'Category name may not be greater than 255 characters.',
            'category_name.unique' => 'Category name must be unique.',
            'description.string' => 'Description must be a string.',
            'description.max' => 'Description may not be greater than 500 characters.',
            "image.image" => "The image must be a valid image file.",

            "image.required" => "Category image is required.",
            "image.mimes" => "The image must be in jpeg, png, jpg, or gif format.",
            "image.max" => "The image size should not exceed 2MB.",
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
  
        $my_path = '';
        if(request()->hasFile("image")){
            $image = request()->file("image");
            $my_path=$image->store('images','category_image');
            $my_path= asset('uploads/categories/' . $my_path); 
        }


        // $data = $validator->validated();
        $category = new Category();

        $category->category_name = $request->category_name;
        $category->description = $request->description;
        $category->image = $my_path;
        $category->save();


        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }

   

    
    public function show(Category $category)
    {

        return new CategoryResource($category);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateCategory(Request $request)
    {
        // return response()->json(['message' => $request->all() ], 400);

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:categories,id',
            'category_name' => 'required|string|max:255|unique:categories,category_name,' . $request->id,
            'description' => 'required|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]); 


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $category = Category::find($request->id);
        if (!$category) {
            return response()->json(['error' => 'not found'], 404);
        }
        $my_path = $category->image ;
        if(request()->hasFile("image")){

            $url = $category->image;

            $relativePath = str_replace(url('uploads/categories/').'/' , '', $url);
            
            if (Storage::disk('category_image')->exists($relativePath)) {
                Storage::disk('category_image')->delete($relativePath);
            }

            $image = request()->file("image");
            $my_path=$image->store('images','category_image');
            $my_path= asset('uploads/categories/' . $my_path); 
        }

        $category->category_name = $request->category_name;
        $category->description = $request->description;
        $category->image = $my_path;
        $category->save();

        return response()->json(['message' => 'Category updated successfully', 'category' => $category], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {

        $category->delete();
        return response()->json(['message' => 'Category deleted successfully'], 200);
    
    }
}
