<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Animal_Rescueユーザからの問い合わせ</title>
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
                    <tr>
                        <td height="20"></td>
                    </tr>

                    <tr>
                        <td height="20"></td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                    <tr>
                        <h1>{{ $name }}様からのお問い合わせ</h1>
                    </tr>
                    <tr>
                        <h2>メールアドレス：{{ $name }}</h2>
                    </tr>
                    <tr>
                        <p>内容：</p>
                    </tr>
                    <tr>
                        <p>{{ $data }}</p>
                    </tr>
                    <tr>
                        <td style="font-size:14px;"></td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td>―――――――――――――――――――――――――――</td>
                                </tr>
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td>animalRescueホームページは以下から</td>
                                </tr>
                                <tr>
                                    <td>URL ：<a href="http://localhost/login"><span
                                                style="color:rgb(20, 212, 226);">http://localhost</span></a></td>
                                </tr>
                                <tr>
                                    <td>お問い合せ：？？？？</td>
                                </tr>
                                <tr>
                                    <td>Twitter ：???</td>
                                </tr>
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td>―――――――――――――――――――――――――――</td>
                                </tr>
                                <tr>
                                    <td height="20"></td>
                                </tr>
                                <tr>
                                    <td>本メールに心当たりが無い場合は破棄をお願いいたします。</td>
                                </tr>
                                <tr>
                                    <td>送信専用メールアドレスのため、直接の返信はできません。</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                </table>
            </td>
            <td width="10"></td>
        </tr>
    </table>
</body>

</html>
k
