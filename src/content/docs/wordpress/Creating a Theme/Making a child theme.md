---
title: Creating a child theme
sidebar:
    order: 1
---
It allows to make a new theme that overrides the current theme. In that case, if the parent theme gets updated, the changes won't be canceled. 

1. Go to wp-content/themes
2. New folder (ex: kadence_child)
3. add a style.css file inside
4. Coller et adapter le code suivant
```css
   /*
Theme Name:   Twenty Twenty-One Child
Theme URI:    https://wordpress.org/themes/twentytwentyone/
Description:  Twenty Twenty-One child theme
Author:       WordPress.org
Author URI:   https://wordpress.org/
Template:     twentytwentyone
Version:      1.0.0
Text Domain:  twentytwentyonechild
*/
```
5. Créer un fichier functions.php (au pluriel) et ajouter le code suivant:
```php
<?php  

add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

function my_theme_enqueue_styles() {
    $parenthandle = 'twenty-twenty-one-style'; // This is 'twenty-twenty-one-style' for the Twenty Twenty-one theme.
    $theme = wp_get_theme();
    wp_enqueue_style( $parenthandle, get_template_directory_uri() . '/style.css',
        array(), // if the parent theme code has a dependency, copy it to here
        $theme->parent()->get('Version')
    );
    wp_enqueue_style( 'custom-style', get_stylesheet_uri(),
        array( $parenthandle ),
        $theme->get('Version') // this only works if you have Version in the style header

    );

}
```
6. Alternative: utiliser le plugin Child Theme Configurator