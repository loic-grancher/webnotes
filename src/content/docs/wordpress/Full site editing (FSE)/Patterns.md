---
title: Patterns
---

Des bloc pré-assemblés (comme des composants react) prêts à être utilisés.
Ce sont des fichiers PHP avec 2 commentaires obligatoires (title/slug)
Attention, le code PHP dans les template ne sera pas rendu

- On crée un folder "patterns" dans my-theme (même niveau que index.php)
- Je peux créer un pattern dans l'editor, je le copie
- Je crée un fichier 'monPattern.php'
- J'ajoute mes commentaires php obligatoires et je colle le code obtenu

```php
//Inserter permet d'ajouter le pattern comme bloc ou non dans la liste

<?php
/**
 * Title: Hidden 404
 * Slug: trio/hidden-404
 * Inserter: no
 */
?>
```

## Categories
On peut ranger nos patterns dans des catégories pour les retrouver plus facilement

```php
if ( function_exists( 'register_block_pattern_category' ) ) {
    register_block_pattern_category(
      'mycategory',
      array(
            'label' => __( 'My Category', 'text-domain' ),
            'description' => __( 'Theme and more', 'text-domain' ),
       )
   );
}
```

## Pattern directory
Liste de pattern déjà créés, mais mauvaise qualité souvent. Pour le désactiver
```php
add_filter( 'should_load_remote_block_patterns', '__return_false' );
```


## Verrouiller un pattern
Et bloquer dévérouillage
```php
add_filter(
 'block_editor_settings_all',
 static function( $settings, $context ) {
  // Allow for the Editor role and above.
  $settings['canLockBlocks'] = current_user_can( 'delete_others_posts' );

  // Only enable for specific user(s).
  $user = wp_get_current_user();
  if ( in_array( $user->user_email, array( 'user@example.com' ), true ) ) {
   $settings['canLockBlocks'] = false;
  }

  // Disable for posts/pages.
  if ( $context->post && $context->post->post_type === 'page' ) {
   $settings['canLockBlocks'] = false;
  }

  return $settings;
 },
 10,
 2
);
```
