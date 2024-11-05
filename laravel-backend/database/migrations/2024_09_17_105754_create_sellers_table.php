<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->string('phone'); 
            $table->string('address'); 
            $table->string('shope_name'); 
            $table->string('about'); 
            $table->integer('total_sales'); 

            $table->enum('status', ['banned','active']);

            $table->unsignedBigInteger('user_id');  
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');

            // $table->foreignId('user_id')->constrained()->onDelete('cascade')->onUpdate('cascade'); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sellers');
    }
};
