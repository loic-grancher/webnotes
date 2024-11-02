---
title: Component routes
sidebar:
    order: 23
---
### Php
```php
// routes/web.php
Route::get(uri: "/counter", action:Counter::class);

```

### Blade
```php
<a href="{{route("counter")}}"> Counter </a>
```
