---
title: Menus
---
## Activating menus

 Pour autoriser le support de menu,:
```php
//functions.php
function ontheme_support(){
	...
	add_theme_supports("menus");
	//params: emplacement, nom de l'emplacement dans interface 
	register_nav_menu('header', 'En tête du menu' )
}
```
## Display website info (title in menu...)
We use get_bloginfo, which can access all the info about our website we defined in our parameters.
```php
//header.php
<a href="/"> <?php bloginfo("name") ?> </a> 
```

## Navbar
Option 1: je crée mon menu en HTML (pas éditable depuis back office)
Option 2: j'utilise les outils menu de WP

J'ajoute ma navbar en html dans header.php , mais je remplace l'emplacement des liens par
```php
//functions.php
<?php wp_nav_menu(["theme_location" => "header" ]) ?>
```

### General  Nav Styling 

Problème: wp utilise ses propres classes.
- je désactive le container
- changer la classe du ul
```php
//functions.php
<?php wp_nav_menu([
	"theme_location" => "header", 
	"container" => false,
	//you add your own css classes
	"menu_class" => "flex mx-auto ..."
	
]) ?>
```

### Nav item Styling 

Styler les éléments de nav:
```php
//function.php
function montheme_menu_class($classes)
{
	//ici nav-item est la ou les classes que je veux ajouter à mon item de nav
	$classes[] = "nav-item"
	return $classes
}
//Utilise le filtre sur l'élément wp "nav_menu_css_class"
add_filter("nav_menu_css_class", "montheme_menu_class")
```

 
### Nav link Styling 

Styler les liens pour chaque élément de nav:
```php
//function.php
function montheme_menu_link_class($classes)
{
	//ici nav-link est la ou les classes que je veux ajouter à mon item de nav
	$attrs["class"] = "nav-link"
	return $classes
}
//Utilise le filtre sur l'élément wp "nav_menu_css_class"
add_filter("nav_menu_link_attributes", "montheme_menu_link_class")
```

## Footer
J'enregistre un nouveau menu 
```php
//functions.php
function ontheme_support(){
	...
	register_nav_menu('header', 'En tête du menu' );
	//HERE !!!
	register_nav_menu('footer', 'Pied de page' );
}
```
### General footer styling

```php
//functions.php
<?php wp_nav_menu([
	"theme_location" => "footer", 
	"container" => false,
	//you add your own css classes
	"menu_class" => "flex mx-auto ..."
	
]) ?>
```
