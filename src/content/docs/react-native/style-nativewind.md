---
title: Style & Nativewind
---
## Style
### Passing style as props
```tsx
const FormField = ({styleList}) => {

return (
	<View className={`space-y-2 ${styleList}`}>
		<Text >FormField</Text>
	</View>
	)
}
```

## Nativewind
### Installing
```sh
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
```

### Setting up
```sh
npx tailwindcss init
```

Copy CSS config into the newly created tailwind.conf
```ts
//tailwind.config.ts
content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
```

Edit babel config:
```ts
//babel.config.ts
...
plugins: ["nativewind/babel"],
```

DONE !

### Troubleshooting

#### Issues with TS:

Here is what you do: in your app folder in the expo (that is where you have the assets folder, constants, components e.t.c.) you make a a file named nativewind-env.d.ts.

Then, paste this line inside the file:

```ts
/// <reference types="nativewind/types" /> 
```

#### Issues with web not showing css
In your root layout, add
```jsx
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
	default: "native",
});
```