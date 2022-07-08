<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    @include('Admin.header')
  <div class="container mt-5">
    <table class="table w-75 m-auto mb-5">
        <thead class="table-light">
            <tr>
                <th>カテゴリ</th>
                <th>ユーザー</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>ユーザーID</td>
                <td>{{$user->id}}</td>
            </tr>
            <tr>
                <td>ユーザー名</td>
                <td>{{$user->name}}</td>
            </tr>
            <tr>
                <td>メールアドレス</td>
                <td>{{$user->email}}</td>
            </tr>
            <tr>
                <td>登録日</td>
                <td>{{$user->created_at}}</td>
            </tr>
            <tr>
                <td>状態</td>
                <td>{{$user->deleted_at ? 'ノンアクティブ' : 'アクティブ'}}</td>
            </tr>
        </tbody>
      </table>
        <form action="{{route('delete')}}" class="m-auto w-75 text-end" method="POST">
            @csrf
            <input type="hidden" name="id" value="{{$user->id}}">
            <input type="hidden" name="model" value="user">
            <a href="{{route('getUser')}}">
                <button  type="button" class="btn btn-secondary">
                    戻る
                </button>
            </a>
            <button type="submit" class="btn btn-primary" onClick="delete_alert(event);return false;">
                ユーザー削除
            </button>
        </form>
</body>
<script>
    function delete_alert(e){
    if(!window.confirm('本当に削除しますか？')){
        return false;
    }
    document.deleteform.submit();
    };
</script>
</html>
