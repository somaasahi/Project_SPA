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
                <th>#</th>
                <th>管理リスト</th>
                <th>リンク</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>ユーザーリスト</td>
                <td><a href="{{ route('admin.index') }}">ユーザーリストへ</a></td>
            </tr>
            <tr>
                <td>2</td>
                <td>投稿リスト</td>
                <td><a href="{{ route('admin.index') }}">投稿リストへ</a></td>
            </tr>
        </tbody>
      </table>

  <ul>
    <li>user情報（データの表示と削除）</li>
    <li>post情報（データの表示と削除）</li>
    <li>検索機能</li>
    <li></li>
  </ul>
</body>
</html>
