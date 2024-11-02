---
tags:
  - nuxt
title: Lifecycle hooks (mount...)
---


# Fire function on mount:
```js
onMounted(() => {
  // Function to execute when the component is mounted
	console.log('Component mounted');
});
```

# When component is updated:
```js
onUpdated()
```

# When component unmounts :
```js
onUnmounted()
```

# Others:
```js
onBeforeUpdate(), 
onBeforeUnmount(), 
onErrorCaptured() 
…
