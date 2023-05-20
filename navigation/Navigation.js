import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import EnclosureForm from "../screen/Encloser/EnclosureForm";
import Education from "../screen/Staff Management/Education";
import ProfileScreen from "../screen/Staff Management/Profile";
import HomeScreen from "../screen/Home";
import CamScanner from "../components/CamScanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigation from "./StackNavigation";
import LoginStack from "./LoginStack";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {useSelector, useDispatch} from 'react-redux'

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const theme = useSelector(state => state.darkMode.theme)
  const isLogin = useSelector((state)=>state.UserAuth.userDetails)

  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {isLogin === null ? (
            <LoginStack />
          ) : (
            <MainStackNavigation />
          )}
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default Navigation;