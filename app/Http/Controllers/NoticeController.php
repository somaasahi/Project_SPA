<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\UseCases\Notice\ReportValidate;
use Illuminate\Http\Request;

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

        $this->notification->user_id   = $request->user_id;
        $this->notification->post_id   = $request->post_id;
        $this->notification->about     = $request->about;
        $this->notification->review_id = $request->review_id;
        $this->notification->type      = $request->type;

        $this->notification->save();

        return response()->json( ['message' => 'ok'] );

    }

}
