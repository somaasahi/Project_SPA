<?php

namespace App\UseCases\Auth;

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
    public function makeValidate( Request $request ): array
    {
        $errorMessage = [];

        if ( empty( $request->email ) ) {
            $errorMessage[] = '名前は必須です';
        }

        if ( empty( $request->password ) ) {
            $errorMessage[] = 'パスワードは必須です';
        }

        $password_length = mb_strlen( $request->password );

        if ( $password_length < 8 ) {
            $errorMessage[] = 'パスワードは8文字以上で記入してください';
        }

        return $errorMessage;
    }

}
