<?php

namespace App\Http\Controllers;

use App\Models\FriendRelation;
use App\Models\Like;
use App\Models\Post;
use App\Models\Profile;
use App\Models\Review;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class Homecontroller extends Controller
{
    public function homeIndex( Request $request )
    {
        // Log::debug($request->all());
        $animal  = $request->get( 'animal' );
        $kind    = $request->get( 'kind' );
        $order   = $request->get( 'order' );
        $keyword = $request->get( 'keyword' );
        $total   = $request->get( 'total' );

        $query = Post::select('posts.id as id', 'posts.img_url1', 'posts.content', 'posts.created_at', 'users.name', 'profiles.img_url')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->leftJoin('profiles', 'users.id', '=', 'profiles.user_id');
        $query->withCount('likes');
        $query->withCount('reviews');
        $query->selectRaw('DATE_FORMAT(posts.created_at, "%Y/%m/%d/%h:%m") AS date');

        if ( ! empty( $animal ) ) {
            $query->where( 'animal_kind', $animal );
        }

        if ( ! empty( $kind ) ) {
            $query->where( 'post_kind', $kind );
        }

        if ( ! empty( $keyword ) ) {
            $query->where( 'content', 'LIKE', "%{$keyword}%" );
        }
        if (empty($order) || $order === '1') {
            $query->orderBy('created_at', 'desc');
        }

        if ( $order === '2' ) {
            $query->orderBy( 'likes_count', 'desc' );
        }

        if ( $order === '3' ) {
            $query->orderBy( 'reviews_count', 'desc' );
        }
        if ($order === '4') {
            $query->orderBy('created_at', 'asc');
        }

        $query->skip( $total )->take( 10 )->get();

        $results = $query->get();

        return $results;
    }

    public function likeCount( Request $request )
    {
        $count = Like::where( 'post_id', $request->get( 'post_id' ) )->count();
        return $count;
    }

    public function showDetail( Request $request )
    {
        \Log::debug( $request );
        \Log::debug( 'request通過' );
        $result = [];
        // Log::debug( $request->all() );
        $id = $request->get( 'id' );
        \Log::debug( $id );
        \Log::debug( 'id通過' );
        $detail   = Post::withCount( 'likes' )->find( $id );
        $result[] = $detail;
        \Log::debug( $detail );
        \Log::debug( 'detail通過' );
        $result[] = User::find( $detail->user_id );
        $result[] = Profile::where( 'user_id', $detail->user_id )->first();
        return $result;
    }

    public function like( Request $request )
    {
        $check = Like::where( 'post_id', $request['params']['post_id'] )
            ->where( 'user_id', $request['params']['user_id'] )->exists();

        Log::debug( $check );
        $like    = new Like();
        $results = [];

        if ( empty( $check ) ) {
            $like->post_id = $request['params']['post_id'];
            $like->user_id = $request['params']['user_id'];
            $like->save();
            $results[0] = Like::where( 'post_id', $request['params']['post_id'] )->count();
            $results[1] = true;
            return $results;
        } else {
            $like->where( 'post_id', $request['params']['post_id'] )
                ->where( 'user_id', $request['params']['user_id'] )->delete();
            $results[0] = Like::where( 'post_id', $request['params']['post_id'] )->count();
            $results[1] = false;
            return $results;
        }

    }

    public function checkLike( Request $request )
    {
        $user_id = $request->get( 'user_id' );
        $post_id = $request->get( 'post_id' );
        $check   = Like::where( "user_id", $user_id )->where( 'post_id', $post_id )->exists();
        return $check;
    }

    public function showReview( Request $request )
    {
        $id      = $request->get( 'id' );
        $reviews = Review::select( 'reviews.id as id', 'reviews.comment', 'reviews.created_at', 'users.name', 'profiles.img_url', 'reviews.deleted_at' )
            ->join( 'users', 'reviews.user_id', '=', 'users.id' )->leftJoin( 'profiles', 'users.id', '=', 'profiles.user_id' )->where( 'reviews.post_id', $id )->withTrashed()->get();
        return $reviews;
    }

    public function postReview( Request $request )
    {
        $validator = Validator::make( $request['params'], [
            'comment' => 'required|min:2|max:50',
        ] );

        if ( $validator->fails() ) {

            return response()->json( ['message' => '2~50文字で入力してください'], 400 );
        } else {
            DB::beginTransaction();

            try {

                $review          = new Review();
                $review->user_id = $request['params']['user_id'];
                $review->post_id = $request['params']['post_id'];
                $review->comment = $request['params']['comment'];
                $review->save();

                $reviews = Review::select( 'reviews.id as id', 'reviews.comment', 'reviews.created_at', 'users.name', 'profiles.img_url', 'reviews.deleted_at' )
                    ->join( 'users', 'reviews.user_id', '=', 'users.id' )
                    ->leftJoin( 'profiles', 'users.id', '=', 'profiles.user_id' )
                    ->where( 'reviews.post_id', $request['params']['post_id'] )->withTrashed()->get();

                DB::commit();

                return $reviews;
            } catch ( Exception $exception ) {
                DB::rollBack();
                return response()->json( ['message' => 'システムエラー'], 500 );
            }

        }

    }

    public function checkFriend( Request $request )
    {
        $from_id = $request->get( 'from_user_id' );
        $to_id   = $request->get( 'to_user_id' );

        $exist  = FriendRelation::where( 'from_user_id', $from_id )->where( 'to_user_id', $to_id )->exists();
        $exist2 = FriendRelation::where( 'from_user_id', $to_id )->where( 'to_user_id', $from_id )->exists();

        if ( empty( $exist ) ) {

            if ( empty( $exist2 ) ) {
                return 3;
            } else {
                $status = FriendRelation::where( 'from_user_id', $to_id )->where( 'to_user_id', $from_id )->pluck( "status" );

                if ( $status[0] == 0 ) {
                    return 3;
                }

                return $status;
            }

        } else {
            $status = FriendRelation::where( 'from_user_id', $from_id )->where( 'to_user_id', $to_id )->pluck( "status" );
            return $status;
        }

    }

    public function makeFriend( Request $request )
    {
        $from_id = $request['params']['from_user_id'];
        $to_id   = $request['params']['to_user_id'];

        $exist = FriendRelation::where( 'to_user_id', $from_id )->where( 'from_user_id', $to_id )->where( 'status', 0 )->exists();

        if ( ! empty( $exist ) ) {
            FriendRelation::where( 'to_user_id', $from_id )
                ->where( 'from_user_id', $to_id )->where( 'status', 0 )->update( ['status' => 1] );
            $record               = new FriendRelation;
            $record->from_user_id = $from_id;
            $record->to_user_id   = $to_id;
            $record->status       = 1;
            $record->save();

            return 1;
        } else {
            $record               = new FriendRelation;
            $record->from_user_id = $from_id;
            $record->to_user_id   = $to_id;
            $record->status       = 0;
            $record->save();
            return 0;
        }
    }
}
