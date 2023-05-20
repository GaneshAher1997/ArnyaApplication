// created By: Wasim Akram;
// Created at: 27/04/2023

// modify By : Gaurav Shukla
//date:2-05-2023
//description: pass the props for navigation and apply the condition to ShowIonicons

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const Footermedical = ({
  firstlabel,
  lastlabel,
  navigateNextScreen,
  navigatePreviousScreen,
  ShowIonicons,
  ShowRighticon,
}) => {
  const navigation = useNavigation();
  const goback = () => {
    navigation.navigate("AddMedical");
  };

  return (
    <View style={styles.content}>
      <LinearGradient colors={["#E8F4ED", "#E8F4ED"]}>
        <View style={styles.mainbox}>
          <TouchableOpacity
            style={styles.firstbutton}
            onPress={navigateNextScreen}
          >
            {/* pass  */}
            {ShowIonicons == true ? (
              <Ionicons
                name="ios-arrow-back-outline"
                size={24}
                color="black"
                style={{ marginTop: hp(2.3) }}
              />
            ) : null}
            <Text style={[styles.textstyleOne]}>{firstlabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondbutton}
            onPress={() => goback()}
          >
            <Text style={[styles.textstyleSecond]}>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.thirdbutton}
            onPress={navigatePreviousScreen}
          >
            <Text style={styles.textstyleOne}>{lastlabel}</Text>
            {
              ShowRighticon == true ? (
                <Ionicons
                name="ios-arrow-forward-sharp"
                size={24}
                color="black"
                style={{ marginTop: hp(2.2) }}
              />
              ) :null}
            
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Footermedical;
const styles = StyleSheet.create({
  mainbox: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp(100),
    height: hp(12),
  },
  firstbutton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp(32),
    height: hp(7),
    marginTop: hp(1),
    backgroundColor: "transparent",
  },
  secondbutton: {
    borderRadius: 8,
    width: wp(27),
    height: hp(7),
    marginTop: hp(1),
    justifyContent: "center",
    backgroundColor: "#37BD69",
  },
  thirdbutton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: wp(32),
    height: hp(7),
    marginTop: hp(1),
    backgroundColor: "transparent",
  },
  textstyleOne: {
    fontSize: wp(4),
    fontWeight: "600",
    textAlign: "center",
    paddingTop: hp(2.5),
  },
  textstyleSecond: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    // paddingTop: hp(1.8),
    color: "white",
  },
});
