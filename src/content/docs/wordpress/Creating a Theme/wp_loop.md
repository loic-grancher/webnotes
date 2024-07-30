---
title: Wordpress Loop
sidebar:
    order: 6
---

## The core loop:
Used to display a list of articles:
```php
//index.php

//step 1: check if there are articles
<?php if (have_posts()):  ?>
	
	//step 2: iterate through articles
	<?php while (have_posts()): the_post();  ?>
		// Display content
	<?php endwhile  ?>
```

You can find the list of all the props you can call in the "content part" in the official doc. (next_post_link, the_category, the_author, the_content... )

## Full  example
```php
//index.php

<?php if (have_posts()):  ?>
	<ul>
		<?php while (have_posts()): the_post();  ?>
			<li>
				<a href="<?php the_permalink()  ?> "> 
					<?php the_title()  ?> - <?php the_author()  ?> 
				</a>
			</li>
		<?php endwhile  ?>
	</ul>

<?php else:  ?>
	<h1> Pas darticle </h1>
<?php endif ?>
```