---
title: Cheatsheet
---

## Lancement du projet:

### Créer un projet
```bash
symfony new mon_projet --webapp
```


### Lancer le serveur
```bash
symfony server:start  
```

- En tâche de fond:
```bash
symfony server:start -d
```

### Installer un package
```sh
composer install  
```


### Créer un controller
```bash
symfony console make:controller
```

### Créer une entité

```bash
## src/entity
symfony console make:entity
```

- Attributs = colonnes
- Types = PHP types
- Pour une relation choisir type: relation

### Créer les fonctions CRUD pour une entité
```sh
symfony console make:crud
```

## Base de données

#### Créer la base de données
Penser à éditer le fichier “.env.local” pour mettre les bons identifiants, et au besoin lancer la BDD (XAMPP)

```bash
symfony console doctrine:database:create
```

#### Créer une migration
```bash
symfony console make:migration
```
Version raccourcie:
```bash
symfony console m:m
```

#### Migrer les migrations en attente
```sh
symfony console doctrine:migrations:migrate
```
Version raccourcie:
```sh
symfony console d:m:m
```




### Ajouter des fixtures
##### Installer le package
```sh
symfony composer require orm-fixtures --dev
```

#### Charger les fixtures
```sh
symfony console doctrine:fixtures:load
```
Version raccourcie:
```sh
symfony console d:f:l
```

## Formulaires et Auth

### Créer un formulaire

```sh
symfony console make:form
```

### Créer un utilisateur

```sh
symfony console make:user
```

### Ajouter l'authentication

```sh
symfony console make:registration
```