<?php

namespace App\UseCases\Notice;

use App\Models\Notification;

class GetNotificationType
{
    private $notification;

    public function __construct( Notification $notification )
    {
        $this->notification = $notification;
    }

    /**
     * notice_idから通知タイプを取得する
     *
     * @param int $reviewId
     * @return int
     */
    public function __invoke( int $notice_id ): int
    {
        $notification = $this->notification
            ->where( 'id', $notice_id )
            ->first();

        return $notification->type;

    }
}
