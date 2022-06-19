<?php

namespace App\UseCases\Profile;

use Illuminate\Http\Request;

class Validate
{
    /**
     *
     * @param Request $request
     * @return array
     */
    public function __invoke(Request $request)
    {
        $validateMessage = $this->makeValidate($request);

        return $validateMessage;
    }

    /**
     * バリデーションメッセージ作成
     *
     * @param Request $request
     */
    public function makeValidate( Request $request):array
    {
        $errorMessage = [];
        $request->name = '';
        if(empty($request->name)) {
            $errorMessage[] = '名前は必須です';
        }

        $description = mb_strlen($request->description);
        $description = 2666;
        if($description > 255) {
            $errorMessage[] = '紹介メッセージは255文字以下で記入してください';
        }

        return $errorMessage;
    }
}
