<?php

namespace App\UseCases\Notice;

use App\Models\Notification;
use Illuminate\Http\Request;

class ReportValidate
{

    public function __construct( Notification $notification )
    {
        $this->notification = $notification;
    }

    /**
     *
     * @param Request $request
     * @return array
     */
    public function __invoke( Request $request )
    {
        $validateMessage = $this->makeValidate( $request );

        return $validateMessage;
    }

    /**
     * バリデーションメッセージ作成
     *
     * @param Request $request
     */
    public function makeValidate( Request $request ): array
    {
        $errorMessage = [];

        if ( empty( $request->user_id ) || empty( $request->type ) ) {
            $errorMessage[] = 'システムエラー、運営にお問い合わせ下さい。';
        }

        return $errorMessage;
    }

}
