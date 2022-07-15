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

    public function getPostSearch( Request $request )
    {
        $query = $this->post::query();
        $query
            ->select( 'posts.id as postId', 'user_id', 'animal_kind', 'post_kind', 'img_url1', 'img_url2', 'img_url3', 'content', 'posts.created_at', 'posts.updated_at', 'posts.deleted_at', 'users.id as userId', 'name', 'email' )
            ->join( 'users', 'users.id', '=', 'posts.user_id' );

        if ( $request->name ) {
            $query->where( 'name', 'like', '%' . $request->name . '%' );
        }

        if ( $request->animal_kind ) {
            $query->where( 'animal_kind', 'like', '%' . $request->animal_kind . '%' );
        }

        if ( $request->post_kind ) {
            $query->where( 'post_kind', 'like', '%' . $request->post_kind . '%' );
        }

        $this->viewData['postList'] = $query->paginate( 10 );

        return view( 'Admin.ManagementList.PostManagementList.Search.searchPostList', $this->viewData );

    }

    public function getSoftdeletesPostSearch( Request $request )
    {
        $query = $this->post::query();
        $query
            ->select( 'posts.id as postId', 'user_id', 'animal_kind', 'post_kind', 'img_url1', 'img_url2', 'img_url3', 'content', 'posts.created_at', 'posts.updated_at', 'posts.deleted_at', 'users.id as userId', 'name', 'email' )
            ->join( 'users', 'users.id', '=', 'posts.user_id' )
            ->onlyTrashed();

        if ( $request->name ) {
            $query->where( 'name', 'like', '%' . $request->name . '%' );
        }

        if ( $request->animal_kind ) {
            $query->where( 'animal_kind', 'like', '%' . $request->animal_kind . '%' );
        }

        if ( $request->post_kind ) {
            $query->where( 'post_kind', 'like', '%' . $request->post_kind . '%' );
        }

        $this->viewData['SoftDeletesPost'] = $query->paginate( 10 );

        return view( 'Admin.ManagementList.PostManagementList.Search.searchSoftdeletesPostList', $this->viewData );

    }

}
