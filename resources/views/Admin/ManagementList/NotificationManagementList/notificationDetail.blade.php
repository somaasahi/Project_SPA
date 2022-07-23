<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
    @include('Admin.header')
  <div class="container mt-5">
    <table class="table mb-5">
        <thead class="table-light">
            <tr>
                <th>カテゴリ</th>
                <th>レビュー内容</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>ユーザー名</td>
                <td>{{$review->name}}</td>
            </tr>
            <tr>
                <td>コメント</td>
                <td>{{$review->comment}}</td>
            </tr>
            <tr>
                <td>登録日</td>
                <td>{{$review->created_at}}</td>
            </tr>
            <tr>
                <td>状態</td>
                <td>{{$review->deleted_at ? 'ノンアクティブ' :'アクティブ'}}</td>
            </tr>
            <tr>
                <td>投稿詳細</td>
                <td><a href="{{ route('detailPost' , $review->post_id ) }}">投稿詳細へ</a></td>
            </tr>
        </tbody>
      </table>
      @if ($review->deleted_at == null)
      <form action="{{route('softDeleteNotification')}}" class="m-auto w-75 text-end" method="POST">
      @else
      <form action="{{route('delete')}}" class="m-auto w-75 text-end" method="POST">
      @endif
            @csrf
            <input type="hidden" name="id" value="{{$review->reviewId}}">
            <input type="hidden" name="post_id" value="{{$review->post_id}}">
            <input type="hidden" name="model" value="review">
            <input type="hidden" name="mailType" value=1>
            <a href="{{route('getNotification')}}">
                <button  type="button" class="btn btn-secondary">
                    戻る
                </button>
            </a>
            <button type="submit" class="btn btn-primary" onClick="delete_alert(event);return false;">
                投稿削除
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
