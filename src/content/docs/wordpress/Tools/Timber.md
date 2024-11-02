---
title: Timber
---
- Moteur de template TWIG
- Transforme fonctionalités WP en fonctionnalités OOP

# Installation
Installe twig, cache système de route
```sh
 composer require timber/timber
```

# Créer un thème avec timber

Créer:
/themes/montheme/index.php
/themes/montheme/functions.php
/themes/montheme/style.css

Admin wp => activer thème créé

Dans functions.php, charger timber:
```php
// montheme/functions.php
<?php
require_once __DIR__ . '/vendor/autoload.php';
// Initialize Timber.
Timber\Timber::init();
```

# Utiliser timber

Dans une page (ex: index.php), je peux :
```php
// montheme/index.php
// ici $context représente les données envoyées à la vue
use Timber\Timber;
Timber::render('views/index.twig', $context);
```

Je crée un dossier /views/pages/index.twig

Je peux utiliser les layout dans twig (/views/base.twig), les blocks...

```php
//index.twig

//Utilise un layout de base
{% extends"base.twig" %}

//crée un block
{% block body %}
	//mon contenu
{% endblock %}

//inclue un autre fichier twig
{% include "header.twig" %}

```

# Passer des données statiques
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
# Afficher les données
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

# Afficher des données dynamiques
```php

use Timber\Timber;
$context = Timber::context();

// on définit nos arguments
$args = [
	'post_type' => 'post',
	'posts_per_page' => 5
];

// On query grace aux arguments et on associe le contenu de la query à l'objet "posts" dans notre contexte
$context["posts"] = Timber::get_posts($args);

//on envoie le contexte à la vue
Timber::render('views/index.twig', $context);
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

# Getting data from ACF fields specifically
PHP
```php
$meta = $post->meta('my_acf_field');
```
Twig
```twig
{{ post.meta('my_acf_field') }}
```
