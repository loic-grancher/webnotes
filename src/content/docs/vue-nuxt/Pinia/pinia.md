---
title: Pinia State Manager
---
Ex VueX
You can configure pinia out of the box, but it’ll bring a lot of boilerplate code, so you might want to implement it later.

## Creating a store
### Configuration

- Install
```sh
npm i pinia
```
- Now we register it as a middleware:
- In main.js, we import it:
```js
//main.js
import {createPinia } from 'pinia'
```
- We add it to our app
```js
import {createPinia } from 'pinia'
createApp(App).use (createPinia()).mount("#app")
```

### Creating a store

1. We create a “stores” folder inside src
2. We make a new store for every set of global states (TaskStore.js)
3. We import our store definition funct
```js
import { defineStore } from "pinia"
```

4. We pass a unique identifier for the store and an object where we define the state. We store it into a constant that we'll export (usually starts with "use")
```js
export const useTaskStore = defineStore("taskstore", {

})
```

5.  We define a state function, and we pass an array of object (the state we want to share).  We can use several arrays (or simply key:value pairs of different values if we want to.
```js
export const useTaskStore = defineStore("taskstore", {
	state: () => ({
	tasks: [
		{id: 1, title "buy some milk", isFave: false},
		{id: 2, title "play games", isFave: true},
	],
	name: "Yoshi"
	})
})
```



## Accessing a store

1. In my app component
```vue
<script setup>
	import {useTaskStore} from "./stores/TaskStore"
	const taskStore = useTaskStore()
</script>
```
2. We can then access anything from the store using storeName.prop (taskStore.name)

3. We can now use our store in the template
```vue
// Task List
<div class="task-list">
	<div v-for="task in taskStore.tasks">
		<p>{{task.title}}</p>
	<div>
</div>  
```


## Getters

Getter functions allow us to manipulate the data before it’s returned to us (ex: returns all the “favourite “ tasks, or return an array of titles instead of objects).

Inside our store:

  1. We create getters (same level as state). Inside it we pass functions (like favs() ). They return a modified value
```ts
export const useTaskStore = defineStore("taskstore", {
	state: () => ({
		tasks: [
			{id: 1, title "buy some milk", isFave: false},
			{id: 2, title "play games", isFave: true},
		]
	}),
	//HERE WE DEFINE THE GETTERS
	getters: {
		favs(){
			return this.tasks.filter((task) => task.isFav);
		}
	},
})
     
```

Note: 
```ts
//if using a "regular function": we use "this" but no arguments
totalCount(){
return this.tasks.length
}
//Note: if using an "arrow function": we don't "this" but we need arguments
totalCount: (state) => {
	return state.tasks.length
}
```

2. We can now use these getters functions. No need for parenthesis here as we're using a function
```vue
<div v-for="task in taskStore.favs">
	<TaskDetails :task="task />
</div>
```

  

## Actions

Same level as getters and state. 

They allow us to save methods we can use that affect the states we defined

Note: we use filtering to get a task by ID

```ts
export const useTaskStore = defineStore("taskstore", {
	state: () => ({
		...
	}),
	getters: {
		...
	},
	//HERE WE ADD THE ACTIONS
	actions: {
		addTask(task){
			this.tasks.push(task)
		},
		deleteTask(id){
			this.tasks = this.tasks.filter((task) => {
				return task.id !== id
				}
			)
		},
		toggleFav(id){
			const task = this.tasks.find((task) => task.id === id);
			task.isFav = !task.isFav;
		},
	}
})
```


## Conditional styling

We can apply classes depending on a state:  
:class  
we pass an object with the name of the class to pass and the condition  
The class active is set is task.isFav is true
```ts
<i class="material-icons" @click="taskStore.toggleFav(task.id)" :class="{active: task.isFav}"> favorite </i>
```

## Async actions

Fetch
```ts
export const useTaskStore = defineStore("taskstore", {
	state: () => ({
		...
	}),
	getters: {
		...
	},
	actions: {
		//Getting task
		async getTasks(){
			this.isLoading = true;
			const res = await fetch("http://...")
			const data = await res.json();
			this.tasks = data;
			this.isLoading = false;
		},
		//Adding task
		async addTasks(){
			this. tasks.push(task)
			const res = await fetch("http://...", {
				method: "POST",
				body: JSON.stringify(task),
				headers: {
					"Content-type": "application/json"
				}
			})
		},
		//Delete task
		async deleteTasks(){
			const res = await fetch("http://..." + id, {
				method: "DELETE"	
				});
			if (res.error){
				console.log(res.error);	
			}
		},
		//Toggle task
		async toggleFav(id){
			const task = this.tasks.find((task) => task.id ===id);
			task.isFav = !task.isFav;
			const res = await fetch("http://..." + id, {
				method: "PATCH",
				body: JSON.stringify({isFav: task.isFav}),
				headers:{
					"Content-type": "application/json"
					},
				});
				if (res.error){
					console.log(res.error);
				}
			},
		}
	}
})
```



## Resetting store state:

We can use the $reset method on our state: it will go back to its original value (here [ ] )  
```vue
<button @click="taskStore.$reset"> Reset</button>
```

## Store to refs:

I can destructure any getters/variables that are refs inside my store, so I can use them without needing to refer to my store every time. This doesn’t apply to actions, for that you need the store itself.
```ts
const {tasks, isLoading, favCount, totalCount} = storeToRefs(taskStore)
```

This...
```vue
<div v-for="task in taskStore.tasks" key="task.id">
```
...can now become this:
```vue
<div v-for="task in tasks" key="task.id">
```
