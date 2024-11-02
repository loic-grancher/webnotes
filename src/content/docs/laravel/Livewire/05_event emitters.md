---
title: Interaction between components (event emitters)
sidebar:
    order: 25
---
## Communication between components
To communicate between components, there is an event system. One component emits an event, and the other can pick up on it.

### Emitter component
```php
class Todos extends Component
{
	public $taskInput;
	public $todos = [
		'Task 1',
		'Task 2',
	];
	#HERE !!!
	public function mount()
	{
		$this->dispatch(event: "update-total", total:count($this->todos));
	}

	# We also trigger the event when using the add function
	public function add()
		{
			$this->todos[] = $this->pull(properties: 'taskInput');
			$this->dispatch(event: "update-total", total:count($this->todos));
		}

# ..rest of methods

}
```
### Receiver component
We add an attribute to listen to an event
```php
class Todos extends Component
{
	public $total = 0
	
	#[On("update-total")]
	public function updateTotal($total)
	{
		$this->total = $total;
	}
}
```

Other method with listener instead of attribute:
```php
class ShowPosts extends Component
{
	public $postCount;
	protected $listeners = ['postAdded' => 'incrementPostCount'];

	public function incrementPostCount()
	{ ... }
```
