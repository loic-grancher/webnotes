---
title: Configurer le FSE
sidebar:
    order: 1
---

Pour limiter l'utilisation du PHP 

FSE approche plutôt par bloc que par page
Le thème est enregistré en fichier plutôt que dans la bdd, mais à toute modif, c'est ma version BDD qui sera pris en compte à nouveau (à changer, voir editertheme/method2)

## Activer FSE
En théorie, un thème classique nécessitte juste idex.php + style.css
Pour passer en FSE, on rajouter un dossier "template" avec "index.html"

Changement, dans les thèmes, on a "editor" mais plus customise


## Editer theme
### Methode 1: visual
Dans "theme/ editor" j'uilise mon interface visuelle pour créer mes éléments (template, parts (header, footer...) et patterns)

### Methode 2: code editor
Je crée mon thème "from scratch" en code. Je peux m'aider en partant d'un thème comme WP2024. 

Par exemple j'ouvre gutenberg en mode code et je copie le code généré lorsque j'ajoute 1 bloc. Dans ce cas je ne sauvegarde pas directement dans l'editor.

Chaque élément correspond à un bloc, il faut donc utliser obligatoirement des bloc. Le code HTML classique sera ignoré.

Les différents blocs sont marqués par des commentaires dans le html:
```html
<!-- wp:paragraph -->
<p>lorem ipsum </p>
<!-- /wp:paragraph -->
```

Dans editor / manage all templates; je vois "customised" (côté droit) => clear customised, pour laisser le fichier vscode prendre le relai.
