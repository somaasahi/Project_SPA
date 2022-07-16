<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Post;
use App\Models\User;

class IndexController extends Controller
{
    private $viewData = [];

    public function __construct( User $user, Post $post, Like $like, Notification $notification )
    {
        $this->user         = $user;
        $this->post         = $post;
        $this->like         = $like;
        $this->notification = $notification;
    }

    public function index()
    {
        return view( 'Admin.index' );
    }

    public function getUser()
    {
        $this->viewData['userList'] = $this->user->paginate( 10 );

        return view( 'Admin.ManagementList.UserManagementList.userList', $this->viewData );
    }

    public function getSoftdeletesUser()
    {
        $this->viewData['SoftDeletesUser'] = $this->user->onlyTrashed()->get();

        return view( 'Admin.ManagementList.UserManagementList.softdeletesUserList', $this->viewData );
    }

    public function getSoftdeletesPost()
    {
        $this->viewData['SoftDeletesPost'] = $this->post
            ->select( 'posts.id as postId', 'user_id', 'animal_kind', 'post_kind', 'img_url1', 'img_url2', 'img_url3', 'content', 'posts.created_at', 'posts.updated_at', 'users.id as userId', 'posts.deleted_at', 'name', 'email' )
            ->leftJoin( 'users', 'user_id', '=', 'users.id' )
            ->onlyTrashed()
            ->paginate( 10 );

        return view( 'Admin.ManagementList.PostManagementList.softdeletesPostList', $this->viewData );
    }

    public function getPost()
    {
        $this->viewData['postList'] = $this->post
            ->select( 'posts.id as postId', 'user_id', 'animal_kind', 'post_kind', 'img_url1', 'img_url2', 'img_url3', 'content', 'posts.created_at', 'posts.updated_at', 'users.id as userId', 'name', 'email' )
            ->leftJoin( 'users', 'user_id', '=', 'users.id' )
            ->paginate( 10 );

        return view( 'Admin.ManagementList.PostManagementList.postList', $this->viewData );
    }

    public function getDetailPost( $id )
    {
        $this->viewData['like'] = $this->like->where( 'post_id', $id )->get()->count();
        $this->viewData['post'] = $this->post
            ->select( 'posts.id as postId', 'user_id', 'animal_kind', 'post_kind', 'img_url1', 'img_url2', 'img_url3', 'content', 'posts.created_at', 'posts.updated_at', 'posts.deleted_at', 'users.id as userId', 'name', 'email' )
            ->leftJoin( 'users', 'user_id', '=', 'users.id' )
            ->find( $id );

        return view( 'Admin.ManagementList.PostManagementList.postDetail', $this->viewData );
    }

    public function getDetailSoftdeletePost( $id )
    {
        $this->viewData['like'] = $this->like->where( 'post_id', $id )->get()->count();
        $this->viewData['post'] = $this->post
            ->select( 'posts.id as postId', 'user_id', 'animal_kind', 'post_kind', 'img_url1', 'img_url2', 'img_url3', 'content', 'posts.created_at', 'posts.updated_at', 'posts.deleted_at', 'users.id as userId', 'name', 'email' )
            ->leftJoin( 'users', 'user_id', '=', 'users.id' )
            ->onlyTrashed()
            ->find( $id );

        return view( 'Admin.ManagementList.PostManagementList.postDetail', $this->viewData );
    }

    public function getDetailUser( $id )
    {
        $this->viewData['user'] = $this->user
            ->find( $id );

        return view( 'Admin.ManagementList.UserManagementList.userDetail', $this->viewData );
    }

    public function getDetailSoftdeleteUser( $id )
    {
        $this->viewData['user'] = $this->user
            ->onlyTrashed()
            ->find( $id );

        return view( 'Admin.ManagementList.UserManagementList.userDetail', $this->viewData );
    }

    public function getNotification()
    {
        return view( 'Admin.ManagementList.NotificationManagementList.notificationList' );
    }
}
