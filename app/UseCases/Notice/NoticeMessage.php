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
     * @return array
     */
    public function __invoke( int $postId )
    {
        $userId = $this->findUser( $postId );
        $this->registerToAdminMessage( $userId );
    }

    /**
     * 投稿者取得処理
     *
     * @param int $postId
     * @return int
     */
    public function findUser( int $postId ): int
    {
        $post = $this->post->find( $postId )->first();

        return $post->user_id;
    }

    /**
     * ユーザーへ通知メッセージ登録処理
     *
     * @param int $userId
     * @return int
     */
    public function registerToAdminMessage( int $userId )
    {
        $this->toAdminMessage->user_id = $userId;
        $this->toAdminMessage->about   = '投稿に対する不適切なコメントがあったため、削除しました。';
        $this->toAdminMessage->save();
    }
}
