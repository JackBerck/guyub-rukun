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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->enum("urgency", ["low", "medium", "high"])->nullable();
            $table->string('phone_number')->nullable();
            $table->text('address')->nullable();
            $table->boolean("status")->default(0);
            $table->enum("type", ["donation", "request"])->default("donation");
            $table->boolean("is_popular")->default(0);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('donation_category_id')->constrained()->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
