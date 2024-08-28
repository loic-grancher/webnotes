---
title: Tips - Managing functions.php
---

To make this file more manageable, one way is to split it up into several php files. You can then include them to functions.php.

❗TIMBER should always be intialised in the original functions.php

Structure:
```
your-theme/
├── functions.php
├── inc/
│   ├── role_filter.php
│   └── template_functions.php
└── style.css
```

```php
//functions.php
<?php
	//Include role filter functions
	require get_template_directory() . '/inc/role_filter.php';
	//Include template functions
	require get_template_directory() . '/inc/template_functions.php';
```

