import { View, Text, ScrollView, SafeAreaView, Animated } from "react-native";
import React, { useState } from "react";
import styles from "../configs/Styles";
import Header from "./Header";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const TITLE_MIN_HEIGHT = 40;
const CustomForm = ({ onPress, ...props }) => {
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

  const [scrollY] = useState(new Animated.Value(0));
  const [shiftHeader, setShiftHeader] = useState(false);

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + TITLE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + TITLE_MIN_HEIGHT + 26,
    ],
    outputRange: [-20, -10, -20, 0],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {props.header ? <Header onPress={onPress} noIcon={false} /> : null}
      {/* update by : mohit, changes made in style fix the navigation issue*/}
      {shiftHeader ? (
        <Animated.View
          style={{
            position: "absolute",
            // top: 0,
            left: "25%",
            right: "25%",
            height: 60,
            alignItems: "center",
            marginTop: -30,
            width: "50%",
            justifyContent: "center",
          }}
        >
          {props.title ? (
            <Animated.View
              style={{
                position: "absolute",
                bottom: headerTitleBottom,
                top: 50,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {props.title}
              </Text>
            </Animated.View>
          ) : null}
        </Animated.View>
      ) : null}

      <ScrollView
        style={{ flex: 1,  backgroundColor: isSwitchOn ? "#1F415B" : "#fff" }}
        scrollEventThrottle={16}
        onScroll={function (event) {
          let currentOffset = event.nativeEvent.contentOffset.y;
          let direction = currentOffset > 0 ? true : false;
          setShiftHeader(direction);
          Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          });
        }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAwareScrollView  >
          <View style={{ backgroundColor: isSwitchOn ? "#1F415B" : "#fff"}}>
            <Text
              style={{
                fontSize: 26,
                paddingLeft: 15,
                color: isSwitchOn ? "white" : "black",
              }}
            >
              {!shiftHeader ? props.title : null}
            </Text>
          </View>
          <View
            style={[
              styles.body,
              { backgroundColor: isSwitchOn ? "#1F415B" : "white", },
            ]}
          >
            <View isRequired>{props.children}</View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default CustomForm;
