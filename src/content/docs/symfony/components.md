---
title: Components
---
## Install

```sh
composer require symfony/ux-twig-component
```

## Creating a component
A component is made of a class + a template

### Step 1: creating the class

```php
// src/Twig/Components/Card.php
namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
#[AsTwigComponent]
class Card
{
}

```
This class can technically live anywhere, but in practice, you'll put it somewhere under the namespace configured in config/packages/twig_component.yaml. 

**Name of components:**
App/Twig/Components/Alert  ->	Alert
App/Twig/Components/Button/Primary 	-> Button:Primary


### Step 2: creating the template
By default, templates live in `templates/components/{component_name}.html.twig`.
The name of the component is the same as the name of the class

```php
// templates/components/Alert.html.twig

<div class="alert alert-success">
    <h1> This is my card! </h1>
</div>

```

Now you can call the component: 
```php
{{ component('Alert') }}
```


## Passing props
We add items to the class to enable props to be passed:

```php
// src/Twig/Components/Card.php

#[AsTwigComponent]
class Card{
	//Message text prop
	public string $message;
	//Size number prop
	public string $size;
  }

```

We add our data to the twig template:
```php
<div class="size-{{ size }}">
    {{ message }}
</div>
```

Now we render it on our page:
```php
{{ component('Card', {
    size: 3,
    message: 'My message'
}) }}

```

