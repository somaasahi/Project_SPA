<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;

class IndexController extends Controller
{
    public function __construct( User $user, Post $post, Like $like )
    {
        $this->user     = $user;
        $this->post     = $post;
        $this->like     = $like;
        $this->viewData = [];
    }

    public function index()
    {
        return view( 'Admin.index' );
    }

    public function getUser()
    {
        $this->viewData['userList'] = $this->user->get();

        return view( 'Admin.ManagementList.UserManagementList.userList', $this->viewData );
    }

    public function getSoftdeletesUser()
    {
        $this->viewData['SoftDeletesUser'] = $this->user->onlyTrashed()->get();

        return view( 'Admin.ManagementList.UserManagementList.softdeletesUserList', $this->viewData );
    }

    public function getDetailUser( $id )
    {
        $this->viewData['user'] = $this->user->find( $id );

        return view( 'Admin.ManagementList.UserManagementList.userDetail', $this->viewData );
    }

    public function getPost()
    {
        $this->viewData['postList'] = $this->post
            ->Join( 'users', 'user_id', '=', 'users.id' )
            ->get();

        return view( 'Admin.ManagementList.PostManagementList.postList', $this->viewData );
    }

    public function getDetailPost( $id )
    {
        $this->viewData['like'] = $this->like->where( 'post_id', $id )->get()->count();
        $this->viewData['post'] = $this->post
            ->leftJoin( 'users', 'user_id', '=', 'users.id' )
            ->find( $id );

        return view( 'Admin.ManagementList.PostManagementList.postDetail', $this->viewData );
    }
}
