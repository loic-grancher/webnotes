---
title: Template Parts
---
## Créer
Créer dossier my-theme/parts

Dedans créer des fichiers html (ex: header.html)

J'encadre avec un wp:group 
Puis j'ajoute mes éléments, toujours avec mes commentaires WP pour qu'ils soient reconnus comme blocs, sauf l'élément extérieur du groupe (ici header)

Ici j'aurais pu remplacer "header" par "div"
Note: j'ai besoins de {}. tagNAme et className ne sont pas obligatoires. 
C'est le nom du fichier qui compte.

```html
<!-- wp:group {"tagName":"header","className":"site-header"} -->

<header class="wp-block-group site-header">
	
	<!-- wp:heading -->
	<h2>This is my header</h2>
	<!-- /wp:heading -->
	
</header>

<!-- /wp:group -->
```


## Utiliser

```html
<!-- wp:template-part {"slug":"header"} /-->
```
