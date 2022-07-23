<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    @include('Admin.header')
  <div class="container">
    @if (session('login_msg'))
    <div class="alert alert-success">
      {{ session('login_msg') }}
    </div>
    @endif
    <div class="mt-5 mb-5">
        <img id="profile-img" class="rounded mx-auto d-block profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png">
    </div>
    <table class="table w-50 m-auto">
        <thead class="table-light">
            <tr>
                <th></th>
                <th>管理リスト</th>
                <th>リンク</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>ユーザーリスト</td>
                <td><a href="{{ route('getUser') }}">ユーザーリストへ</a></td>
            </tr>
            <tr>
                <td>2</td>
                <td>投稿リスト</td>
                <td><a href="{{ route('getPost') }}">投稿リストへ</a></td>
            </tr>
            <tr>
                <td>3</td>
                <td>通知</td>
                <td><a href="{{ route('getNotification') }}">通知リストへ</a></td>
            </tr>
        </tbody>
      </table>

  <ul>
    <li>viewに表示（post or review）切り替えロジック</li>
    <li>詳細の切り替えロジック、詳細画面</li>
    <li>警告処理（投稿であれば、投稿削除とメッセージ　or レビューであれば、レビュー削除と、メッセージ）</li>
    <li>警告処理をだす、投稿削除されているかの確認</li>
  </ul>
</body>
</html>
