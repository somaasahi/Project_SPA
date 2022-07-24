<?php

namespace App\Http\Controllers;

use App\Models\ToAdminMessage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ToAdminMessageController extends Controller
{
    private $toAdminMessage;

    public function __construct( ToAdminMessage $toAdminMessage )
    {
        $this->toAdminMessage = $toAdminMessage;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $adminMessage = $this->toAdminMessage->get()->toArray();

        return $adminMessage;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( Request $request )
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( $id )
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update( Request $request )
    {
        DB::beginTransaction();
        try {
            $query            = $this->toAdminMessage->find( $request->id );
            $query->check_flg = 1;
            $query->save();
            DB::commit();
        } catch ( Exception $e ) {
            DB::rollback();
            Log::error( $e->getMessage() );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id )
    {
        //
    }
}