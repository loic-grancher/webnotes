---
title: Loading & suspense
---

## Loading

- In the /app repo, create a loading.tsx file
- It will be displayed when a page loads

## Suspense
-   `import { Suspense } from "react";`
```ts
return (
        <>
            <h1>Product details</h1>

            <Suspense fallback={<Loading />}>
                <ProductInfo id={productId} />
            </Suspense>
        </>
    );
```