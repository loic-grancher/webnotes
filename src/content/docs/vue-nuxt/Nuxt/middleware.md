---
title: Middleware
---

Middleware is useful to implement logic when navigating between pages. Useful for route guards for example (via cookies)

## useCookie composable
```js
const cookie = useCookie(name, options)
```
Will look for a cookie called "name", if not it will create it and fill it with a random value. We can then update the value of the cookie.

Example:
```js
const cookie = useCookie('user')

//The value of the cookie will be an object here
user.value = {
	username: username, 
	role: "user"
}
```

## Inline Middleware

Here we create a metadata on our page called "middleware". It consists in a function that executes before the page loads.
to/from: the page the user logs to/from
```js
definePageMeta({
	middleware: function (to, from) {
		const user = useCookie('user')
		
		// reset the user cookie value
		user.value = null;
		
		// redirect user to login page
		return navigateTo('/login')
	}
})
```

### Route guards 
Same approach as previously. This is not a proper auth system, only some frontend logic (cookie not encrypted)
```js
const user = useCookie('user')

definePageMeta({
	middleware: function (to, from) {

	// create a "authenticated cookie"
		const authenticated = useCookie('user')
		//if cookie has no value, redirect to login
		if (!authenticated.value) {
			return navigateTo('/login')
		}
}
})

```

## Named middleware

When we want to reuse code for a middleware, we can store it in a specific file.
We create a "middleware" folder with a file like auth.ts

Nuxt uses a special wrapper function for middleware.
```ts
//auth.ts
export default defineNuxtRouteMiddleware((to,from)) => {

	const authenticated = useCookie('user')
		if (!authenticated.value) {
			return navigateTo('/login')
		}
		
}
```

Then in our vue page:
```vue
//index.vue
<script setup>
definePageMeta({
//nuxt will look inside the middleware folder for an "auth.js/ts" file.
	middleware: ["auth"]
})
</script>
```

## Chaining middleware
We can pass several middleware in the `middleware: ["auth"]` code. They will be run one after the other in the order that is specified.

```vue
//admin.vue
<script setup>
definePageMeta({
//FIRST I check if the user is registered, THEN I see if it's an admin
	middleware: ["auth", "admin"]
})
</script>
```

## Managing error pages

### Nuxt showError function
Nuxt has its own special function to show an error page. 
We can pass a couple of options to that function.
```ts
//auth.ts
export default defineNuxtRouteMiddleware((to,from)) => {
	const user = useCookie<User>('user')
	
		if (user.value.role !== "admin") {
			throw showError({
				statusCode: 403,
				statusMessage: "You are not allowed to view this page"
			})
		}
		
}
```

### Create a custom error page
We create an "error.vue" page in the root of our app.
```vue
//error.vue
<script setup lang="ts">
  import type { NuxtError } from '#app'

	//This page takes an error object based on NuxtError
  const props = defineProps({
    error: Object as () => NuxtError
  })
</script>

<template>
  <NuxtLayout>
    <div >
      <h2>{{ error.statusCode }}</h2>
      <p>{{ error.statusMessage }}</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </NuxtLayout>
</template>

```

## Global middleware
If I create a middleware I need for all pages, I could call it on every page, but it's not the easiest way.

For that we change the middleware name: `auth.ts` => `auth.global.ts`
We then don't need to call them on  individual page

WARNING:
- Global middleware always run first
- All global middleware run in alphabetical order, so you might need to adjust the names accordingly

Adjusting our redirect so it cancels if already routing to login page:
```ts
//auth.ts
export default defineNuxtRouteMiddleware((to,from)) => {
	const authenticated = useCookie('user')
		//HERE !!!
		if (!authenticated.value && to.path !=="/login") {
			return navigateTo('/login')
		}
		// if user is auth and we"re trying to get to login, redirect to home
		if (!authenticated.value && to.path ==="/login") {
				return navigateTo('/')
			}
		
}