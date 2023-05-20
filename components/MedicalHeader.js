import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import SearchBox from "./SearchBox";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Menu,
  Divider,
  Provider,
  IconButton,
  Appbar,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Badge } from "react-native-paper";
const deviceWidth = Dimensions.get("window").width;
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MedicalHeader = (props) => {
  const navigation = useNavigation();
  const [unreadNotifications, setUnreadNotifications] = useState(5);
  const [visible, setVisible] = useState(false);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

  const openMenu = () => setVisible(true);
  const gotoHome = () => navigation.navigate("Home");
  const closeMenu = () => setVisible(false);
  const gotoBack = () => navigation.goBack();
  const site = useSelector((state) => state.UserAuth.zoos);
  return (
    <SafeAreaView
      style={{ backgroundColor: isSwitchOn ? "#1F415B" : "white" }}
    >
      {props.route == true ? (
        <StatusBar
        barStyle={isSwitchOn ? "light-content" : "dark-content"}
        backgroundColor={isSwitchOn ? "#1F415B" : "#DAE7DF"}
        />
      ) : (
        <StatusBar
          barStyle={isSwitchOn ? "light-content" : "dark-content"}
          backgroundColor={isSwitchOn ? "#1F415B" : "white"}
        />
      )}
        {props.noIcon == true ? (
        <StatusBar
          barStyle={isSwitchOn ? "light-content" : "dark-content"}
          backgroundColor={isSwitchOn ? "#1F415B" : "white"}
        />
      ) : (
     null
      )}
      {props.route == true ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <View>
              <TouchableOpacity onPress={openMenu}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "50%",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome
                    name="location-arrow"
                    size={17}
                    color="#37BD69"
                    style={{}}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginLeft: 4,
                      marginRight: 2,
                      color: isSwitchOn ? "white" : "black",
                    }}
                  >
                    {site !== null ? site[0]?.zoo_name : "Site Name"}
                  </Text>
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                      <AntDesign
                        name="down"
                        size={12}
                        style={{
                          color: isSwitchOn ? "white" : "black",
                        }}
                        onPress={openMenu}
                      />
                    }
                    statusBarHeight={15}
                  >
                    {site[0].sites?.map((item, index) => {
                      return (
                        <Menu.Item
                          onPress={() => {}}
                          title={item.site_name}
                          key={index}
                        />
                      );
                    })}
                    {/* <Menu.Item onPress={() => {}} title="Item 1" />
                    <Menu.Item onPress={() => {}} title="Item 2" />
                    <Menu.Item onPress={() => {}} title="Item 3" /> */}
                  </Menu>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 8,
                  color: isSwitchOn ? "white" : "black",
                }}
              >
                {site !== null
                  ? site[0]?.zoo_description
                  : "Site address of the zoo"}
              </Text>
            </View>
            <View>
              <Badge
                visible={unreadNotifications && unreadNotifications > 0}
                size={wp(3.8)}
                style={{ position: "absolute", top:hp(1), right: wp(1) }}
              >
                {unreadNotifications}
              </Badge>
              <Appbar.Action
                icon={unreadNotifications ? "bell" : "bell-outline"}
                size={wp(4.5)}
                accessibilityLabel="TagChat"
              />
            </View>
          </View>
          <View style={{margin:wp(1)}}>
          <SearchBox/>
          </View>
        </>
      ) : (
        <View
          style={[
            {
              backgroundColor: isSwitchOn ? "#1F415B" : "white",
            },
            props.style
          ]}
        >
          {props.noIcon ? (
            <View style={[{alignItems: "center", flexDirection: "row", justifyContent : "flex-start", marginHorizontal : 20}]}>
              <MaterialCommunityIcons  name="arrow-left" size={30} color={isSwitchOn ? "white" : "rgba(31, 65, 91, 1)"}  onPress={props.backGoesto ? gotoHome :  gotoBack}/>
              <Text
                style={{
                  marginHorizontal: 50,
                  fontSize: 25,
                  color: isSwitchOn ? "white" : "rgba(31, 65, 91, 1)",
                  textAlign: "center",
                  fontWeight:"400"
                }}
              >
                {props.title}
              </Text>
              {/* <MaterialCommunityIcons color={isSwitchOn ? "white" : "#1F415B"} name="dots-vertical" size={30} /> */}
            </View>
          ) : (
            <Appbar.Header mode="small">
              <Appbar.Action icon="close" size={34} onPress={gotoBack} />

              <Appbar.Content displayName={props?.title ?? ""} style={{ alignItems: "center" }} />

              <Appbar.Action icon="check" size={34} onPress={props.onPress} />
            </Appbar.Header>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: deviceWidth,
    width: deviceWidth,
    height: 70,
    alignSelf: "center",
    flexDirection: "row",
    borderColor: "red",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftIcon: {
    maxWidth: 150,
    width: "auto",
    height: 50,
    borderColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingRight: 15,
  },
  rightIcon: {
    maxWidth: 150,
    width: "auto",
    height: 50,
    borderColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingRight: 15,
  },
});

export default MedicalHeader;

//  <<<<<<<<<<<<<---------- Documentation for My header component------------>>>>>>>>> //
// step-1 --->> you have to call a function & pass it as a props named addHeader //
// step-2 --->>  you can add multiple icon into header by adding it into the function as many as you want //
// function returns multiple icons //

// const handleHeaderFun = () => {
// 	return (
// 		<>
// 			<View style={{ marginLeft: 10, flexDirection: "row" }}>
// 				<Entypo name="export" size={24} color="white" />
// 			</View>
// 			<View style={{ marginLeft: 10, flexDirection: "row" }}>
// 				<AntDesign name="retweet" size={24} color="white" />
// 			</View>
// 			<View style={{ marginLeft: 10, flexDirection: "row" }}>
// 				<AntDesign name="pluscircle" size={24} color="white" />
// 			</View>
// 		</>
// 	);
// };

// {props.noIcon ? (
//   <View style={styles.leftIcon}></View>
// ) : (
//   <TouchableOpacity style={styles.leftIcon} onPress={gotoBack}>
//     <Entypo name="cross" size={32} color="black" />
//   </TouchableOpacity>
// )}
// <Text style={{ fontSize: 25, color: "black", textAlign: "center" }}>
//   {props.title}
// </Text>
// {props.noIcon ? (
//   <View style={styles.leftIcon}></View>
// ) : (
//   <TouchableOpacity
//     onPress={props.onPress}
//     style={[styles.rightIcon]}
//   >
//     <AntDesign name="check" size={30} color="black" />
//     {props.addHeader ? props.addHeader : null}
//   </TouchableOpacity>
// )}
