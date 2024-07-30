---
title: Filters
sidebar:
    order: 5
---
## Definition
 
 A location or spot where a piece of code can interact with another one.

Similar to hooks, but returns a value.
```php
//functions.php
add_filter("elementToAffect", "functionsToUse");




```
It will take the first value and modify it. Ex: append some text before or after, multiply...

## Examples

### Example1: append text to page title

```php
//functions.php


function mon_theme_title($title){
	return "Salut ".$title;
}

add_filter("wp_title", "mon_theme_title");
```

### Example 2: change the separator in the title of the page to a pipe |

```php
//functions.php

function montheme_title_separator(){
	return "|";
}

add_filter("document_title_separator", "montheme_title_separator");
```

### Example 3: remove title tagline

```php
//functions.php

function montheme_document_title_parts(){
	unset($title["tagline"]);
	return title;
}

add_filter("document_title_parts", "montheme_document_title_parts");
```


### Example 4: change length of article excerpt

```php
//functions.php

function my_custom_excerpt_length(){
	return 30;
}

add_filter("excerpt_length", "my_custom_excerpt_length");

//Now you can call the item using
<?php the_excerpt() ?>
```


