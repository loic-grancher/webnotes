---
tags:
  - nuxt
title: Fetching data in Vue (client)
---
## Using the fetch API

```ts
const load = async() =>{
	try {
		const data= await fetch ("http://...")
		if (!data.ok){
			throw Error("no data available")
		}
		post.value = await data.json()
	
	}catch (err){
		error.value =err
	}
}
load()
```

Displaying the errors:  
```vue
<div v-if(error)> {{ error }} </div>
```

Displaying a loading message  
```vue
<div v-if(post.length)>
	<PostList :posts="post"/>
</div>
<div v-else()>
	<p>Loading...</p>
</div>
```
