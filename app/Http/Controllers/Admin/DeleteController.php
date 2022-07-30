<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Review;
use App\Models\User;
use App\UseCases\Notice\GetNotificationType;
use App\UseCases\Notice\NoticeMessage;
use Illuminate\Http\Request;

class DeleteController extends Controller
{
    private $user;
    private $post;
    private $review;
    private $notification;

    public function __construct(
        User $user,
        Post $post,
        Review $review,
        Notification $notification
    ) {
        $this->user         = $user;
        $this->post         = $post;
        $this->review       = $review;
        $this->notification = $notification;
    }

    public function index()
    {
        return view( 'Admin.delete' );
    }

    public function delete( Request $request )
    {
        $id = $request->id;

        if ( $id ) {
            $model = $request->model;

            if ( $model ) {

                $model = $this->$model;
                $model->destroy( $id );
            }

        }

        if ( $request->model == 'user' ) {
            return redirect()->route( 'getUser' )->with( [
                'delete_msg' => '削除しました。',
            ] );
        }

        if ( $request->model == 'post' ) {
            return redirect()->route( 'getPost' )->with( [
                'delete_msg' => '削除しました。',
            ] );
        }

        if ( $request->model == 'review' ) {
            return redirect()->route( 'getNotification' )->with( [
                'delete_msg' => '削除しました。',
            ] );
        }

    }

    public function softDeletePost( int $id )
    {
        $this->post->find( $id )->delete();

        return redirect()->route( 'getPost' )->with( [
            'delete_msg' => '削除しました。',
        ] );
    }

    /**
     *
     * @param Request $request
     * @param NoticeMessage $noticeMessage
     * @return array
     */
    public function softDeleteNotification(
        Request $request,
        GetNotificationType $getNotificationType,
        NoticeMessage $noticeMessage
    ) {
        $id = $request->id;

        if ( $id ) {
            $model = $request->model;

            if ( $model ) {
                $model = $this->$model;
                $model->find( $id )->delete();
            }

        }

        if ( $request->model == 'review' ) {
            //通知削除
            $this->notification->where( 'review_id', $id )->delete();
            // 通知タイプ取得
            $notice_type = $getNotificationType( $id );
            //通知メッセージ
            $noticeMessage( $request->post_id, $id, $notice_type );
            return redirect()->route( 'getNotification' )->with( [
                'delete_msg' => '削除しました。',
            ] );
        }

        if ( $request->model == 'user' ) {
            return redirect()->route( 'getUser' )->with( [
                'delete_msg' => '削除しました。',
            ] );
        }

        if ( $request->model == 'post' ) {

//管理者側が削除した場合
            if ( $request->notice_id ) {
                // 通知タイプ取得
                $notice_type = $getNotificationType( $request->notice_id );
                //通知削除
                $this->notification->find( $request->notice_id )->delete();
                //通知メッセージ
                $noticeMessage( $id, $request->notice_id, $notice_type );

                return redirect()->route( 'getNotification' )->with( [
                    'delete_msg' => '削除しました。',
                ] );
            }

            return redirect()->route( 'getPost' )->with( [
                'delete_msg' => '削除しました。',
            ] );
        }

    }

    public function softDeleteUser( int $id )
    {
        $this->user->find( $id )->delete();

        return redirect()->route( 'getUser' )->with( [
            'delete_msg' => '削除しました。',
        ] );
    }

    public function restoreUser( int $id )
    {
        $this->user
            ->onlyTrashed()
            ->find( $id )
            ->restore();

        return redirect()->route( 'getSoftdeletesUser' )->with( [
            'delete_msg' => 'アクティブにしました。',
        ] );
    }

    public function furuDelete( int $id )
    {
        $this->user->onlyTrashed()->find( $id )->forceDelete();

        return redirect()->route( 'getSoftdeletesUser' )->with( [
            'delete_msg' => '削除しました。',
        ] );
    }

    public function furuDeletePost( int $id )
    {
        $this->post->onlyTrashed()->find( $id )->forceDelete();

        return redirect()->route( 'getSoftdeletesPost' )->with( [
            'delete_msg' => '削除しました。',
        ] );
    }

    public function restorePost( int $id )
    {
        $this->post->onlyTrashed()->find( $id )->restore();

        return redirect()->route( 'getSoftdeletesPost' )->with( [
            'delete_msg' => 'アクティブにしました。',
        ] );
    }

}
