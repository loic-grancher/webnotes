---
title: Wordpress PHP
sidebar:
    order: 2
---
## Edit theme
Go to yoursite/app /public/wp-content/themes



## WP files:

- functions.php: Where most functions in your theme are stored
- index.php: the welcome page by default (fall back for posts and pages)
- page.php: the template for pages
- content-single.php: the template for posts

## Template tags (metadata): 
prebuild php functions used to display settings (publish date, author...) dynamically. This is followed by the type of html that should be used to display it
Ex:
```php
<?php the_title ('<h1 class="entry-title">', '</h1>'); ?>

<?php the_category ('<h2 class="entry-title">', '</h2>'); ?>

```

## Header and footer functions:
These get their template from 
- header.php
- footer.php
```php
get_header();
get_footer();
```

There are many others:
![[Pasted image 20240626141408.png |400]]

## Use a function to display content

Functions and plugins are similar.
The are many different level of complexity for functions

You can access pre-built functions on the wp website / function reference
```php
# Defining our function
<?php function my_greetings () { ?>
	<h1> Greetings earthlings !</h1>
<?php } ?>

#Calling this function
<?php my_greetings (); ?>
```

Example: a function to check if user logged in:
```php
<?php if (is_user_logged_in()) {
	echo "Welcome, registered user";
} else {
	echo "Welcome, visitor!"
}
```
## Conditional rendering
endif is not mandatory everywhere but it's good practice.
```php
<?php if (has_post_thumbnail()): ?>
	<?php the_post_thumbnail("medium"); ?>
<?php endif; ?>
```

## Hooks and filters
 A location or spot where a piece of code can interact with anotherone.
### Actions: 
it does something: Ex: once you publish a post WP sends an email
It does not provide with data

Example of wp actions:
setup_theme: before the theme is loaded
plugins_loaded: after plugins are loaded
wp_loaded

#### 1. Create a function
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

#### 2. Associate the function with an action
```php 
//In function.php, after previous code
//1: name of the action, 2: name of the function you call
add_action("after_header", "add_promo_text");
```

#### 3. Call the action with the hook "do_action"
```php
// In header.php (for example)
<?php do_action("after_header"); ?>
```
   
### Filters:
It gives you data (ex: excerpt of article)
to modify data before it is used or displayed on the browser

the_excerpt : shows the excerpt of an article
excerpt_length: affects the length of an excerpt

#### 1. Create a function

```php
//functions.php

function my_custom_excerpt_length(){
	return 30;
}

```
#### 2.Associate the function with a filter
```php
//functions.php after previous code
add_filter("excerpt_length", "my_custom_excerpt_length");
```

#### 3. Call the item that has been filtered
```php
//content_single.php
<?php the_excerpt() ?>
```

## Variables & arrays
```php
//defining a variable
<?php $date = date("l"); ?>
//calling it
<? echo $date; ?>
```

In php an array is ==closer to an object in other languages==, as it associates a key and value

```php
$my_array = [
	"firstName" => "harry",
	"lastName" => "potter"
];

OR

$my_array = array(
	"firstName" => "harry",
	"lastName" => "potter"
);
```

## The Wordpress loop
It displays the posts and get info one after the other.

Here's all you can display;
![[Pasted image 20240626154934.png]]
The loop itself:
```php
if (have_posts()){
	//Load posts loop
	while (have_posts()){
		the_post();
		//links one file to another (the content.php file)
		get_template_part("template-parts/content/content",get_theme_mod ("display_excerpt_or_full_post", "excerpt")
	}
	//previous/next page navigation
	twenty_twenty_one_the_posts_navigation();
}else{
			get_template_part("template-parts/content/content-none")
}
```

The content.php file will be shown in the file:
```php
// content-single.php
<?php the_content(); ?>
```


## WP loop for custom post and custom fields
The loop gets data from your post type (blogpost, article...) and allow us to display certain info about them

```php
// I create an "array" with my parameters
<?php $args = [
	"post_type" => "movie",
	"category_name" => "action",
	"posts_per_page" => 3;
];
//I create a new query based on this array 
$the_query = new WP_Query($args);
?>
```
