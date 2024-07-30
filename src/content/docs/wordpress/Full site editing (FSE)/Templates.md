---
title: Templates
---

100% HTML, différent des pattern
Ils suivent la hierarchie de WP, mais on utilise html au lieu de php. Ils doivent rester minimalistes.

Pour connaître le nom de chaque "code html" (paragraph, headings...), je peux aller voir dans l'affichage "code" de l'éditeur.

Exemple de template index.html
```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main"} -->
<main class="wp-block-group">
    <!-- wp:group {"layout":{"type":"constrained"}} -->
    <div class="wp-block-group">

        <!-- wp:pattern {"slug":"prefix/hero"} /-->

        <!-- wp:post-title {"level":1} /-->
    </div>
    <!-- /wp:group -->

    <!-- wp:post-content {"layout":{"type":"constrained"}} /-->

    <!-- wp:template-part {"slug":"comments","tagName":"section"} /-->

</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

## Intégrer des patterns, blocks ou template parks
Pattern
```html
<!-- wp:pattern {"slug":"prefix/hero"} /-->
```
Template part
```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->
```

Block
```html
<!-- wp:gravityforms/form {"formId":"2","title":false,"description":false,"ajax":true,"inputPrimaryColor":"#204ce5"} /-->
```
