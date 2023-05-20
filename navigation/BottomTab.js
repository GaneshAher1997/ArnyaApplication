import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import QRCodeScanner from "../components/CamScanner";
import HomeScreen from "../screen/Home";
import Module from "../screen/Module";
import Profile from "../screen/Staff Management/Profile";

const Tab = createMaterialBottomTabNavigator();

 const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      shifting={false}
      sceneAnimationEnabled={true}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
               return focused ? <MaterialCommunityIcons name="home" size={24} color={color} /> : <MaterialCommunityIcons name="home-outline" size={24} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Module}
        options={{
            tabBarIcon: ({ focused, color }) => {
                return focused ? <MaterialCommunityIcons name="widgets" size={24} color={color} /> : <MaterialCommunityIcons name="widgets-outline" size={24} color={color} />
           },
        }}
      />
      <Tab.Screen
        name="Scan"
        component={QRCodeScanner}
        options={{
          tabBarIcon: 'qrcode-scan',
        }}
      />
      <Tab.Screen
        name="Task"
        component={Module}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color={color} /> : <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color={color} />
       },
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? <MaterialCommunityIcons name="account-circle" size={24} color={color} /> : <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />
       },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs