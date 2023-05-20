import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Menu } from "react-native-paper";
import { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ImageHeader = (props) => {
  const navigation = useNavigation();
  {
    /*
        author : Arnab
        date: 3.5.23
        desc: added for more function
      */
  }
  const [moreOptionVisible, setMoreOptionVisible] = useState(false);
  const [moreOptionData, setMoreOptionData] = useState(props.optionData ?? []);
  const gotoBack = () => navigation.goBack();
  const openMoreOption = () => setMoreOptionVisible(true);
  const closeMoreOption = () => setMoreOptionVisible(false);

  const optionPress = (item) => {
    setMoreOptionVisible(false);
    if(item.screen !== ""){
      navigation.navigate(item.screen, {
        item: props.itemDetails,
      });
    }
  };

  return (

    <>
      <View
        style={{
          padding: wp(1),
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={gotoBack}
          style={{
            left: 12,
          }}
        >
          <Ionicons name="arrow-back-outline" size={wp(7.8)} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, color: "#fff" }}>{props.title}</Text>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={wp(9)}
          color="white"
          style={{ right: 12 }}
        />
      </View>
    </>
  );
};

export default ImageHeader;