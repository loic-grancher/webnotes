---
title: Creating a custom WP theme
sidebar:
    order: 2
---

## Creating a theme

### Set up:

- Go to `yoursite/app /public/wp-content/themes` and create a new folder for your theme
 
A theme consists of:
- styles.css (mandatory); where the style goes
- functions.php (mandatory): Where most functions in your theme are stored
- index.php (mandatory): the welcome page by default (fall back for posts and pages)
  
- page.php: the template for pages
- content-single.php: the template for posts

### Initialise the theme

#### Style.css
In your style.css insert
```
/*
Theme Name: My theme
Theme URI: https://wordpress.org/themes/twentytwentyone/
Description: Twenty Twenty-One child theme
Author: WordPress.org
Author URI: https://wordpress.org/
Template: twentytwentyone
Version: 1.0.0
Text Domain: twentytwentyonechild
*/
```

🖼️ To add a screenshot, add a screenshot.png in your theme folder


#### Index.php

- Solution 1: (not great) Here I add the html skeleton of the page
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	
	<body>
		//Mon contenu
	</body>
</html>
```

- Solution 2 (better): I use the wp header and footers to set up my html
```php
<?php get_header() ?>
		//Mon contenu
<?php get_footer() ?>
```

To customise these, I can create a header.php and footer.php

#### Header.php
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	
	<body>
```

ℹ️ The WP bar is gone, to get it back we use the function wp_head(). You'll also need a wp_footer() for it to work.
```php
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
		// HERE !!!
		<? wp_head(); ?>
	</head>
	
	<body>
```
#### Footer.php
```html
	</body>
</html>
```

ℹ️ Similarly to wp_head(), we'll add a wp_footer() function to get the WP bars
```php
	<?php wp_footer() ?>
	</body>
</html>
```

### Enabling theme support for dynamic titles

- I first need to add theme support to tell what things are available in my theme.
  This is done in functions.php
```php
//functions.php
<?php
	// I could add more things after title_tag, see docs
	add_theme_support('title_tag');
```
