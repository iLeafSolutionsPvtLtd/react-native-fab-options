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
const { width, height } = Dimensions.get("window");

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: 0,
      isOpened: true,
      spinValue: new Animated.Value(0)
    };

    this.springValue = new Animated.Value(0.3);
    this.animatedValue = new Animated.Value(0);
    this.animatedValue1 = new Animated.Value(0);
    this.toValue = 400;
    this.toValue1 = 200;
    this.setz = true;
  }

  componentDidMount() {}
  _renderHeader(section, spin) {
    spin = new Animated.Value(0).interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"]
    });
    return (
      <View
        style={{
          height: 50,
          width: width,
          borderRadius: 25,
          backgroundColor: section.color,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>{section.text}</Text>
      </View>
    );
  }

  spring() {
    this.springValue.setValue(0.3);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true
    }).start();

    if (this.state.isOpened) {
      Animated.timing(this.state.spinValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear
      }).start();
    } else {
      Animated.timing(this.state.spinValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }).start();
    }
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
  renderMobileIcons(phone, mail, data, wifi, b1, b2, b3, b4, invertedArc) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.iconClick("call")}
          style={[
            invertedArc
              ? {
                  position: "absolute",
                  left: phone,
                  top: b1,
                  transform: [{ scale: this.springValue }]
                }
              : {
                  position: "absolute",
                  left: phone,
                  bottom: b1,
                  transform: [{ scale: this.springValue }]
                }
          ]}
        >
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: "contain"
            }}
            source={images.phone}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.iconClick("mail")}
          style={[
            invertedArc
              ? {
                  position: "absolute",
                  left: mail,
                  top: b2,
                  transform: [{ scale: this.springValue }]
                }
              : {
                  position: "absolute",
                  left: mail,
                  bottom: b2,
                  transform: [{ scale: this.springValue }]
                }
          ]}
        >
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: "contain"
            }}
            source={images.mail}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.iconClick("wifi")}
          style={[
            invertedArc
              ? {
                  position: "absolute",
                  right: wifi,
                  top: b3,
                  transform: [{ scale: this.springValue }]
                }
              : {
                  position: "absolute",
                  right: wifi,
                  bottom: b3,
                  transform: [{ scale: this.springValue }]
                }
          ]}
        >
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: "contain"
            }}
            source={images.wifi}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.iconClick("mobile data")}
          style={[
            invertedArc
              ? {
                  position: "absolute",
                  right: data,
                  top: b4,
                  transform: [{ scale: this.springValue }]
                }
              : {
                  position: "absolute",
                  right: data,
                  bottom: b4,
                  transform: [{ scale: this.springValue }]
                }
          ]}
        >
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: "contain"
            }}
            source={images.mobileData}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"]
    });
    return (
      <View style={styles.container}>
        {this.props.slideIcons ? (
          <View
            style={[
              {
                flex: 1,
                alignItems: "center"
              },
              this.props.iconLocation
            ]}
          >
            <Animated.View
              style={[
                {
                  height: 70,
                  width: this.animatedValue,
                  borderRadius: 50,
                  backgroundColor: this.props.iconPadColor
                    ? this.props.iconPadColor
                    : "red",
                  marginBottom: 2
                },
                this.props.userDisplay ? this.props.userDisplay : styles.icon
              ]}
            >
              {this.renderMobileIcons(120, 50, 120, 50, -10, -10, -10, -10)}
            </Animated.View>

            <View style={[styles.buttonView, this.props.iconLocation]}>
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
                  <Animated.Image
                    source={images.plus}
                    style={[
                      {
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                        transform: [{ rotate: spin }]
                      }
                    ]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
                {this.renderMobileIcons(
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
                  <Animated.Image
                    source={images.plus}
                    style={[
                      {
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                        transform: [{ rotate: spin }]
                      }
                    ]}
                  />
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

                  borderTopWidth: this.animatedValue1,
                  borderTopColor: this.props.iconPadColor
                    ? this.props.iconPadColor
                    : "red",
                  borderTopLeftRadius: this.animatedValue1,
                  borderTopRightRadius: this.animatedValue1
                }}
              >
                {this.renderMobileIcons(50, 100, 50, 100, 30, 100, 100, 30)}
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
                  <Animated.Image
                    source={images.plus}
                    style={[
                      {
                        height: 30,
                        width: 30,
                        resizeMode: "contain",
                        transform: [{ rotate: spin }]
                      }
                    ]}
                  />
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
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  buttonView2: {
    height: height,
    width: width,
    padding: 20,
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
