---
title: Easyadmin
---

## Install bundle
```sh
composer require easycorp/easyadmin-bundle
```

## Create dashboard

```sh
symfony console make:admin:dashboard
```

OK to all

## Créer les CRUD controller pour l'admin
```sh
symfony console make:admin:crud
```
We get the list of entity, add them one by one

## Editing the dashboard controller
```php
class DashboardController extends AbstractDashboardController
{
#[Route('/admin', name: 'admin')]
public function index(): Response
{

	// On définit la page d'accueil
	$adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
	
	//On définit quel contrôlleur s'affiche en premier par défaut (ici book)
	return $this->redirect($adminUrlGenerator
	->setController(BookCrudController::class)
	->generateUrl());

}

//Personnalisation dashboard (langues, icones, noms, couleurs...)
public function configureDashboard(): Dashboard
{

	return Dashboard::new()
	->setTitle('Symfony Test');
}

  
//On ajoute nos différentes catégories
public function configureMenuItems(): iterable
{
	//Créé menu pour les livres
	yield MenuItem::linkToCrud('Books', 'fas fa-book', Book::class);
	//Créé menu pour les auteurs
	yield MenuItem::linkToCrud('Authors', 'fas fa-user', Author::class);
}

}
```

## Define the fields when adding/updating

### Default behaviour
By default, we get all the fields EXCEPT relations.
```php
class BookCrudController extends AbstractCrudController
{
	public static function getEntityFqcn(): string
	{
		return Book::class;
	}
}
```

### Custom fields & relations
To display relations, you need to enable all the fields manually.

#### Step 1: Display string for each entity
Inside my entity I need to enable a string representation of this entity:
```php
//MyEntity.php

//	public function setAuthor(?Author $author): static
//	{
//		$this->author = $author;
//		return $this;
//	}

  
public function __toString(): string
{
	return $this->title;
}
```

#### Step2: add the fields to your dash controller
```php
//BookCrudController.php
...
	return Book::class;
}

public function configureFields(string $pageName): iterable
{
	return [
	
	IdField::new('id')->hideOnForm(),
	TextField::new('title'),
	TextField::new('year'),	
	TextEditorField::new('description'),	
	TextField::new('coverUrl'),	
	//HERE we add the associated field, it will be displayed by its associated string
	AssociationField::new('author')	
	];
}

```

## Note with  TexEditorField
To display the content without the surrounding "div", use the raw tag
```html
{{book.description | raw }}
```
You can also use TextareaField