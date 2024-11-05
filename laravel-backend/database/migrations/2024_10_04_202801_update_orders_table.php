<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('status',['waiting','done' , 'delivered'])->change();

        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('status',['waiting','done' ])->change();
        });
    }
};
