import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Searchbar } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import VoiceText from "./VoiceText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchBox = ({ style }) => {
  const [searchText, setSearchText] = useState("");
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const navigation = useNavigation();
  const toggleDrawer = () => navigation.toggleDrawer();
  const SearchScreen = () => navigation.navigate("SearchScreen");

  const onVoiceInput = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.barStyle}>
      <View style={{ width: '100%', justifyContent: 'center', marginLeft: 10 }}>
        <TouchableOpacity onPress={SearchScreen}>
          <Searchbar
            placeholder="Search"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            value={searchText}
            inputStyle={styles.input}
            style={{
              width: "95%",
              backgroundColor: isSwitchOn ? "black" : "#F2FFF8"
            }}
            loading={false}
            editable={false}
            icon={({ size, color }) => (
              <MaterialIcons name="menu" size={24} color style={{
                color: isSwitchOn ? "white" : "black"
              }} />
            )}
            // onFocus={SearchScreen}
            onIconPress={toggleDrawer}
            // clearIcon={({ size, color }) => (
            //   <View style={styles.rightIcons}>
            //       <MaterialIcons name="search" size={24} />
            //       <VoiceText/>
            //   </View>
            // )}

            right={({ size, color }) => (
              <View style={styles.rightIcons}>
                <MaterialIcons
                  name="search"
                  size={24}
                  style={{
                    margin: 10,
                    color: isSwitchOn ? "white" : "black"
                  }}

                  onPress={SearchScreen}
                />
                {/* <VoiceText resultValue={onVoiceInput} /> */}
              </View>
            )}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    marginTop: -10,
    marginBottom: 5,
  },
  searchBar: {
    width: "95%",
    // backgroundColor : "#f2fff8"
  },
  rightIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "3%",
    marginHorizontal: "1%",
  },
  input: {
    width: "40%",
    fontWeight: "100",
    fontSize: hp(2.5),
    color: "grey",
  },
});

export default SearchBox;