---
title: Theme.json
---

Easy JSON edit : https://wpturbo.dev/generators/theme-json/

Dans même répertoire que index.php

config pour les réglages de gutembers et FSE

Permet de mettre des styles par défaut pour tous les blocs

Au minimum:
```json
{
	"version": 2
}
```

Pour une autocomplete facile, je peux importer un schéma (récupéré sur wp.org)
```json
{
	"$schema": "https://schemas.wp.org/wp/6.4/theme.json",
	"version": 2
}
```

## Settings

Réglages de marge, typographie ...

- Réglages généraux
```json
{
	"settings": { 
	//réglages globaux
	}
}
```
- Réglages de blocs
```json
{
	"settings": { 
		"blocks": {
		//réglages de block
		}
	}
}
```

Exemple de réglage global puis pour un paragraphe :
```json
{
    "settings": {
        "color": {
            "palette": [
                {
                    "name": "Black",
                    "slug": "black",
                    "color": "#000000"
                },
            ]
        },
        "blocks": {
            "core/paragraph": {
                "color": {
                    "palette": [
                        {
                            "name": "Red",
                            "slug": "red",
                            "color": "#ff0000"
                        }
                    ]
                }
            }
        }
    }
}
```

Le système générera automatiquement du CSS pour cet élément:
```css
body {
    --wp--preset--color--black: #000000;
}

.wp-block-paragraph {
    --wp--preset--color--red: #ff0000;
}
```

## Appearance tools
Si réglé sur "true", active des options d'éditions prédéfinies.

```json
{
	"settings": { 
		"appearanceTools":true
	}
}
```

## Bloquer des réglages

```json
{
	"settings": { 
		"color":{
			"defaultPalette": false,
			"custom": false,
			"palette": [
			{
				"color": "#000000",
				"name": "Black",
				"slug": "black"
			},
			{
				"color": "#ffffff",
				"name": "White",
				"slug": "white"
			},
		}
	}
}
```

Même procédé pour les tailles, polices, marges...

## Layouts
- Permet de choisir la largeur du conteneur. 3 tailles par défaut. 
- ContentSize (par défaut)
- Wdesize (valeur large, seulement si disponible selon largeur de page)
- Full-width (100%
```json
{
	"settings": { 
		"layout":{
			"contentSize": '995px',
			"wideSize": "1398px,
		}
	}
}
```

Pour modifier le défaut pour un template de type de page (ex: index)
editor / index / barre droite / block / décocher "inner blocks use content size"

On peut aussi créer d'autres tailles custom

## Style
- Dérivés de theme.json, définit les styles par défaut.
- Toujours dans setting.json, partie "styles"
- On a accès à tous les blocs différents.
- 
### Styles de base

```json
{
    "styles": {
        "border": {
            ...
        },
        "filter": {
            "duotone": "value"
        },
        "color": {
            "background": "value",
            "gradient": "value",
            "text": "value"
        },
        "spacing": {
            "blockGap": "value",
            "margin": {},
            "padding": {}
        },
        "typography": {}
    },
    ...
}
```

### Pour les éléments:
```json
{
    "styles": {
        ...
        "link": {
                "border": {},
                "color": {},
                "spacing": {},
                "typography": {}
            },
            "h1": {},
            "h2": {},
            "h3": {},
            "h4": {},
            "h5": {},
            "h6": {}
        }
    },
    ...
}
```

### Variables
Généralement, on reprendra les variables de la partie settings
```json
{
    "styles": {
        "color": {
            "background": "var(--wp--preset--color--black)",
            "text": "var(--wp--preset--color--white)"
        }
    }
}
```

### Fonts
Avec la font API, je crée un dossier "fonts" dans le même niveau que "plugins" et "themes"

Je pourrai alors importer des polices depuis mon interface gutenberg

💡Astuce: si j'importe mes polices dans gutenberg, Dans apparence / editor je peux exporter mon thème depuis la barre à droite.
Je colle le contenu de mon thème dans VS code, et les polices seront inclues dedans

Fontsize fluid
```json
"typography": {
   "dropCap": false,
   "fluid": true,
   "fontFamilies": [
    {...},
   "fontSizes": [
    {
     "fluid": {
      "min": "0.875rem",
      "max": "1rem"
     },
     "size": "1rem",
     "slug": "small"
    },
    ...
   ]
```
