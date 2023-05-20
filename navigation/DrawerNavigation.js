import React, { useContext, useState } from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { default as Colors } from "../configs/Colors";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import BottomNavigator from "./BottomTabNavigation";
import { clearAsyncData } from "../utils/Utils";
import BottomTab from "./BottomTab";
import { Divider, Drawer, Switch } from "react-native-paper";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../redux/DarkModeReducer";
import { setSignOut } from "../redux/AuthSlice";

const Drawers = createDrawerNavigator();
export const CustomDrawerContent = (props) => {
  const [active, setActive] = React.useState("");
  const version = Constants.manifest.version;
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const zoos = useSelector((state) => state.UserAuth.zoos);
  const dispatch = useDispatch();

  const onToggleSwitch = () => {
    dispatch(setDarkMode(!isSwitchOn));
  };
  const gotoHome = () => props.navigation.navigate("Home");
  const gotoLogout = () => {
    clearAsyncData("@antz_user_data");
    clearAsyncData("@antz_user_token");
    dispatch(setSignOut());
  };
  const gotoEducation = () => props.navigation.navigate("Education");
  const gotoWorkExperience = () => props.navigation.navigate("WorkExperience");

  return (
    <>
      <DrawerContentScrollView
        {...props}
        style={{ backgroundColor: isSwitchOn ? "#1F415B" : "#fff" }}
      >
        <View style={styles.drawerTop}>
          <Image
            source={require("../assets/lset.png")}
            resizeMode="center"
            style={{ width: "65%" }}
          />
        </View>
        <Divider style={{ marginBottom: -10 }} />
        <DrawerItemList {...props} />
        {zoos &&
          zoos.map((item) => {
            return (
              <Drawer.Item
                label={item.zoo_name}
                active={active === "first"}
                key={item.zoo_id}
                onPress={() => setActive("first")}
                icon={({ focused, color }) => (
                  <FontAwesome
                    name="paw"
                    size={24}
                    color="black"
                    style={[focused ? { color: "#FFF" } : null]}
                  />
                )}
              />
            );
          })}

        <Divider style={{ marginVertical: 10 }} />

        <Drawer.Item
          label="Dark Mode"
          active={active === "third"}
          onPress={() => setActive("third")}
          right={() => {
            return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          }}
          icon={({ focused, color }) => (
            <FontAwesome
              name="moon-o"
              size={22}
              style={[focused ? { color: "#FFF" } : null]}
            />
          )}
        />
       

        <Drawer.Item
          label="Settings"
          active={active === "fourth"}
          onPress={() => setActive("fourth")}
          icon={({ focused, color }) => (
            <Feather
              name="settings"
              size={22}
              style={[focused ? { color: "#FFF" } : null]}
            />
          )}
        />
        <Drawer.Item
          label="Sign Out"
          active={active === "fifth"}
          icon={({ focused, color }) => (
            <Ionicons
              name="power"
              size={21}
              style={[focused ? { color: "#FFF" } : null]}
            />
          )}
          onPress={gotoLogout}
        />
      </DrawerContentScrollView>

      <View style={{ backgroundColor: isSwitchOn ? "#1F415B" : "#fff" }}>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 30,
          }}
        >
          <Image
            source={require("../assets/antz.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ color: "#C3CEC7", fontSize: 12 }}>
            Version {version}
          </Text>
        </View>
      </View>
    </>
  );
};

const DrawerNavigator = () => (
  <Drawers.Navigator
    screenOptions={{
      itemStyle: { marginVertical: 5 },
      headerShown: false,
      drawerActiveBackgroundColor: false,
    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawers.Screen
      component={BottomTab}
      name="Zoos"
      options={{
        drawerLabel: ({ focused, color }) => (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#49454F",
              marginLeft: 10,
            }}
          >
            {"Zoos"}
          </Text>
        ),
      }}
      onPress={() => setActive("first")}
    />
  </Drawers.Navigator>
);

const styles = StyleSheet.create({
  drawerTop: {
    height: "20%",
    justifyContent: "center",
    marginLeft: 20,
  },
  logo: {
    // width: "65%",
  },
  itemText: {
    marginLeft: -10,
  },
  iconStyle: {
    width: 25,
    color: Colors.textColor,
    fontSize: 20,
    marginLeft: 10,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  v3Wrapper: {
    marginLeft: 16,
    marginRight: 24,
    padding: 0,
  },
});

export default DrawerNavigator;

{
  /* <Drawers.Screen
component={BottomNavigator}
name="Paradise Reptiles"
options={{
  drawerLabel: ({ focused, color }) => (
    <Text style={[styles.itemText]}>{"Paradise Reptiles"}</Text>
  ),
  drawerIcon: ({ focused, color }) => (
    <FontAwesome
      name="paw"
      size={24}
      color="black"
      style={[styles.iconStyle]}
    />
  ),
}}
onPress={() => setActive("second")}
/> */
}
