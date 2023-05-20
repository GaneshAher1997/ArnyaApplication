import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ButtonCom = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
    activeOpacity={0.7}
      style={
        [styles.container,
        buttonStyle,
        buttonColor,]
      }
      onPress={onPress}
    >
      <Text
        style={[textStyle,title,titleColor]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
 
export default ButtonCom;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  
});




//------------------------------------------------------watch this for exanmple
// <ButtonCom
// buttonColor="#FFC002"
// titleColor="#fff"
// title="Button"
// buttonStyle={{
//   width: "60%",
//   alignSelf: "center",
//   borderRadius: 15,
// }}
// textStyle={{ fontSize: 20, textDecorationLine: "underline" }}
// onPress={() => console.log("I am the third button")}
// />