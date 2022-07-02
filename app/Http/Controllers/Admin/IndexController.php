<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;

class IndexController extends Controller
{
    public function __construct( User $user, Post $post )
    {
        $this->user = $user;
        $this->post = $post;

        $this->viewData = [];
    }

    public function index()
    {
        return view( 'Admin.index' );
    }

    public function userData()
    {
        $this->viewData['userList'] = $this->user->get();

        return view( 'Admin.userData', $this->viewData );
    }

    public function postData()
    {
        $this->viewData['postList'] = $this->post->get();

        return view( 'Admin.postData', $this->viewData );
    }
}
