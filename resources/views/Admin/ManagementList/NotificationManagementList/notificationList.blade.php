<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
    @include('Admin.header')
  <div class="container mt-5">
    <form action="{{route('getNotificationSearch')}}" class="mt-3 mb-3" method="POST">
        @csrf
        <div class="input-group w-75 m-auto">
            <input type="text" class="form-control me-3" name="name" placeholder="ユーザー名で検索">
            <select class="form-select me-3" aria-label="Default select example" name="notification_type">
                <option value="">通報の種類を選択してください</option>
                @foreach (config('ini.notification_type') as $key => $value)
                    <option value="{{$key}}">{{$value}}</option>
                @endforeach
            </select>
            <select class="form-select" aria-label="Default select example" name="softDeletes">
                <option value="0">削除済みかどうかを選択してください</option>
                    <option value="0">アクティブ</option>
                    <option value="1">ノンアクティブ</option>
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
                <th>通報者</th>
                <th>種類</th>
                <th>通報理由</th>
                <th>通知日</th>
                <th>詳細</th>
                <th>状態</th>
            </tr>
        </thead>

        <tbody>
            @foreach($notificationList as $notification)
            <tr>
                <td>{{$notification->name}}</td>
                <td>{{config('ini.notification_type.'.$notification->type)}}</td>
                <td>{{$notification->about}}</td>
                <td>{{$notification->created_at}}</td>
                @if ($notification->type == 1)
                <td><a href="detailReview/{{$notification->review_id}}">詳細</a></td>
                @else
                <td><a href="detailReview/{{$notification->post_id}}?action={{$notification->notificationId}}">詳細</a></td>
                @endif
                <td>{{$notification->deleted_at ? 'ノンアクティブ':'アクティブ'}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div class="m-auto" style="width: 40%">
        {{ $notificationList->links() }}
    </div>
    </div>
</body>
</html>
