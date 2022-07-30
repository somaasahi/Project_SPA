<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    private $viewData = [];
    private $notification;
    private $post;
    private $user;
    private $like;
    private $review;

    public function __construct(
        User $user,
        Post $post,
        Like $like,
        Notification $notification,
        Review $review
    ) {
        $this->user         = $user;
        $this->post         = $post;
        $this->like         = $like;
        $this->notification = $notification;
        $this->review       = $review;
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

    public function getDetailPost( Request $request, $id )
    {
        $this->viewData['action'] = $request->input( 'action' );

        $this->viewData['like'] = $this->like->where( 'post_id', $id )->get()->count();
        $this->viewData['post'] = $this->post
            ->select( 'posts.id as postId', 'user_id', 'animal_kind', 'post_kind', 'img_url1', 'img_url2', 'img_url3', 'content', 'posts.created_at', 'posts.updated_at', 'posts.deleted_at', 'users.id as userId', 'name', 'email' )
            ->leftJoin( 'users', 'user_id', '=', 'users.id' )
            ->withTrashed()
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
        $this->viewData['notificationList'] = $this->notification
            ->select( 'notifications.id as notificationId', 'post_id', 'user_id', 'type', 'about', 'notifications.created_at', 'notifications.updated_at', 'name', 'email' )
            ->leftJoin( 'users', 'user_id', '=', 'users.id' )
            ->where( 'notifications.deleted_at', null )
            ->withTrashed()
            ->paginate( 10 );

        return view( 'Admin.ManagementList.NotificationManagementList.notificationList', $this->viewData );
    }

    public function detailReview( int $id )
    {
        $this->viewData['review'] = $this->review
            ->select( 'reviews.id as reviewId', 'post_id', 'comment', 'reviews.created_at', 'reviews.updated_at', 'users.id as userId', 'name', 'email', 'reviews.deleted_at' )
            ->join( 'users', 'user_id', '=', 'users.id' )
            ->withTrashed()
            ->find( $id );

        return view( 'Admin.ManagementList.NotificationManagementList.notificationDetail', $this->viewData );
    }
}
