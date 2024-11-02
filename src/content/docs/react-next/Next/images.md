---
title: Images in NextJS
---

```ts
import Image from 'next/image'
<Image src={product.image} alt={product.title} width={200} height={200} />
```

If fetching from an API , you need to add the domain to `next.config.mjs`:

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fakestoreapi.com",
                pathname: "/**",
            },
        ],
    }
}
export default nextConfig;
```
