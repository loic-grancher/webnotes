---
tags:
  - nuxt
title: Routing (Nuxt)
---

# Creating page-bases routes
- Create in the route a "pages" folder within which we'll create our pages
  
- Delete the app.vue component, or insert the `<Nuxtpage/>` component
  
- Create your page in the "pages" dir
  
- The structure will follow the structure of your page directory. 
  If you use "idex" it will lead to `/`
  Ex: pages/products/hello will be rendered at the address `localhost:3000/products/hello`
   Ex: pages/products/idex will be rendered at the address `localhost:3000/products/

- Technically `pages/products.vue` and `pages/products/index.vue` share the same url

# Dynamic routes

We can create `pages/products/[id].vue` so the route will be rendered with a "id".

To use the url parameter:
```vue
<script setup>
	const { id } = useRoute().params
</script>

<template>
	<h1>Product {{ id }}</h1>
</template>


```