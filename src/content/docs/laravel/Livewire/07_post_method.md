---
title: Post method example
sidebar:
    order: 27
---
## Blade component
```php
//todo.blade.php
<div>
	<input type="text" wire:model="taskInput" wire:keydown.enter="addTask" >
	<button wire:click="addTask">Add</button>

	<ul>
		@foreach($todos as $todo)
			<li>{{ $todo }}</li>
		@endforeach
	</ul>

</div>
```

## Php component
Note: "pull" gets the selected value and empties the field.
```php
//Todo.php
class Todo extends Component
{
	public $taskInput;
	public $todos = [
		'Task 1',
		'Task 2',
	];

	public function addTask(){
		$this->todos[] = $this->pull(properties: 'taskInput');
	}
}
```
## Adding validation
We add an attribute (**with a comment**) and then we can use it when calling our method
```php
//Todo.php
class Todo extends Component
{
	#[Validate("required | string | min:6 | max:255| ...")]
	public $taskInput;
	public $todos = [
		'Task 1',
		'Task 2',
	];

	public function addTask(){
	
		$this->validate();
		
		$this->todos[] = $this->pull(properties: 'taskInput');
	}
}
```

## Display validation error (frontend)
```php
//todo.blade.php
<div>
	<input type="text" wire:model="taskInput" wire:keydown.enter="addTask" >
	<button wire:click="addTask">Add</button>
	
	<div>
		@error("taskInput") <span class="error"> {{$message}}<span> @enderror
	<div>

#rest of my component

</div>
```