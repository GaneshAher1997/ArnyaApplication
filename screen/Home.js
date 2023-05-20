import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Animated,
  TouchableOpacity,
  RefreshControl,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { data } from "../configs/Config";
import { buttonData } from "../configs/Config";
import Header from "../components/Header";
import { getRefreshToken } from "../services/AuthService";
import { saveAsyncData, getAsyncData } from "../utils/Utils";
import Colors from "../configs/Colors";
import FloatingButton from "../components/FloatingButton";
import { Button, Menu } from "react-native-paper";
import { BottomPopUp } from "../components/BottomSheet";
import { Avatar, Card, Badge, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { setSignIn } from "../redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import HomeStat from "../components/HomeStat";

//Import API CALLS
import { getHomeStat } from "../services/StatsService";
import DemoCard from "../components/DemoCard";
import Loader from "../components/Loader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const DATA = [
  { id: 1, key: "insights" },
  { id: 2, key: "paradise" },
];

const height = Dimensions.get("window").height;
const CONTAINER_HEIGHT = 112;
const HomeScreen = (props) => {
  //Getting current ZooID
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  //Control HomeStat Card
  const [showStat, setShowStat] = useState(false);

  //HomeStat Data
  const [insightData, setInsightData] = useState([]);

  const [route, setRoute] = useState(false);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const offSetAnim = useRef(new Animated.Value(0)).current;
  // const [expanded, setExpanded] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    getHomeData();
  }, []);

  const getHomeData = () => {
    getHomeStat(zooID)
      .then((res) => {
        setInsightData(res.data);
        setShowStat(true);
        setLoading(false);
      })
      .catch((err) => console.log("Stats Err", err));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    getHomeData();
    setRefreshing(false);
  }, []);

  const accordionHeight = useRef(new Animated.Value(0)).current;
  const handleModalOpen = () => {
    // setExpanded(!expanded);
    Animated.timing(accordionHeight, {
      toValue: expanded ? 0 : 200,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offSetAnim
    ),
    0,
    CONTAINER_HEIGHT
  );
  const Translate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: "clamp",
  });
  let popUpRef = React.createRef();
  const onShowPopUp = () => {
    popUpRef.show();
  };
  const onClosePopUp = (item) => {
    popUpRef.close();
    // setExpanded(false);
  };
  const onIconClick = (item) => {
    popUpRef.close();
    navigation.navigate(item.screen);
    // setExpanded(false);
  };
  useEffect(() => {
    setRoute(true);
  });
  // style={{ flex: 1, backgroundColor: isSwitchOn ? "#1F415B" : "#DAE7DF" }}
  return (
    <View
      style={{ flex: 1, backgroundColor: isSwitchOn ? "#1F415B" : "#DAE7DF" }}
    >
      <Loader visible={Loading} />
      <Animated.View
        style={[styles.header, { transform: [{ translateY: Translate }] }]}
      >
        <Header route={route} />
      </Animated.View>
      <View style={{ flex: 1, margin: 15, marginBottom: 0, marginTop: 0 }}>
        <Animated.FlatList
          data={DATA}
          // contentContainerStyle={{backgroundColor:"green"}}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            item.key == "insights" ? (
              <HomeStat insightData={insightData} showStat={showStat} />
            ) : item.key == "paradise" ? (
              <View style={{ marginBottom: hp(13) }}>
                <DemoCard data={data} isSwitchOn={isSwitchOn} />
              </View>
            ) : null
          }
          contentContainerStyle={styles.contentContainer}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressViewOffset={100}
              style={{ color: "blue" }}
            />
          }
        />
      </View>

      <FloatingButton onPress={onShowPopUp} icon={"plus-circle-outline"} />
      <BottomPopUp
        ref={(target) => (popUpRef = target)}
        onTouchOutside={onClosePopUp}
        title="Add"
      >
        {
          <View style={{ alignItems: "center" }}>
            <FlatList
              numColumns={3}
              data={buttonData}
              width="100%"
              style={{ marginTop: 20, marginBottom: 30 }}
              renderItem={({ item }) => {
                return (
                  <View style={styles.btnCont}>
                    <TouchableOpacity onPress={() => onIconClick(item)}>
                      <View style={{ alignItems: "center" }}>
                        <AntDesign
                          name="pluscircleo"
                          size={30}
                          color="black"
                          style={{ marginBottom: 8 }}
                        />

                        <TouchableOpacity
                        // onPress={() =>
                        //   item.buttonTitle === "Accession"
                        //     ? handleModalOpen()
                        //     : null
                        // }
                        >
                          <Text style={styles.btnText}>{item.buttonTitle}</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            {/* <View>
              {expanded && (
                <Animated.View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: 50,
                    width: "100%",
                    height: "40%",
                    backgroundColor: "gray",
                    height: accordionHeight,
                  }}
                >
                  <Text>accordion content</Text>
                  <Text>accordion content 2</Text>
                </Animated.View>
              )}
            </View> */}
          </View>
        }
      </BottomPopUp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  newsCont: {
    alignItems: "center",
    marginTop: 18,
  },
  newsText: {
    fontSize: 16,
    fontWeight: "600",
  },
  btnCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    padding: "2%",
    marginBottom: 20,
  },
  button: {
    width: "81%",
    borderRadius: 5,
  },
  btnText: {
    fontWeight: "600",
    fontSize: 14,
  },
  AddText: {
    fontSize: 20,
    fontWeight: "700",
    color: "gray",
  },
  contentContainer: {
    marginTop: CONTAINER_HEIGHT,
    // flex:1,
    // backgroundColor:"green"
  },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    marginBottom: 5,
    zIndex: 100,
    backgroundColor: "#F7FDFB",
  },
});

export default HomeScreen;
