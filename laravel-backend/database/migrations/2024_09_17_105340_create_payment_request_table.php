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
        Schema::create('payment_request', function (Blueprint $table) {
            $table->id();
            $table->enum('getway', ['wallet', 'instapay', 'fawry']);
            $table->integer('amount'); 
            $table->string('account'); 
            $table->enum('status', ['pended', 'accepted', 'rejected']);
            $table->string('error_message')->nullable(); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_request');
    }
};
