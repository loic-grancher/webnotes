---
tags:
  - nuxt
title: Events
---
## Event tag
You use “@” instead of “on…” (in React). 

```js
//Example 
@click
@[event]
@submit.prevent
@keyup
```

You can also use v-on (but not as used)

## Emitting

### Simple case

We emit an event in the child (directly in template or using a function)
```vue
<!--Child component -->
<button @click="$emit('someEvent')"> Click me </button>
```

The parent then listens for the event
```vue
<!--Parent component -->
<ChildComponent @some-event="callback" />
```

The ".once" modifier is also supported 
```vue
<!--Parent component -->
<ChildComponent @some-event.once="callback" />
```


### With an argument:

 We pass the function, and the argument to the parent
```vue
<button @click="$emit('increaseBy', 1)"> Add 1 </button>
```

Then when we listen to the even in the parent, we can use an arrow function as the listener
```vue
<MyButton @increaseBy="(n) => count += n"/>
```


Or if the even handler is a method...
```vue
<MyButton @increaseBy="increaseCount"/>
```
...then the value will be passed as the first parameter of that method:
```ts
function increaseCount(n){
	count.value += n
}
```

