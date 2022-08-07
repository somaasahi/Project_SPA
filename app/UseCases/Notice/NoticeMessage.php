<?php

namespace App\UseCases\Notice;

use App\Models\Post;
use App\Models\ToAdminMessage;

class NoticeMessage
{
    private $toAdminMessage;
    private $post;

    public function __construct( ToAdminMessage $toAdminMessage, Post $post )
    {
        $this->toAdminMessage = $toAdminMessage;
        $this->post           = $post;
    }

    /**
     *
     * @param int $postId
     * @param null $noticeId
     * @param null $reviewId
     * @param int $type
     * @return array
     */
    public function __invoke( int $postId, $noticeId = null, int $reviewId = null, int $noticeType )
    {
        $userId = $this->findUser( $postId );
        // toAdminMessageへ格納
        $this->registerToAdminMessage( $userId, $noticeType, $reviewId );
    }

    /**
     * 投稿者取得処理
     *
     * @param int $postId
     * @return int
     */
    public function findUser( int $postId ): int
    {
        $post = $this->post
            ->where( 'id', $postId )
            ->withTrashed()
            ->first();

        return $post->user_id;
    }

    /**
     * ユーザーへ通知メッセージ登録処理
     *
     * @param int $userId
     * @param int $noticeType
     * @param int|null $reviewId
     * @return int
     */
    public function registerToAdminMessage( int $userId, int $noticeType, $reviewId = null )
    {
        $this->toAdminMessage->user_id   = $userId;
        $this->toAdminMessage->review_id = $reviewId;
        $this->toAdminMessage->about     = config( 'ini.notification_about.' . $noticeType );
        $this->toAdminMessage->save();
    }
}
