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
        Schema::table( 'to_admin_messages', function ( Blueprint $table ) {
            $table->boolean( 'check_flg' )->default( false );
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table( 'to_admin_messages', function ( Blueprint $table ) {
            $table->dropColumn( 'check_flg' );
        } );
    }
};
