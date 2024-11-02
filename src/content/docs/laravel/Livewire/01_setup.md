---
title: Setup
sidebar:
    order: 21
---
## Install 
```
composer require livewire/livewire
```

## No layout:

NOTE for AlpineJS:
Because Alpine is bundled with Livewire's JavaScript assets, you must include `@livewireScripts` on every page you wish to use Alpine. Even if you're not using Livewire on that page.

By default, Livewire3 injects the JavaScript and CSS assets it needs into each page that includes a Livewire component.

**If needed:**
Include the JavaScript (on every page that will be using Livewire).

```php
<head>
	...   
	@livewireStyles
</head>
<body>
	...
	@livewireScripts
</body>
```

## Create a livewire layout for rendering components
It is mandatory so the components are rendered correctly
```
php artisan livewire:layout
```
Creates : resources/views/components/layouts/app.blade.php

I add one line in the head tag of my layout for tailwind:
```php
//app.blade.php
@vite('resources/css/app.css')
```

