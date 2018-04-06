import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import images from "./images";
import Slider from "./components/slider";
import { renderIcons } from "./components/icons";
const { width, height } = Dimensions.get("window");

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      animatedValue: 0,
      isOpened: true
    };
    this.springValue = new Animated.Value(0.3);
    this.animatedValue = new Animated.Value(0);
    this.animatedValue1 = new Animated.Value(0);
    this.toValue = 400;
    this.toValue1 = 200;
    this.setz = true;
  }

  componentDidMount() {}
  spring() {
    this.springValue.setValue(0.3);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true
    }).start();
  }

  animate(iconLayerSize) {
    Animated.parallel([
      Animated.timing(this.animatedValue, {
        toValue: this.toValue,
        duration: 800
      }),
      Animated.timing(this.animatedValue1, {
        toValue: this.toValue1,
        duration: 800
      })
    ]).start(() => {
      this.setState({ isOpened: false });
      this.animateBack(iconLayerSize);
    });
  }
  animateBack(iconLayerSize) {
    if (this.setz) {
      this.animatedValue.setValue(iconLayerSize ? iconLayerSize : 350);
      this.toValue = 0;
      this.animatedValue1.setValue(200);
      this.toValue1 = 0;
      this.setz = false;
    } else {
      this.setState({ isOpened: true });
      this.animatedValue.setValue(0);
      this.toValue = 350 || iconLayerSize ? iconLayerSize : 350;
      this.animatedValue1.setValue(0);
      this.toValue1 = 200;
      this.setz = true;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.slideIcons ? (
          <Slider
            iconLocation={this.props.iconLocation}
            iconPadColor={this.props.iconPadColor}
            userDisplay={this.props.userDisplay}
            iconLayerSize={this.props.iconLayerSize}
            buttonColor={this.props.buttonColor}
          />
        ) : this.props.invertedArc ? (
          <View style={styles.container}>
            <View
              style={[
                {
                  left: width - this.animatedValue1
                },
                this.props.invertedArc ? styles.arctopView : styles.arcView
              ]}
            >
              <Animated.View
                style={{
                  width: this.animatedValue,
                  height: 0,
                  borderBottomWidth: this.animatedValue1,
                  borderBottomColor: this.props.iconPadColor
                    ? this.props.iconPadColor
                    : "red",
                  borderBottomLeftRadius: this.animatedValue1,
                  borderBottomRightRadius: this.animatedValue1
                }}
              >
                {renderIcons(
                  50,
                  100,
                  50,
                  100,
                  30,
                  100,
                  100,
                  30,
                  this.props.invertedArc
                )}
              </Animated.View>
            </View>
            <View style={styles.buttonView1}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.animate(this.props.iconLayerSize);
                  this.spring();
                }}
              >
                <View
                  style={[
                    styles.buttonClick,
                    {
                      backgroundColor: this.props.buttonColor
                        ? this.props.buttonColor
                        : "blue"
                    }
                  ]}
                >
                  {this.state.isOpened ? (
                    <Text style={{ fontSize: 40, color: "white" }}>+</Text>
                  ) : (
                    <Image
                      source={images.close}
                      style={{ height: 35, width: 35, resizeMode: "contain" }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <View
              style={[
                {
                  left: width - this.animatedValue1
                },
                this.props.invertedArc ? this.props.arctopView : styles.arcView
              ]}
            >
              <Animated.View
                style={{
                  width: this.animatedValue,
                  height: 0,
                  borderTopWidth: this.animatedValue1,
                  borderTopColor: this.props.iconPadColor
                    ? this.props.iconPadColor
                    : "red",
                  borderTopLeftRadius: this.animatedValue1,
                  borderTopRightRadius: this.animatedValue1
                }}
              >
                {renderIcons(50, 100, 50, 100, 30, 100, 100, 30)}
              </Animated.View>
            </View>
            <View style={styles.buttonView2}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.animate(this.props.iconLayerSize);
                  this.spring();
                }}
              >
                <View
                  style={[
                    styles.buttonClick,
                    {
                      backgroundColor: this.props.buttonColor
                        ? this.props.buttonColor
                        : "blue"
                    }
                  ]}
                >
                  {this.state.isOpened ? (
                    <Text style={{ fontSize: 40, color: "white" }}>+</Text>
                  ) : (
                    <Image
                      source={images.close}
                      style={{ height: 35, width: 35, resizeMode: "contain" }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    alignItems: "center",
    justifyContent: "center"
  },
  buttonView: {
    height: height,
    width: width,
    position: "absolute",
    alignItems: "center"
  },
  buttonView1: {
    height: height,
    width: width,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  buttonView2: {
    height: height,
    width: width,
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  buttonClick: {
    height: 80,
    width: 80,
    borderRadius: 40,

    alignItems: "center",
    justifyContent: "center"
  },
  arctopView: {
    position: "absolute",
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "center",
    top: 0
  },
  arcView: {
    position: "absolute",
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "center",
    bottom: 0
  }
});
