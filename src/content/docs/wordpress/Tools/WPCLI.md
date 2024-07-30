---
title: WP CLI
---

Un outil en ligne de commande pour piloter des appli WP.

Exemple:
- Mise à jour plugin
- Mise à jour corps
- Régénération migrations
- Régénération miniatures
- ...

## Installation
Installation système ou locale

On télécharge un fichier wp-cli.phar
```sh
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
```
On peut l'ajouter au path pour y accéder partout dans le système:

```sh
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp
```


On vérifie le foncitonnement:
```sh
php wp-cli.phar --info
```
## Utiliser

- on crée un fichier wp-cli.yml (déjà créé si on utilise bedrock)
```yml
//wp-cli.yml
path : web/wp
server:
	docroot: web
```
- infos de version...
```sh
php wp-cli.phar --info
```

## Commandes

https://developer.wordpress.org/cli/commands/

- Changer mdp admin
```sh
php wp-cli.phar user update admin --user_pass="myPassword"
```

- Modifier et exporter BDD
```sh
php wp-cli.phar search-replace "http://localhost:8000", "http://monsite.com" --export="dump.sql"
```
Attention les tables créés par des plugin ne seront pas pris en compte (ex Gravity form)

- Changer thème ou plugin
  Ex: activer plugin
```sh
php wp-cli.phar plugin-activate wp-migrate-db
```
