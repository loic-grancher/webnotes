---
title: Routing
---
## Basic route
```php
//routes/web.php
Route::get('/', function () {
	return view('welcome');
});
```

### Give a name to the route (useful)
```php
//routes/web.php
Route::get('/', function () { 
	return view('welcome');
})->name("home");
```

Using a route name for linking:
```php
<a href="{{ route('home') }}">Home</a>
```

## Dynamic route
```php
Route::get('/user/{id}', function (string $id) {
	return 'User '.$id;
});
```
