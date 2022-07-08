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
                <th>ID</th>
                <th>ユーザー名</th>
                <th>動物</th>
                <th>投稿の種類</th>
                <th>登録日</th>
                <th>更新日</th>
                <th>詳細</th>
                <th>削除</th>
            </tr>
        </thead>
        <tbody>
            @foreach($postList as $post)
            <tr>
                <td>{{$post->id}}</td>
                <td>{{$post->name}}</td>
                <td>{{config('ini.animal_kinds.'.$post->animal_kind)}}</td>
                <td>{{config('ini.post_kind.'.$post->post_kind)}}</td>
                <td>{{$post->created_at ? $post->created_at : 'null'}}</td>
                <td>{{$post->updated_at ? $post->updated_at : 'null'}}</td>
                <td><a href="{{ route('detailPost',$post->id) }}">詳細</a></td>
                <td><a href="{{ route('softDeletePost',$post->id) }}">論理削除</a></td>
            </tr>
            @endforeach
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
</body>
</html>
