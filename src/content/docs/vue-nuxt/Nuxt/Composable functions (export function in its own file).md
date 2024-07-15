---
title: Composable functions
---

They are usually called composables or composition functions

1. I create a new “composables” folder in src/
    
2. We create a JS file to hold our function (usually the name of the function), here getPosts.js
    
3. We copy our code, but we need to return a value (here the posts we fetched, the error and the load function)
    
4. We export the function we created with “export default”

```js
//getPosts.js
export default function getPost(){
const load = async() =>{
	try {
		const data= await fetch ("http://...")
		if (!data.ok){
			throw Error("no data available")
		}
		post.value = await data.json()
	
	}catch (err){
		error.value =err.message
	}
};
return { posts, error, load}
}
```

We import this function, take the items we need via destructuring (posts, error and load), and call our load function  

```js
import getPosts from '../composables/getPosts'

const {post, error, load} = getPosts()
load()

```
