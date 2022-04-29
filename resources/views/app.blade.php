<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Animal_Rescue</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" />

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body>
        <div id="app">
        </div>
        <script src="{{ asset('js/app.js') }}" defer></script>
    </body>
</html>



