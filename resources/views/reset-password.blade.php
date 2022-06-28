<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>パスワード入力画面</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <main class="login-form">
        <div class="cotainer">
            <div class="row justify-content-center mt-5">
                <div class="col-md-8 mt-5">
                    <div class="card">
                        <div class="card-header">Reset Password</div>
                        <div class="card-body">

                            <form action="{{ route('password.update') }}" method="POST" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                @csrf
                                <input type="hidden" name="token" value="{{ $token }}">

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

                                <div class="form-group row">
                                    <label for="password-confirm" class="mb-3 col-md-4 col-form-label text-md-right" placeholder="上記と同じパスワード">確認用パスワード</label>
                                    <div class="col-md-6">
                                        <input type="password" id="password-confirm" class="form-control" name="password_confirmation" required autofocus>
                                        @if ($errors->has('password_confirmation'))
                                            <span class="text-danger">{{ $errors->first('password_confirmation') }}</span>
                                        @endif
                                    </div>
                                </div>

                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        パスワードリセット
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</html>
