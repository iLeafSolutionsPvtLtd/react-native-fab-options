# react-native-fab-options

FabOptions for React native for both android and ios

## Installation:

Install the component through npm using:

```
npm install react-native-fab-options --save
```

<img src="https://user-images.githubusercontent.com/32927921/38405050-8a67ac8a-398b-11e8-81c6-1dbb366c8494.png" width="280"/> <img src="https://user-images.githubusercontent.com/32927921/38405058-9217099e-398b-11e8-9574-fb43badb5f61.png" width="280"/><img src="https://user-images.githubusercontent.com/32927921/38405064-95f59c60-398b-11e8-82d8-947de20bf111.png" width="280"/>

## Example:

```js
import FabOptions from "react-native-fab-options";

<App
  invertedArc={false}
  slideIcons={false}
  buttonColor="red"
  iconLocation={{
    justifyContent: "center"
  }}
  userDisplay={{ alignItems: "center", justifyContent: "center" }}
  iconPadColor="red"
  iconLayerSize={350}
  iconClick={clicked => console.log("click....", clicked)}
/>;
```

## Props:

`*` - mandatory

| Props Name       | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `*iconLayerSize` | size for the pad icon pad (default-350)              |
| `*iconClick`     | call back for the icons that has clicked             |
| `iconPadColor`   | color applied to the icon pad                        |
| `invertedArc`    | boolean to set inverted arc (default-false)          |
| `slideIcons`     | boolean to set slider pad (default-false)            |
| `buttonColor`    | color applied to the button to display pad           |
| `iconLocation`   | style for locating icons (justifyContent/alignItems) |
| `userDisplay`    | user could style for the display pad                 |
