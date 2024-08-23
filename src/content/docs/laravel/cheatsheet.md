---
title: Cheatsheet
sidebar:
    order: 1
---

## Starting a project the regular way:
```sh
composer create-project laravel/laravel example-app
```

##  Starting a project with Laravel Easy Installer:
```sh
composer global require laravel/installer
```

- Launching new project (you should be prompted to use Breeze/etc.. if everything is up to date):
- We choose Livewire Volt Class Livewire with Breeze. Tailwind and AlpineJS get installed
```sh
laravel new projectName
```

## Starting servers:
- Vite server (for  tailwind):
```sh
npm run dev
```

- Laravel server :
```sh
php artisan serve
```

- Database:
Normally, created when slecting Breeze, but if not:
```sh
php artisan migrate
```
## Livewire (if not in config)
Note: you will install a node server to run the font-end

```sh
composer require livewire/livewire
```
Install assets (like recommended in CLI)
```sh
php artisan vendor:publish --tag=laravel-assets --ansi --force
```

## Tailwind
```sh
npm install -D tailwindcss postcss autoprefixer
```

```sh
npx tailwindcss init -p
```

In tailwind config:
```json
export default {
	content: [
	"./resources/**/*.blade.php",
	"./resources/**/*.js",
	"./resources/**/*.vue",
	],
}
```

In ressources/app.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In index.blade or layout file, add the VITE line:
```php
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Laravel</title>
	//HERE !!!
	@vite("resources/css/app.css")
</head>
```
## Laravel Sail
### Adding module:
```sh
composer require laravel/sail --dev
```

### Installing

This command will publish Sail's `docker-compose.yml` file to the root of your application and modify your `.env` file with the required environment variables
```sh
php artisan sail:install
```

### Running
```sh
./vendor/bin/sail up
```

### Rebuilding Sail Images

To completely rebuild your Sail images to ensure all of the image's packages and software are up to date. 
```sh
docker compose down -v sail build --no-cache sail up
```
