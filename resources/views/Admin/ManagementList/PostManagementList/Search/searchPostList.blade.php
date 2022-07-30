<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    @include('Admin.header')
  <div class="container mt-5">
    <form action="{{route('getPostSearch')}}" class="mt-3 mb-3" method="POST">
        @csrf
        <div class="input-group w-75 m-auto">
            <input type="text" class="form-control me-3" name="name" placeholder="ユーザー名で検索">
            <select class="form-select me-3" aria-label="Default select example" name="animal_kind">
                <option value="">動物を選択してください</option>
                @foreach (config('ini.animal_kinds') as $key => $value)
                    <option value="{{$key}}">{{$value}}</option>
                @endforeach
            </select>
            <select class="form-select" aria-label="Default select example" name="post_kind">
                <option value="">投稿の種類を選択してください</option>
                @foreach (config('ini.post_kind') as $key => $value)
                    <option value="{{$key}}">{{$value}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75 m-auto mt-2 text-end">
            <button type="submit" class="btn btn-outline-success" type="button" id="button-addon2">
                <i class="fas fa-search"></i> 検索
            </button>
        </div>
    </form>
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
                <td>{{$post->postId}}</td>
                <td>{{$post->name}}</td>
                <td>{{config('ini.animal_kinds.'.$post->animal_kind)}}</td>
                <td>{{config('ini.post_kind.'.$post->post_kind)}}</td>
                <td>{{$post->created_at ? $post->created_at : 'null'}}</td>
                <td>{{$post->updated_at ? $post->updated_at : 'null'}}</td>
                <td><a href="{{ route( 'detailPost',$post->postId ) }}">詳細</a></td>
                <td><a href="{{ route( 'softDeletePost',$post->postId ) }}">論理削除</a></td>
            </tr>
            @endforeach
        </tbody>
      </table>
  </div>
  <div class="m-auto" style='width:40%'>
    {{$postList->links()}}
  </div>
    @if (empty($postList))
        <div class="w-75 m-auto text-center mb-3">検索結果はありません</div>
    @endif
  <div class="w-75 m-auto text-end"><a href="{{route('getSoftdeletesPost')}}">ノンアクティブなデータへ</a></div>

</body>
</html>
