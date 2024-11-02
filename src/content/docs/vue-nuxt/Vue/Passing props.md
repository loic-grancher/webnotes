---
tags:
  - nuxt
title: Passing props to components
---

## Pass props to component

```vue
<PostList :post="post" />
```

## Accepting props from inside the component

Solution 1: using arrays
```ts
const props = defineProps(
	["post"]
)
```

Solution 2:  using objects
```ts
defineprops({
	title: String,
	likes: Number
})
```


## Getting a snippet of a text prop

```ts
const props = defineProps({
	post: Object
})

const snippet = computed(()=>{
	return props.post.body.substring(0,100) + "..."
})
```
