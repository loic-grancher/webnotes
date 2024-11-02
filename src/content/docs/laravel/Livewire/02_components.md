---
title: Components
sidebar:
    order: 22
---
## Create a component
Peut être utilisé comme un composant (ex: formulaire) ou comme une route. 

Créer un composant. Cela crée un controller qui s'occupe de la logique (app/Liwewire) et une view Blade (views/Livewire).
### Create in the root folder

```sh
php artisan livewire:make ComponentName
```

### Create in a sub-folder
```sh
php artisan make:livewire Post/Show
```
OR update namespace:
```php
//App/Livewire/Test/Decounter.php -- CAPITAL T
namespace App\Livewire\Test;
use Livewire\Component;

class Decounter extends Component
{
	public $count = 100;
	public function decrement()
	{
		$this->count--;
	}
}

//ressource/viewslivewire/test/decounter.blade.php -- lowercase t
<div>
	{{$count}}
	<button wire:click="decrement">-</button>
</div>

```

### Content of a component
Si on utilise les emplacement et noms par défauts, on peut simplificer le controller:
```php
//FROM THIS 
class Counter extends Component
{
	public function render()
	{
		return view('livewire.counter');
	}
}

//TO THIS 
class Counter extends Component
{

}
```

Je peux ensuite appeler ce composant dans mon template:
```php
//Method 1
<livewire:counter />

//Method 2
@livewire("counter")
```

## Passing data to a component
Dans un composant livewire, tout ce qui sera en public sera visible dans la vue:
```php
//Ceci (controller)...
public $count = 0;

//...sera visible dans la vue via
{{ $count }}
```

## Create a method for the component
On pourra ensuite créer des méthodes dans le composant:
```php
class Counter extends Component
{
	public $count = 2;
	  
	public function increment()
	{
		$this->count++;
	}
}
```

Et les appeler dans le template Blade, via l'event:
`wire:click` ou change, drag, play...
```php
<div>
	{{$count}}

	<button wire:click="increment">ADD</button>
</div>
```

**For every click, a fetch is done so the backend is updated.**

