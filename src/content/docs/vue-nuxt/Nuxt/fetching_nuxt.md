---
tags:
  - nuxt
title: Fetching data in Nuxt (server)
---
- Nuxt can fire the api call from the server OR the browser
- However not all code can be used in both server and browser (the window object is only browser)

## Server side using useFetch:
We use the useFetch composable (only from top level):
```vue
<script setup >
	//We rename our result "data" in "product" for easier use
	const { data: products } = await useFetch('https://...')
</script>
```
