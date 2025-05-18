<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('affair_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('affairs', function (Blueprint $table) {
            $table->foreignId('affair_category_id')->constrained('affair_categories')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('affairs', function (Blueprint $table) {
            $table->dropForeign(['affair_category_id']);
            $table->dropColumn('affair_category_id');
        });
        Schema::dropIfExists('affair_categories');
    }
};
