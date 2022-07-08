<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Animal_Rescue</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body>

        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="10"></td>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:660px;">
                  <tr><td height="20"></td></tr>
                  <tr>
                    <td><h1>animalRescueのパスワードをお忘れの方へ。</h1></td>
                  </tr>
                  <tr><td height="20"></td></tr>
                  <tr>
                    <td>パスワードの再設定をご希望の場合は、以下の「パスワード再設定」をクリックし、新しいパスワードをご登録ください。</td>
                  </tr>
                  <tr><td height="20"></td></tr>
                  <tr>
                    <td>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            <a href="{{$actionUrl}}">パスワードの再設定希望の方はこちらをクリック<a>
                        </button>
                    </td>
                    <tr><td height="10"></td></tr>
                    <tr>
                        <td>※URLの期限は60分です。</td>
                    </tr>
                </tr>
                  <tr>
                    <td style="font-size:14px;"></td>
                  </tr>
                  <tr>
                    <td>
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr><td height="10"></td></tr>
                        <tr>
                            <td>―――――――――――――――――――――――――――</td>
                        </tr>
                        <tr><td height="10"></td></tr>
                        <tr>
                            <td>animalRescueホームページは以下から</td>
                        </tr>
                        <tr>
                            <td>URL ：<a href="http://localhost/login"><span style="color:rgb(20, 212, 226);">http://localhost</span></a></td>
                        </tr>
                        <tr>
                            <td>お問い合せ：？？？？</td>
                        </tr>
                        <tr>
                            <td>Twitter ：???</td>
                        </tr>
                        <tr><td height="10"></td></tr>
                        <tr>
                            <td>―――――――――――――――――――――――――――</td>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td>本メールに心当たりが無い場合は破棄をお願いいたします。</td>
                        </tr>
                        <tr>
                            <td>送信専用メールアドレスのため、直接の返信はできません。</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr><td height="20"></td></tr>
                </table>
              </td>
              <td width="10"></td>
            </tr>
          </table>
    </body>
</html>
