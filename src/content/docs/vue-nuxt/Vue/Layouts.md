---
tags:
  - nuxt
title: Layouts (for, if...)
---
- Create a layouts folder

- The page content goes in   `</slot>`
- ==If you keep your app.vue file==, you'll need to wrap the pages in a template component:

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```
# Default layout
- The main layout will be "default.vue"

# Custom layout
- Create another vue file in your layout folder (productLayout.vue for ex)
- In your page: for Typescript
```vue
<script setup lang="ts">

import { definePageMeta } from '#imports'
definePageMeta({
    layout: 'product'
})

</script>
  
```