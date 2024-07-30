---
title: Timber
---
- Moteur de template TWIG
- Transforme fonctionalités WP en fonctionnalités OOP

## Installation
Installe twig, cache système de route
```sh
 composer require timber/timber
```

## Créer un thème avec timber

Créer:
/themes/montheme/index.php
/themes/montheme/functions.php
/themes/montheme/style.css

Admin wp => activer thème créé

Dans functions.php:
```php
// montheme/functions.php
<?php 
$timber = new \Timber\Timber();

// pour éviter de devoir mettre {{ var | raw}}
\TimberTimber::$autoescape = false
// Dossier des template, par défaut /templates 
\TimberTimber::$dirname = ["templates", "views"];

```

## Utiliser timber

Dans une page (ex: index.php), je peux toujours écrire mon code habituel.

Mais je peux aussi:
```php
// montheme/index.php

// ici $var représente les données envoyées à la vue
\TimberTimber::render("/pages/index.twig", [$var])
```

Je crée un dossier /views/pages/index.twig

Je peux utiliser les layout dans twig (/views/base.twig), les blocks...

```php
//index.twig

{% extends"base.twig" %}

{% block body %}
	//mon contenu
{% endblock %}

```

## Passer des données statiques
On pourra utiliser la variable `$site` qui contient les infos passées à la vue (`$var`)

D'abord dans ma page php (index.php)
```php
// montheme/index.php

//On crée le contexte
$context = Timber::get_context();
//On ajoute des infos au contexte
$context["firstName"] = 'John';

\TimberTimber::render("/pages/index.twig", [$var])
```
## Afficher les données
note: `function()` allows to use certain wp php functions directly in twig (wp_head...)

```php
//base.twig
<!DOCTYPE html>
<html lang="{{ site.language.attributes }}">

	<head>
		<meta charset="{{ site.charset}}">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		{{ function("wp_head")}}
		<title>Document</title>
	</head>

	<body class="{{ body_class}}">
	{{ function("wp_header")}}
	
	{% block body %} {% endblock %}
	
	{{ function("wp_footer")}}
	</body>
</html>
```

## Afficher des données dynamiques
```php

//On crée le contexte
$context = Timber::get_context();
//On récupère nos posts
$posts = Timber::get_posts([
	'post_type' => 'character', 
	'posts_per_page' => 2
]);
// On ajoute les posts au contexte
$context["posts"] = $posts;

//on envoie à la vue
Timber::render('index.twig', $context);
```

Note : pour `{{ post.content }}`, utiliser `{{ post.content | raw }}` si pas échappé
```php
//index.twig
{% extends "base.twig" %}

{% block body %}
	<h1>A Timber Tutorial</h1>

<ul>
{% for post in posts %}
	<li> {{ post.name }}, {{ post.age }} yo, {{ post.house }} </li>
{% endfor %}
</ul>
{% endblock %}

```

## Getting data from ACF (?)
PHP
```php
$meta = $post->meta('my_acf_field');
```
Twig
```twig
{{ post.meta('my_acf_field') }}
```
