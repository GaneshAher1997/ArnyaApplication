// ceated By: Wasim Akram
// created At: 10/05/2023
// modify by Wasim Akram at 11/05/2023

import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useState } from "react";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const MoveAnimalHeader = (props) => {
  const navigation = useNavigation();

  const gotoBack = () => navigation.goBack();

  return (
    <>
      <View style={props.style === undefined ? styles.container : props.style}>
        <TouchableOpacity
          onPress={gotoBack}
          style={{
            left: 14,
          }}
        >
          <Ionicons name="arrow-back-outline" size={wp(7.8)} color="#1F415B" />
        </TouchableOpacity>

        <Text
          style={
            props.headerTitle === undefined
              ? styles.titleStyle
              : props.headerTitle
          }
        >
          {props.title}
        </Text>
      </View>
    </>
  );
};

export default MoveAnimalHeader;
const styles = StyleSheet.create({
  container: {
    padding: wp(1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: hp(2),
    alignItems: "center",

    // backgroundColor: "#63C3A5",
  },
  titleStyle: {
    fontSize: 24,
    color: "black",
    paddingLeft: wp(6),
  },
  // subtitleStyle:{
  //   fontSize:14,
  //   color:"black",
  //   // paddingTop:heightPercentageToDP(2),
  //   paddingLeft: wp(6),
  // },
  headerText: {},
});
