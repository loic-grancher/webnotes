---
title: Components
sidebar:
    order: 2
---
## Activity Indicator
Displays spinner or loading addicator
```jsx
<ActivityIndicator size={large} color="#0000ff" />
```
## Alert
To display alert (with button config)

```jsx
Alert.alert(
"alert title",
"myalert message",
[
	{text: "Cancel", onPress: ()=> console.log("Cancel pressed"),
	{text: "OK", onPress: ()=> console.log("OK pressed")
]
);
```

## Button
More simple that the touchable component, used for basic things

```jsx
<Button title="Press Me" onPress={handlePress}/>
```

## Flatlist
More simple that the touchable component, used for basic things
```jsx
<Button title="Press Me" onPress={handlePress}/>
```

## Image
To display images
Compatible with png, jpeg, webp, gif but NOT SVG (without an external package, like React Native SVG)

```jsx
<Image source= {{uri: "https://via.placeholder.com/200"}}/> 
```

## ImageBackground
To use an image as background of a container

Compatible with png, jpeg, webp, gif but NOT SVG (without an external package, like React Native SVG)
```jsx
<ImageBackground> 
	<Text> Some text </Text>
</ImageBackground>
```

## Modal
To display images
Compatible with png, jpeg, webp, gif but NOT SVG (without an external package, like React Native SVG)

```jsx
<Modal 
	visible={True}
	animationType="slide"
	onRequestClose {()=> console.log("Modal closed")} > 
	
	<Text> Some text </Text>
	
</Modal>
```


## SafeAreaView
Provides a safe zone to render an app's content (like safe margins).
The default viewworks for most cases but for some users it''s not the best.

```jsx
<SafeAreaView> ... </SafeAreaView>
```

## Scrollview
A "box" that hold multiple components and views and provide a scrolling container for them
Similar to a div

```jsx
<ScrollView >
	<Text> Text 1 </Text>
	<Text> Text 2 </Text>
	<Text> Text 3 </Text>
</ScrollView >
```


## StatusBar
Rn and Expo have their own versions that allow us to control how the status bar goes.

```jsx
<StatusBar />
```

## Switch
Act as a toggle

```jsx
<Switch 
	trackColor={{false: "#456456", true: "#ffffff"}}
	thumbColor={isEnabled ? "#bbbbbb" : "#f4f4f4"}
	onValueChange={toggleSwitch}
	value={isEnabled}
/>
```

## TouchableHighlight
```jsx
<TouchableHighlight onPress={props.onPress}/>
```


## TouchableOpacity
Similar to a button, with more customisation

```jsx
<TouchableOpacity onPress={props.onPress}/>
```

## Touchable Without Feedback
To create an element that's clickable without feedback, like links or images

```jsx
<TouchableWithoutFeedback onPress={props.onPress}/>
```

## View
A box containing other components, like a div with more funct.
It uses flexbox by default, so you can use flex-direction...

```jsx
<View> ... </View>
```
