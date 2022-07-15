<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class DeleteController extends Controller
{
    public function __construct( User $user, Post $post )
    {
        $this->user = $user;
        $this->post = $post;
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

    public function softDeletePost( int $id )
    {
        $this->post->find( $id )->delete();

        return redirect()->route( 'getPost' )->with( [
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
