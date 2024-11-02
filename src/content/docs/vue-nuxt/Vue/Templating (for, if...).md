---
tags:
  - nuxt
title: Templating (for, if...)
---
## v-for loops

Similar to jinja syntax
```vue
<div v-for="name in names" :key="name">
	{{name}}
</div>
```


## v-if conditional

v-if() / v-if-else() / v-else()

if it very useful for hiding and showing elements or components based on conditions.
Here we show only the posts with showPosts = true
```vue
<PostList :posts="post" v-if="showPosts" />
```


We create our bool variable, and assign a button to change its value  
```ts
const showPOsts = ref(true)
```

```vue
<button @click="showPosts = !showPosts"> Toggle visibility </button>

```