---
title: Lifecycle hooks
sidebar:
    order: 24
---
Like React/vue, livewire has some lifecycle hooks to do an action at certain points (mount, updated...)

Examples:
- mount()
- updated()
- rendered()
- ...

Example:
```php
use Livewire\Component; 

class ShowPost extends Component
{
	public $title;
	public $content;
	
	public function mount($post)
	{
		$this->title = $post->title;
		$this->content = $post->content;
	} 
	...
}
```

You can also execute some frontend JS on certain events (see doc)
