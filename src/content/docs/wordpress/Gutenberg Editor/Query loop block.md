---
title: Creating a query loop block
---

Dans gutenberg / blocks / themes on trouve le query loop block

Pour customiser ce block, il faudra modifier le JS de gutemberg lui-même.
# Préparer gutenberg

```php
// childtheme/function.php

//Enqueue Editor assets.
function example_enqueue_editor_assets()
{
  wp_enqueue_script('example-editor-scripts',

   get_template_directory_uri() . '/editor-scripts.js',
   //Si theme enfant: get_stylesheet_directory_uri()
   ['wp-blocks', 'wp-dom-ready']
  );
}

//We load the js file in the gutenberg editor
add_action('enqueue_block_editor_assets', 'example_enqueue_editor_assets');
```

# Créer une variation du bloc
On étend le query loop et on ajoute des choses. On va devoir créer un namespace spécifique (VARIATION NAME).
Possibilité d'options: https://developer.wordpress.org/news/2023/08/29/an-introduction-to-block-variations/

```js
						//nom thème / nom block
const VARIATION_NAME = 'wp-perf/featured-post';

wp.blocks.registerBlockVariation('core/query', {
  name: VARIATION_NAME,
  title: 'Featured Post',
  description: 'Display a featured post',
  icon: 'admin-post',
  category: 'widgets',
  //facultatif
  isActive: ({ namespace, query }) => {
    return namespace === VARIATION_NAME && query.postType === 'post'
  },
  //le namespace sera filtré dans la fonction qui modifie la query
  attributes: {
    namespace: VARIATION_NAME
  }
})
```

# Filtrer la query

Dans un premier temps, on va utiliser le filtre « pre_render_block » pour attraper le bloc qui comporte notre namespace.

```php
add_filter('pre_render_block',
function ($prerender, $block) {
  // trouve le block s'il existe, par son namespace
  if ($block['attrs'] && array_key_exists('namespace', $block['attrs']) &&
      $block['attrs']['namespace'] === 'wp-perf/featured-post') {
	// si trouvé, ajoute un filtre
      add_filter('query_loop_block_query_vars',
        'my_filter_page_query',
      );
  }
},1,2);
```

Fonction filtre:
```php
function my_filter_page_query($query)
{
  $query['post_type'] = 'my_cpt';
  $query['posts_per_page'] = -1;

  // order by meta menu_order
  $query['orderby'] = [
    'meta_value_num' => 'ASC',
    'meta_value' => 'DESC',
  ];
// il faut supprimer le filtre pour ne pas executer sur les autres blocs de la page
  remove_filter('query_loop_block_query_vars',
   'my_filter_page_query', 10, 1);

  return $query;
}
```