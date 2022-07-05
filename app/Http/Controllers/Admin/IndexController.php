<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;

class IndexController extends Controller
{
    public function __construct( User $user, Post $post )
    {
        $this->user     = $user;
        $this->post     = $post;
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

    public function getDetailUser( $id )
    {
        $this->viewData['user'] = $this->user->find( $id );

        return view( 'Admin.ManagementList.UserManagementList.userDetail', $this->viewData );
    }

    public function getPost()
    {
        $this->viewData['postList'] = $this->post
            ->leftJoin( 'users', 'user_id', '=', 'users.id' )
            ->get();

        return view( 'Admin.ManagementList.PostManagementList.postList', $this->viewData );
    }
}
