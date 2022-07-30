<html>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
    @include('Admin.header')
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                投稿写真
            </div>
            <div><img class="card-img-top" src="{{ asset($post->img_url1) }}"></div>
            <div><img class="card-img-top" src="{{ asset($post->img_url2) }}"></div>
            <div><img class="card-img-top" src={{ asset($post->img_url3) }}></div>
            <div class="card-body">
            </div>

        </div>
        <table class="table mb-5">
            <thead class="table-light">
                <tr>
                    <th>カテゴリ</th>
                    <th>投稿内容</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>ユーザー名</td>
                    <td>{{ $post->name }}</td>
                </tr>
                <tr>
                    <td>動物</td>
                    <td>{{ config('ini.animal_kinds.' . $post->animal_kind) }}</td>
                </tr>
                <tr>
                    <td>投稿の種類</td>
                    <td>{{ config('ini.post_kind.' . $post->post_kind) }}</td>
                </tr>
                <tr>
                    <td>テキスト</td>
                    <td>{{ $post->content }}</td>
                </tr>
                <tr>
                    <td>いいね数</td>
                    <td>{{ $like }}</td>
                </tr>
                <tr>
                    <td>登録日</td>
                    <td>{{ $post->created_at }}</td>
                </tr>
                <tr>
                    <td>更新日</td>
                    <td>{{ $post->updated_at }}</td>
                </tr>
                <tr>
                    <td>状態</td>
                    <td>{{ $post->deleted_at ? 'ノンアクティブ' : 'アクティブ' }}</td>
                </tr>
            </tbody>
        </table>

        @if ($post->deleted_at == null)
            <form action="{{ route('softDeleteNotification') }}" class="m-auto w-75 text-end" method="POST">
                @csrf
                <input type="hidden" name="id" value="{{ $post->postId }}">
                <input type="hidden" name="notice_id" value="{{ $action }}">
                <input type="hidden" name="model" value="post">
                <button type="button" class="btn btn-secondary" onClick="history.back()">
                    戻る
                </button>
                <button type="submit" class="btn btn-primary" onClick="delete_alert(event);return false;">
                    投稿削除
                </button>
            </form>
        @else
            <form action="{{ route('delete') }}" class="m-auto w-75 text-end" method="POST">
                @csrf
                <input type="hidden" name="id" value="{{ $post->postId }}">
                <input type="hidden" name="model" value="post">
                <button type="button" class="btn btn-secondary" onClick="history.back()">
                    戻る
                </button>
                <button type="submit" class="btn btn-primary" onClick="delete_alert(event);return false;">
                    投稿削除
                </button>
            </form>
        @endif
</body>
<script>
    function delete_alert(e) {
        if (!window.confirm('本当に削除しますか？')) {
            return false;
        }
        document.deleteform.submit();
    };
</script>

</html>
