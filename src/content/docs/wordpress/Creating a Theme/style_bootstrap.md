---
title: Style & Bootstrap
sidebar:
    order: 3
---

## Bootstrap/CSS setup

For more info on "actions" used in the code snippets, see "WP actions"

### Add a regular CSS sheet

```php
//functions.php

//Create function to call BS
	function montheme_register_assets(){
	
		//Solution 1 for custom CSS file
		wp_enqueue_style( 'my_style', get_template_directory_uri() . '/assets/css/global.css');
	
		//Solution 2 for default style.css
		wp_enqueue_style( 'my_style', get_stylesheet_uri() );
		}

// Call your action
add_action("wp_enqueue_scripts", "montheme_register_assets");

```

### Load Bootstrap CSS via CDN
You could copy-paste the CDN into your header, but this is not good practices.
We"ll use "register style wp"

wp_enqueue_script allows to define scripts awaiting to be executed

```php
//functions.php

//Create function to call BS
	function montheme_register_assets(){
		//create your style (via CDN or css file)
		wp_register_style("bootstrap", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
		//Load style
		wp_enqueue_style("bootstrap");
	}

// Call your action
add_action("wp_enqueue_scripts", "montheme_register_assets");

```
### Load Bootstrap JS via CDN

```php
//functions.php
	function montheme_register_assets(){
		wp_register_style("bootstrap", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
		
		//HERE !!! [] = no dependencies, false=no version, true=load in footer
		wp_register_script("bootstrap", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js", [], false, true);
		
		wp_enqueue_style("bootstrap");
		//HERE !!!
		wp_enqueue_script("bootstrap");
	}

add_action("wp_enqueue_scripts", "montheme_register_assets");

```
### Bonus: put the body of the page into a container
```php
//header.php
...
	<?php wp_head(); ?>
	</head>
	
	<body>
		<div class="container">
```

```php
//footer.php
		</div>
		<?php wp_footer() ?>
	</body>
</html>
```

### Notes about TailwindCss and Scss

- You can use tailwind by installind it with NodeJS. 
- While building your style, you need to keep the build running so the CSS stylesheet is built as you go
1. Update your `package.json` to include a script to build your Tailwind CSS. Add the following script in the `scripts` section:
```json
//package.json
"scripts": { "build:css": "npx tailwindcss -i ./src/styles.css -o ./assets/css/tailwind.css --watch" }
```

2.  To run the build script: This will generate a `tailwind.css` file in the `assets/css` directory.
   `npm run build:css`

- Now enqueue your style in function.php so it is taken into account by WP.
```php
function enqueue_tailwind_styles() {
    wp_enqueue_style('tailwind', get_template_directory_uri() . '/assets/css/tailwind.css');
}
add_action('wp_enqueue_scripts', 'enqueue_tailwind_styles');

```
