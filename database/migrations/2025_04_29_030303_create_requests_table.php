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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->enum('status', ['tertunda', 'terpenuhi']);
            $table->enum('urgency', ['rendah', 'sedang', 'tinggi']);
            $table->string('phone_number');
            $table->string('thumbnail');
            $table->string('address');
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
        Schema::dropIfExists('requests');
    }
};
