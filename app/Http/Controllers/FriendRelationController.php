<?php

namespace App\Http\Controllers;

use App\Models\FriendRelation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FriendRelationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $friend = FriendRelation::with('user.profile')
            ->orderBy('updated_at', 'desc')
            ->where("to_user_id", $request->get("user_id"))
            ->where("status", "<>", 2)
            ->get();
        return $friend;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $friend = User::get($id);

        return $friend;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        $fid = $request['params']['from_user_id'];
        $tid = $request['params']['to_user_id'];
        $status = $request['params']['status'];

        if ($status == 1) {
            FriendRelation::where('to_user_id', $tid)
                ->where('from_user_id', $fid)->update(['status' => 1]);

            $record = new FriendRelation;
            $record->from_user_id = $tid;
            $record->to_user_id = $fid;
            $record->status = 1;
            $record->save();

            return $record->status;
        } else {
            FriendRelation::where('to_user_id', $tid)
                ->where('from_user_id', $fid)->update(['status' => 2]);

            $record = new FriendRelation;
            $record->from_user_id = $tid;
            $record->to_user_id = $fid;
            $record->status = 2;
            $record->save();
            return $record->status;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
