import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  AppState,
  View,
  Text,
  Image,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import Navigation from "./navigation/Navigation";
import ErrorBoundary from "react-native-error-boundary";
import Colors from "./configs/Colors";
import { Ionicons } from "@expo/vector-icons";
import { getAsyncData, saveAsyncData } from "./utils/Utils";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { setSignIn } from "./redux/AuthSlice";
import { setSites } from "./redux/SiteSlice";
import { getRefreshToken } from "./services/AuthService";



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      isReady: false,
      appState: AppState.currentState,
      location: {},
      permissionStatus: "",
    };

    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();
  }

  async componentDidMount() {
    this.onStart();
    // For get the AppState
    this.appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("App has come to the foreground!");
        }
        this.setState({ appState: nextAppState });
      }
    );

    this.connectionSubscription = NetInfo.addEventListener(
      this.handleConnectionInfoChange
    );

    this.notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    this.responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
  }

  componentWillUnmount = () => {
    this.appStateSubscription.remove();

    Notifications.removeNotificationSubscription(
      this.notificationListener.current
    );

    Notifications.removeNotificationSubscription(this.responseListener.current);
    this.connectionSubscription && this.connectionSubscription();
  };

  handleConnectionInfoChange = (state) => {
    this.setState({ isConnected: state.isConnected });
  };

  onStart = async () => {
    // console.log("Called onStart()");
    try {
      let fontSources = {
        InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
        InterBold: require("./assets/fonts/Inter-Bold.ttf"),
        InterLight: require("./assets/fonts/Inter-Light.ttf"),
        InterExtraLight: require("./assets/fonts/Inter-ExtraLight.ttf"),
        InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
        InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
        ...Ionicons.font,
      };

      Promise.all([
        Font.loadAsync(fontSources),
        getAsyncData("@antz_user_data"),
        getRefreshToken()
      ])
        .then((response) => {
            store.dispatch(setSignIn(response[1]))
            saveAsyncData("@antz_user_token", response[2].token);
            store.dispatch(setSignIn(response[2]))
            store.dispatch(setSites(response[2].user.zoos[0].sites))

            // if (response[1] != null) {
            //   getRefreshToken().then((res) => {
            //     saveAsyncData("@antz_user_token", res.token);
            //     store.dispatch(setSignIn(res))
            //     store.dispatch(setSites(res.user.zoos[0].sites))
            //   }).catch((err) => console.log(err))
            // }
        })
        .catch((error) => console.log(error));
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState({
        isReady: true,
      });
    }
  };

  hideScreen = async () => {
    if (this.state.isReady) {
      await SplashScreen.hideAsync();
    }
  };

  render = () => {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <SafeAreaView style={styles.container}>
            {this.state.isReady ? (
              <>
                {this.state.isConnected ? (
                  <Navigation />
                ) : (
                  <View style={styles.offlineView}>
                    <Ionicons
                      name="cloud-offline"
                      size={50}
                      color={Colors.tomato}
                    />
                    <Text style={styles.offlineText}>You are offline</Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.container}>
                <Image
                  source={require("./assets/splash.png")}
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
            )}
          </SafeAreaView>
        </ErrorBoundary>
      </Provider>
    );
  };
}


const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  offlineView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGrey,
  },
  offlineText: {
    fontSize: 14,
    color: Colors.textColor,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});