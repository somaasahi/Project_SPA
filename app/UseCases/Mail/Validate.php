<?php

namespace App\UseCases\Mail;

use Illuminate\Http\Request;

class Validate
{
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
    public function makeValidate( Request $request )
    {
        $errorMessage = '';

        $pattern = '/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/';

        if ( empty( $request->email ) ) {
            return $errorMessage = 'メールアドレスは必須です';
        } elseif ( ! preg_match( $pattern, $request->email ) ) {
            return $errorMessage = 'メールアドレスを正しく記載してください';
        }

        return $errorMessage;
    }

}
