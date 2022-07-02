<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    @include('Admin.header')
  <div class="container">
    @error('login')
    <div class="alert alert-danger">
        &#x26A0; {{ $message }}
    </div>
    @enderror
    <main class="login-form">
        <div class="cotainer">
            <div class="row justify-content-center mt-5">
                <div class="col-md-8 mt-5">
                    <div class="card">
                        <div class="card-header">管理者ログイン</div>
                        <div class="card-body">

                            <form action="{{ route('admin.login') }}" method="POST" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                @csrf
                                <div class="form-group row">
                                    <label for="email_address" class="mb-3 col-md-4 col-form-label text-md-right" placeholder="メールアドレス">メールアドレス</label>
                                    <div class="col-md-6">
                                        <input type="text" id="mb-3 email_address" class="form-control" name="email" required autofocus>
                                        @if ($errors->has('email'))
                                            <span class="text-danger">{{ $errors->first('email') }}</span>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="password" class="mb-3 col-md-4 col-form-label text-md-right" placeholder="8文字以上のパスワード">パスワード</label>
                                    <div class="col-md-6">
                                        <input type="password" id="password" class="form-control" name="password" required autofocus>
                                        @if ($errors->has('password'))
                                            <span class="text-danger">{{ $errors->first('password') }}</span>
                                        @endif
                                    </div>
                                </div>

                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        ログイン
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
  </div>
</body>
</html>
