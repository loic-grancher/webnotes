---
title: Creating a Nuxt Project
tags:
  - nuxt
sidebar:
    order: 1
---
## Creating 
NPM
```sh
npx nuxi@latest init <project-name>
```

BUN
```sh
bunx nuxi@latest init <project-name>
```

Nuxt Content
```sh
npx nuxi init -t content <app>
```

## Tailwind

Method 1:
```sh
npx nuxi@latest module add tailwindcss
```

Method 2:
```sh
npm install --save-dev @nuxtjs/tailwindcss
```

In `modules` section of `nuxt.config.{ts,js}`

```ts
//nuxt.config.{ts,js}
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
```
## Files 
- Nuxt.config.ts is a TS file, but you can use either JS or TS in Nuxt. You can add methods, metadata, api keys...
- app.vue: default route component, you can delete it to use the page router
- The NuxtWelcome component is a baked-in component, you can't access its content.