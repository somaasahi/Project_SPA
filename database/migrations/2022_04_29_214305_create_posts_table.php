<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id")->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->integer('animal_kind');
            $table->integer('post_kind');
            $table->string('img_url1', 255)->nullable();
            $table->string('img_url2', 255)->nullable();
            $table->string('img_url3', 255)->nullable();
            $table->longText('content');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
