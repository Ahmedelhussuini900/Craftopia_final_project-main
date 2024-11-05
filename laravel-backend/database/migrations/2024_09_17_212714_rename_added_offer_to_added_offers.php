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
        Schema::table('added_offer', function (Blueprint $table) {
            Schema::rename('added_offer', 'added_offers');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('added_offers', function (Blueprint $table) {
            Schema::rename('added_offers', 'added_offer');

        });
    }
};
