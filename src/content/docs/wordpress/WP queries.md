---
title: WP queries
---
# Method 1 (traditional)

```php
<div>
	<h4> Title </h4>
	<?php 
		//list out arguments
		$args= [
			'post_type' => 'post',
			'post_per_page' => -1,
			'meta_key' => size,
			'meta_value' => 'xl',
			'meta_compare' => '='
			];
		//execute the query	
		$query = new WP_Query($args);
		//loop through the posts
		while($query->have_posts()): $query->the_post();
	?>
	<div>
		//print title
		<h5><?php the_title(); ?></h5>
		//print custom field
		<p><?php the_field('price'); ?></p>
	</div>
</div>
		
```

# Method 2 (metaquery)

```php
<div>
	<h4> Title </h4>
	<?php 

		$args= [
			'post_type' => 'post',
			'post_per_page' => -1,
			//HERE
			'meta_query' => [
				[ 
					'key' => 'size',
					'value' => 'xl',
					'type' => 'CHAR / DEC / INT...',
					'compare' => '='
				],
				[ 
					'key' => 'price',
					'value' => 100,
					'type' => 'NUMBERIC',
					'compare' => '<'
				],
				
			]
			];
		
		//execute the query	
		$query = new WP_Query($args);
		//loop through the posts
		while($query->have_posts()): $query->the_post();
	?>
	<div>
		//print title
		<h5><?php the_title(); ?></h5>
		//print custom field
		<p><?php the_field('price'); ?></p>
	</div>
</div>
		
```

## Conditional queries
```php
//...
$args= [
			'post_type' => 'post',
			'post_per_page' => -1,
			
			'meta_query' => [
			
				//HERE IT IS
				'relation' => 'OR / AND(default)',
				[ 
					'key' => 'size',
					'value' => 'xl',
					'type' => 'CHAR / DEC / INT...',
					'compare' => '='
				],
				...

```

## Between 2 values

```php
//...
$args= [
			'post_type' => 'post',
			'post_per_page' => -1,
			
			'meta_query' => [
				[ 
					'key' => 'price',
					
					//HERE
					'value' => [50, 100],
					
					'type' => 'CHAR / DEC / INT...',
					
					//...AND HERE
					'compare' => 'BETWEEN'
				],
				...

```

## Nested queries
```php
//...
$args= [
			'post_type' => 'post',
			'post_per_page' => -1,
			
			'meta_query' => [
				[ 'relation' => 'OR / AND(default)',
					[
						...
					],
					[
						....
					]
					
				],
				...

```