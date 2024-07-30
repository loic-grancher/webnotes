---
title: Bedrock
---

## Installation WP par défaut

1. On récupère le zip
2. On dézippe
3. On configure

## Pourquoi alternatives ?
Avantages: 
- WP devient une dépendance du projet, on peut le réinstaller avec une commande
- contrôle de la version et des mises à jours
- mettre à jour WP et les plugin directement
- pairable avec les librairies composer

Bedrock:
- Config par environnement
- Structure similaire à symfony...

Wordplate:
- config plus "à plat"
- gère la partie assets avec webpack (moins de config)

## Créer le projet

```sh
composer create-project roots/bedrock projectName
```

## Structure et config

- config / environnement: définit les réglages par env (dev ou prod/staging)
- vendor: dépendances composer
- web: dossier racine
- wp : install wp classique
- app: fichiers de l'application (thème plugins...)
- .env: variables pour faire fonctionner le projet
-  On peut utiliser GIt et les fichiers par défaut seront ignorés

### Fichier env

#### Database variables
Peuvent être définies à la suite ou sous forme d'une `DATABASE_URL` (ex: `mysql://user:password@127.0.0.1:3306/db_name`) 

- DB_NAME` - Database name
- DB_USER` - Database user
- DB_PASSWORD` - Database password
- DB_HOST` - Database host


#### WP variables
- WP_ENV` - Set to environment (`development`, `staging`, `production`)
- WP_HOME` - Full URL to WordPress home (https://example.com
- WP_SITEURL` - Full URL to WordPress including subdirectory (https://example.com/wp)

#### Auth variables
Peuvent être générées automatiquement :
1. Via WP cli: https://github.com/aaemnnosttv/wp-cli-dotenv-command
2. Via un outil WP salts generator: https://roots.io/salts.html

- AUTH_KEY
- SECURE_AUTH_KEY
- LOGGED_IN_KEY
- NONCE_KEY
- AUTH_SALT
- SECURE_AUTH_SALT
- LOGGED_IN_SALT
- NONCE_SALT`

- Add theme(s) in `web/app/themes/` as you would for a normal WordPress site

- Set the document root on your webserver to Bedrock's `web` folder: `/path/to/site/web/`
- Access WordPress admin at `https://example.com/wp/wp-admin/`

### Exemple pour local dev

```yaml
DB_NAME="wordpress"
DB_USER= "root"
DB_PASSWORD="root"
## DB_HOST= "localhost"
        
WP_ENV="development"
WP_HOME="http://localhost:8000"
WP_SITEURL="${WP_HOME}/wp
WP_DEBUG_LOG=/path/to/debug.log

## A remplir via https://roots.io/salts.html
AUTH_KEY=...
SECURE_AUTH_KEY=...
LOGGED_IN_KEY=...
NONCE_KEY=...
AUTH_SALT=...
SECURE_AUTH_SALT=...
LOGGED_IN_SALT=...
NONCE_SALT=...
```
## Lancer serveur
-t web car le dossier de nos fichiers est ./web (attention S majuscule)
```sh
php -S localhost:8000 -t web
```

Je créée ma base de données (via SQL ou cli):
```sh
mysql -uroot -proot -e "CREATE DATABASE wordpress;"
```

Configurer l'installation manuelle

Note: l'admin sera à `http://monsite/wp/` et pas à `/admin` 

## Installer var-dump pour débug
```sh
composer require --dev symfony/var-dumper
```

## Mettre à jour WP
```sh
composer update ma-dependance
```


## Installer un plugin via composer
Stockés dans le repo wpackagist

On peut récupérer un plugin sur le site WordPressPackagist et installer en cli. Installés dans app/plugins

⁉️ Si le plugin est difficile à trouver, aller sur la page officielle du plugin wp, "télécharger gratuitement", et on aura le nom du plugin dans la barre URL

⚠️ PENSER A ACTIVER L'EXTENSION ENSUITE
Ex:
```sh
composer require wpackagist-plugin/wp-migrate-db
```
Permet de controller les versions installées. 



Supprimer le plugin
```
composer remove wpackagist-plugin/wp-migrate-db
```