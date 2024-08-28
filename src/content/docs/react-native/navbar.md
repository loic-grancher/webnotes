---
title: Create a navbar (bottom)
---
In our `(tabs)/layout.tsx`

We use the Tabs and Tabs.Screen tools:
```tsx
import React from 'react'
import { Tabs, Redirect } from 'expo-router'

const TabsLayout = () => {
	return (
		<>
			<Tabs >
				<Tabs.Screen name="home"  />
			</Tabs>
		</>
	)
}

export default TabsLayout
```

I can then use a custom component to render each icon and text:
```tsx
...
//To hide the default text for each icon
<Tabs
screenOptions={{ tabBarShowLabel: false }} >

	<Tabs.Screen name="home"
	options={{
		title: "HOME",
		headerShown: false,
		//We render our custom component with its props
		tabBarIcon: ({ color, focused }) => (
			<TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
		)}}
	/>

//Same for other screens (pages)
```