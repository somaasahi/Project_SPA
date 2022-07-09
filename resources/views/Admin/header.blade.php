<nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/admin">AnimalResque</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            @if (Auth::guard('admin')->check())
            <a class="nav-link" href="/admin/logout">ログアウト</a>
            @else
            <a class="nav-link" href="/admin/login">ログイン</a>
            @endif
          </li>
        </ul>
        @if (Auth::guard('admin')->check())
        <span class="navbar-text">
            {{ Auth::guard('admin')->user()->name }}でログイン中
        </span>
        @endif
      </div>
    </div>
  </nav>
