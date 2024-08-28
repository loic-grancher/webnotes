---
title: Tips - Role-based access
---

## Block one page

To restrict access to certain pages/content of the website, you can use a functions like the following:
```php
//functions.php
function restrict_specific_page_access() {  
	//first check if user is logged in
	if (!is_user_logged_in()) {
		wp_redirect(wp_login_url());
		exit;
	}
	
	//check if user has admin authorisation and list the forbidden pages
	if (!current_user_can('administrator') && is_page(array('about'))) {
		wp_redirect("/forbidden");
		exit;
	}
}
//add the action to wp after page load
add_action('template_redirect', 'restrict_specific_page_access');

```

## Block a list of routes
```php
//functions.php
// functions.php
function restrict_specific_page_access() {  

    // IF USER IS NOT ADMIN
    if (!current_user_can('administrator')) {
        // if (get_url) contains at least one instance of "/products"
        if (strpos($_SERVER['REQUEST_URI'], '/products') !== false) {
        //redirect to forbidden page
            wp_redirect("/forbidden");
            exit;
        }
    }
}

// Add the action to wp after page load
add_action('template_redirect', 'restrict_specific_page_access');

```

## Hide items based on roles (timber):
```php
//index.twig
//using the Twig method
{% if user.can('administrator') %}

	<a class="navbar-item" href="/about">
		About
	</a>

{% endif %}
```