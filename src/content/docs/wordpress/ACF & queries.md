---
title: ACF & queries
---


# Setup
- Install ACF
- Create a custom field group, give a name to each field
- Setup the field to appear on certain articles or posts
- Fill in the new texbox in an article or mroe

# ACF short-code
Inside our page, we use a shortcode with
```
[acf field="my_field"]
```

# PHP stuff
- In code editor, open single.php (for a blogpost) file


Original code:
```php
<?php
get_header();

if(have_posts()){
	while(have_posts()){
		the_post();
		echo '<h1>'.get_the_title().'</h1>';
		the_content()
	}
}
get_footer();

 ?>
```

## The_field
Example with "the_field": works but not ideal
```php
<?php
get_header();

if(have_posts()){
	while(have_posts()){
		the_post();
		echo '<h1>'.get_the_title().'</h1>';
		the_content();
		//HERE !
		the_field('my_text_field');
	}
}
get_footer();

 ?>
```


## Get_field
Better use get_field instead: we can use if and loops...
```php
<?php
get_header();

if(have_posts()){
	while(have_posts()){
		the_post();
		echo '<h1>'.get_the_title().'</h1>';
		the_content(); ?>
		//HERE !
		<h2><?php $my_field = get_field('my_text_field'); ?></h2>
		<?php if ($my_field) : ?>
				<h2><?php echo get_field('my_text_field'); ?></h2>
		<?php endif ?>
	}
}
get_footer();

 ?>
```

To debug, use var_dump() to print the variable and its type.