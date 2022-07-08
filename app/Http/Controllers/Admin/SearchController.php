<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct( User $user, Post $post )
    {
        $this->user     = $user;
        $this->post     = $post;
        $this->viewData = [];
    }

    public function getUserSearch( Request $request )
    {
        $userName = $this->user
            ->where( 'name', 'like', '%' . $request->name . '%' )
            ->get()->toArray();
        $userEmail = $this->user
            ->where( 'email', 'like', '%' . $request->email . '%' )
            ->get()->toArray();

        $userList                   = array_merge( $userName, $userEmail );
        $this->viewData['userList'] = $userList;

        return view( 'Admin.ManagementList.UserManagementList.Search.searchUserList', $this->viewData );

    }

    public function getSoftdeletesUserSearch( Request $request )
    {
        $userName = $this->user
            ->where( 'name', 'like', '%' . $request->name . '%' )
            ->onlyTrashed()
            ->get()
            ->toArray();
        $userEmail = $this->user
            ->where( 'email', 'like', '%' . $request->email . '%' )
            ->onlyTrashed()
            ->get()
            ->toArray();

        $userList                   = array_merge( $userName, $userEmail );
        $this->viewData['userList'] = $userList;

        return view( 'Admin.ManagementList.UserManagementList.softdeletesUserList', $this->viewData );

    }
}
