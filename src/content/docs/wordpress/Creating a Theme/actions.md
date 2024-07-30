---
title: Actions
sidebar:
    order: 4
---
It does something: Ex: once you publish a post WP sends an email
It does not provide with data

Example of wp actions:
- after_setup_theme: once the theme is loaded
- setup_theme: before the theme is loaded
- plugins_loaded: after plugins are loaded
- wp_loaded

## 1. Create a function

⚠️ It is usually a good idea to use your theme name before the function 
(ex: mon_theme_add_promo_text())

```php
//In function.php

//Add some text after header only on front page
//Create function
function add_promo_text(){
	if (!if_front_page())
		return;

	echo "<h2>Hot promo is back again! </h2>";
}
```

## 2. Associate the function with an action

💡 It can be a good idea to separate the functions and the actions that call them. Ex: all the functions first, then all the actions.
```php 
//In function.php, after previous code
//1: name of the action, 2: name of the function you call
add_action("after_header", "add_promo_text");


// I can add a number of priority (9). 
//Note: I can also define my function directly here instead of calling one
add_action("wp_head", function(){
	dd("Hi !");
}, 9);
```

## 3. Call the action with the hook "do_action"
```php
// In header.php (for example)
<?php do_action("after_header"); ?>
```

## Bonus: using namespace
It's better sometimes to use a namespace since it allows to separate the actions into several blocks that are isolated.
```php
<?php
	namespace App;

	function montheme_supports(){
		add_theme_support("title_tag");
	}
add_action("after_setup_theme", "App/montheme_supports");
```

