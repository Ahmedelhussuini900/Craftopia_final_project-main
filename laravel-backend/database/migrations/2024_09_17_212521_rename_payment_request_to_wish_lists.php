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
        Schema::table('payment_request', function (Blueprint $table) {
            Schema::rename('payment_request', 'payment_requests');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payment_request', function (Blueprint $table) {
            Schema::rename('payment_requests', 'payment_request');

        });
    }
};
