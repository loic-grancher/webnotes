---
title: Creating an Expo project
sidebar:
    order: 1
---
# Creating the project 
- Create a repo, then
```sh
npx create-expo-app@latest ./
```


# Extra setup (not always necessary)

- Install dependencies (might not be necessary)
```sh
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```
expo-router: file based routing
react-native-safe-area-context : make app work on all size of devices  
react-native-screens: navigate to components
expo-linking: allow users to navigate to a specific screen from another app or websiteµ
expo-constants: info about device 
expo-status-bar: provide status bar

# Configuration
- Setup entry point (might not be necessary):
```json
//package.json
{
  "main": "expo-router/entry"
}
```

- Inside of app.json:
```json
//we name our app, this will allow to access it from a remote link
  "scheme": "aora",
  
  //you can also modify
  "name": "aora",
  "slug": "aora",
```

# Running our app
Start the local server:

```sh
npx expo start -c
```

Then scan your QR code with the expo app to get started.

## Base structure (no tabs):
```yaml
app:
	_layout.tsx
	index.tsx
```

```jsx
//_layout.tsx
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'

const RootLayout = () => {
	return (
		<>
			<Slot />
		</>
	)
}
export default RootLayout
```

```tsx
//index.jsx
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Index = () => {
	
	return (
	<View>
		<Text style={styles.container} >My index page</Text>
	</View>
	)
}

export default Index

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
```