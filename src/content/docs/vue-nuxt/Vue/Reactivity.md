---
tags:
  - nuxt
title: Reactivity
---

## Ref()

```js
import {ref} from vue
    
const x = ref() //similar to useState
```
    
ref is mandatory to make a variable reactive

To modify the ref, we need to access its value:
```js
x.value //⇒ can be modified
x.value.classList.add(“test”)
x.value.textContent = “Goodbye”
```
    

(not often used) We can then reference any part of the `<template>` using this ref

```vue
<p ref=”x” >Hello </p>
```

## v-model:

**Used to bind values (input for example)**  
If this input uses v-model and referenced the variable name, it will update name anytime it is changed. No need for further code.
```vue
<input type="text" v-model="name"/>
```

## Reactive

**REF is often recommended rather than reactive**

Similar to ref, however with ref, you need to access the “value” to change an object for example. 
```js
// With ref
// Mandatory for primitive types (string, int...)
const ninjaOne = ref({name: "mario", age: 30})
ninjaOne.value.age = 40

// With reactive
// For Object / Arrays
const ninjaTwo = reactive({name: "luigi", age: 35})
ninjaTwo.age ) 45
```

- REF retains their reactivity when used in other external functions
    

## Computed props

Using “computed”, it takes a function as an arg.

Used to calculate a value (return it) from another value, while keeping the reactive state.

```js
// We create a ref variable
const names = ref(["mario", "luigi", "yoshi", "bowser"]);

//We filter the names array using the value of the input and return it into a variable
const matchingNames = computed(() => {
	return names.value.filter((name) => name.includes(search.value));
})
```

## watch/watch-effect

- watch() is used to update a value whenever another value changes (similar to $: in Svelte). Not run on load.  
```js
watch(search() => {
	console.log("watch function ran")
})
```


- WatchEffect() runs initially when the component loads, then update whenever another value changes. It’s useful if you need to use the value of chat changes in the function
```js
watchEffect(() => {
	console.log("watchEffect function ran", search.value)
})
```


- To stop either watch or watchEffect, we store their return value into a variable  
```js
const stopWatch = watch(search, () => {
	console.log("watch function ran")
})

// If we call these functions that will stop the process
const handleClick = () => {
	stopWatch()
}
``` 