---
title: Routing & Layouts
---
# Routes
Our routes are located in "/app"

We can define a layout with `_layout.tsx` 

### Route groups
To create a route group, we use parenthesis. Ex `(auth)`

### Dynamic routes
To create a dynamic routes, like in NextJS we use [ ]. Ex `[id]`

# Layouts
- are defined in `_layout.tsx` files
- Using slots
```tsx
//_layout.tsx
import {Slot} from "expo-router"

const RootLayout = () => {
return (
	//Header
	<Slot/>
	//Footer
)
}
```

- Alternative: using stacks: a list of different screens
```jsx
const RootLayout = () => {

	return (
		<>
			<Stack>
				<Stack.Screen name="index" options={{headerShown: false}}/>
			</Stack>
		</>
	)
}
```

# Linking pages

```ts
//index.ts
import { Link } from 'expo-router';

export default function HomeScreen() {
return (
	<View>
		<Link href="/profile">Go to Pofile</Link>
	</View>
);
}
```

## Redirections
```tsx
import { Redirect, router } from "expo-router";
...

function handlePress={() => router.push("/sign-in")}
```