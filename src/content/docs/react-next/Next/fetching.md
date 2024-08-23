---
title: Fetching data
---

Managing type when fetching data:

**Both your function and the component using it must be ASYNC !!**

```ts

//define type in file or in other TS file
type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

//fetch data form API
async function getProducts(): Promise<Product[]> {

    const response = await fetch("https://fakestoreapi.com/products");
    
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return await response.json();
}

//Create component
export default async function Page() {
//use ou
    const products = await getProducts();
    return (
        <div>
            <h1>Here are our products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.title} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
```