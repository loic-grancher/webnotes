---
title: Routes
---
## Dynamic Routes
### Create a dynamic route

- Create a `products/[id]` folder, with a page.tsx inside
- 
### Links to dynamic routes

```ts
 <Link href={"/products/" + product.id}>
	{product.title}
</Link>                  
```

## Getting parameters from the url (when making links)

- In child component:
```ts
export default function ProductDetails({ params }: { params: { id: string } }) {

    const productId = params.id;

    return (
        <div>
            <h1> Product </h1>
        </div>
    );
```