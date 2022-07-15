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
        $query = $this->user::query();

        if ( $request->name ) {
            $query
                ->where( 'name', 'like', '%' . $request->name . '%' );
        }

        if ( $request->email ) {
            $query
                ->where( 'email', 'like', '%' . $request->email . '%' );
        }

        $this->viewData['userList'] = $query->get()->toArray();

        return view( 'Admin.ManagementList.UserManagementList.Search.searchUserList', $this->viewData );

    }

    public function getSoftdeletesUserSearch( Request $request )
    {
        $query = $this->user::query();

        if ( $request->name ) {
            $query
                ->where( 'name', 'like', '%' . $request->name . '%' )->onlyTrashed();
        }

        if ( $request->email ) {
            $query
                ->where( 'email', 'like', '%' . $request->email . '%' )->onlyTrashed();
        }

        $this->viewData['userList'] = $query->onlyTrashed()->get()->toArray();

        return view( 'Admin.ManagementList.UserManagementList.Search.searchSoftdeletesUserList', $this->viewData );

    }

}
