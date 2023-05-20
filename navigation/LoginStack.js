import React from "react";
import {
	createStackNavigator,
	CardStyleInterpolators,
} from "@react-navigation/stack";
import LoginScreen from "../screen/LoginScreen/LoginScreen";



const Stack = createStackNavigator();

const LoginStack = () => (
	<Stack.Navigator
		initialRouteName="Login"
		screenOptions={{
			headerShown: false,
			cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
		}}
	>
		<Stack.Screen name="Login" component={LoginScreen} />
	</Stack.Navigator>
);

export default LoginStack;
