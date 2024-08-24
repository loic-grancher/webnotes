---
title: Data binding, single page nav, pagination, URL live update, save to session
sidebar:
    order: 26
---
## Binding a value and an input
We use the wire:model prop
```php
<input type="text" wire:model="taskInput" wire:keydown.enter="addTask">
```

## Single-page style navigation
I can use the `wire:navigate` attribute on my links to make them accessible without page reload.

```php
<a href="{{route("counter")}}" wire:navigate> Counter </a>
```

## Pagination
```php
class Home extends Component {

	use WithPAgination;
	public function entries(){
		return Entry::query()->paginate(perPage: 5)
	}
}
```

## Update url live
```php
class Home extends Component {
	#[Url]
	public $keyword;
}
```


## Save component data to session
This way the data will be persisted between pages

We can use the session attribute (**a comment**) to save something as a session.
```php
class Todos extends Component
{
	#[Session]
	public $total = 0
	
	#[On("update-total")]
	public function updateTotal($total)
	{
		$this->total = $total;
	}
}
```