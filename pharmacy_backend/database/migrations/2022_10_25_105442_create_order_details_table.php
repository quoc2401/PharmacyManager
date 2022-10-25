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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('order_id')->unsigned();
            $table->bigInteger('medicine_id')->unsigned();
            $table->decimal('unit_price');
            $table->integer('quantity')->unsigned();
            $table->float('discount')->unsigned();

            $table->foreign('order_id')
                ->references('id')
                ->on('orders');

            $table->foreign('medicine_id')
                ->references('id')
                ->on('medicines');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_details');
    }
};
