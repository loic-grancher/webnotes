---
title: Fonts

---
# Importing fonts

- Add fonts
```ts
//_layout.ts
import {useFonts} from "expo-font"

const RootLayout = () => {
	const [fontsLoaded, error] = useFonts({
		"Poppins-Black": require('../assets/fonts/Poppins-Black.ttf')
		...
	})
	
	//insert code below
	return
	...
```

- check for errors and hide the splash screen
```ts
//_layout.ts
//...previous code
useEffect(()=>{
	if (error) throw error;
	if (fontsLoaded) SplashScreen.hideAsync();
}, [fontsLoaded, error])

if (!fontsLoaded && !error) return null;
```

- Prevent splashscreen from auto loading on top of the page
```ts
//_layout.ts
...
import {useFonts} from "expo-font"

SplashScreen.preventAutoHideAsync();
```

# Using the fonts 
```ts
<Text className='font-pblack'> Aora!</Text>
```