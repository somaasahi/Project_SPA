<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\UseCases\Notice\ReportValidate;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class NoticeController extends Controller
{

    public function __construct( Notification $notification )
    {
        $this->notification = $notification;
    }

    public function store( Request $request, ReportValidate $reportValidate )
    {
        $error = $reportValidate( $request );

        if ( $error ) {
            return response()->json( ['message' => $error] );
        }

        DB::beginTransaction();
        try {
            $this->notification->user_id   = $request->user_id;
            $this->notification->post_id   = $request->post_id;
            $this->notification->about     = $request->about;
            $this->notification->review_id = $request->review_id;
            $this->notification->type      = $request->type;

            $this->notification->save();
            DB::commit();
        } catch ( Exception $e ) {
            DB::rollback();
            Log::error( $e->getMessage() );
        }

        return response()->json( ['message' => 'ok'] );

    }

}
