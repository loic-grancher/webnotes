---
tags:
  - nuxt
title: Vue Router
---

## Presentation

set up the router (easiest from the beginning with vue-create)

- Inside SRC we get a router/index.js
    
- It lists the different routes we have in a routes array

- each routes has a name, path, corresponding component  
    These special “page” components are stored in src/views  
```js
const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/about",
		name: "About",
		component: About
	}
]   
```

    
- In our main component (App.vue), we can see our router component is injected  
    ![](https://lh7-us.googleusercontent.com/qzyXplemZ71K2B5sNJVQAPai3n9olMimYnus3zCiwbMp289mkFU6_T8mntWTKC3VjUhKCpAi9Q-STKyIh_jxGzG4qZdCjRQEVwfLFNVhiqIAi2JL7v6a0T7Q88kDSbBooahxdGV0MuqRM5iIRsgBwvU)
    
- It’s recommended to make folders for your views depending on their topic (Jobs, Products…)
```vue
<template>
	<Routerview />
</template>
```

## Linking pages

### Syntax:

We can link using the name of a route (recommended):  
```vue
<router-link :to="{name: 'About'}"> About </router-link>
```

We can also link using the path: 
```vue
<router-link to="/about"> About </router-link>
```

### Passing parameters (dynamic routes):

In the router file:  
```json
{
	path: "/jobs/:id",
	name: "JobDetails",
	component: JobDetails
}
```

In our component: we use useRoute() and then access the prop route.params.id (for example). If it’s a reactive value, we want to use the watch tool

```vue
<script setup>
import {useRoute} from "vue-router"
import { ref, watch} from "vue"

const route = useRoute()
const userData = ref()

//fetch the user info when the params change
watch(
	()=> route.params.id,
	async newId => {
	userData.vaulue = await fetchUser(newId)
	}
)
</script

```


In the link, we pass any param we need after the name of the route: 
```js
<router-link :to="{ name: "JobDetails", params:{id: job.id}}">
```

## Redirect and 404

### Redirect

In router/index.js  
The old path , then the new path
```json
//redirect
{
	path: "/all-jobs",
	redirect: "/jobs"
}
```

### 404 not found

We create a component to display when the page isn’t found, then:  
```json
//catchall 404
{
	path: "/:catchAll(.*)",
	name: "NotFound",
	component: NotFoud
}
```


## Back, next & redirect navigation

We need to use the router via useRouter()  
go(-x) is the number of steps back to go, go(x) is the number to go forwards

```ts
const router = useRouter()
```

```ts
const goBack = () => {
	router.go(-1);
}
```

To redirect, you use the router.push and pass an object with the name of the route and the params (if there are any)
```ts
router.push({name: "Home"})
```
