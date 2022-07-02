<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <h1>管理画面トップ</h1>

    @if (session('login_msg'))
    <div class="alert alert-success">
      {{ session('login_msg') }}
    </div>
    @endif

    @if (Auth::guard('admin')->check())
    <div> {{ Auth::guard('admin')->user()->name }}でログイン中</div>
    @endif

    <ul>
      <li>ログイン状態: {{ Auth::check() }}</li>
      <li>管理者（Administrator）ログイン状態: {{ Auth::guard('admin')->check() }}</li>
    </ul>

    <div>
      <a href="/admin/logout">ログアウト</a>
    </div>
  </div>

</body>
</html>
