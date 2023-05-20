// modify By : Gaurav Shukla
//date:04-05-2023
//description: remove the Background image form header and
//give the desing according figma(DefaultOverlayContent) .

import React, { useState, useEffect } from "react";
// import all the components we are going to use
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Animated,
  Text,
  FlatList,
  StatusBar,
  ImageBackground,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { capitalize } from "../../utils/Utils";
//Import API CALLS
import { getHierarchy } from "../../services/StatsService";
import { Card } from "react-native-paper";
import CustomCard from "../../components/CustomCard";
import { Entypo } from "@expo/vector-icons";
import Loader from "../../components/Loader";
import Colors from "../../configs/Colors";
import OverlayContent from "../../components/OverlayContent";
import DefaultOverlayContent from "../../components/DefaultOverlayContent";

const FamilyHierarchy = () => {
  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Maximum_Height = 200;
  //Max Height of the Header
  const Header_Minimum_Height = 50;
  //Min Height of the Header

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height],
    outputRange: ["#4286F4", "#fff"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height],
    outputRange: [Header_Maximum_Height, 50],
    extrapolate: "clamp",
  });

  const navigation = useNavigation();
  const route = useRoute();

  //Getting current ZooID
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  //Control HomeStat Card
  const [showOrder, setShowOrder] = useState(false);

  //HomeStat Data
  const [orderHierchyData, setOrderHierchyData] = useState([]);
  const [Loading, setLoading] = useState(false);

  const [showBackgroundImage, SetShowBackgroundImage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getHierarchy({
      zoo_id: zooID,
      type: "family",
      parent_tsn: route.params?.tsn_id ?? 0,
    })
      .then((res) => {
        setOrderHierchyData(res.data);
        setShowOrder(true);
        setLoading(false);
      })
      .catch((err) => console.log("Stats Err", err))
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={Loading} />
      <View style={styles.container}>
       
          {showBackgroundImage === true ? (
             <Animated.View
             style={[
               styles.header,
               {
                 height: animateHeaderHeight,
                 backgroundColor: animateHeaderBackgroundColor,
               },
             ]}
           >
            <View style={styles.headerContainer}>
              <ImageBackground
                style={styles.bgImage}
                source={require("../../assets/image.png")}
              >
                <View>
                  <OverlayContent
                    navigation={navigation}
                    title={capitalize(route.params.title)}
                  />
                </View>
              </ImageBackground>
            </View>
            </Animated.View> 
          ) : (
            <View style={styles.DefaultHeaderContainer}>
              <View>
                <DefaultOverlayContent
                  navigation={navigation}
                  title={capitalize(route.params.title)}
                />
              </View>
            </View>
          )}
        <View style={{ backgroundColor: "#DAE7DF" }}>
          <Card style={styles.cardContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.cardTitle}>All Time Data</Text>

              <Entypo
                name="chevron-small-down"
                size={24}
                color="#006D35"
                style={{ marginTop: 15, right: 10 }}
              />
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.dataRow}>
                <Text style={styles.cardNumber}>46</Text>
                <Text style={styles.cardNumberTitle}>Population</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.cardNumber}>12</Text>
                <Text style={styles.cardNumberTitle}>Birth</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.cardNumber}>5</Text>
                <Text style={styles.cardNumberTitle}>Mortality</Text>
              </View>
            </View>
          </Card>
        </View>
        <ScrollView
          scrollEventThrottle={16}
          style={{ backgroundColor: "#DAE7DF",flex:1}}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: AnimatedHeaderValue },
                },
              },
            ],
            { useNativeDriver: false }
          )}
        >
            <FlatList
              data={orderHierchyData.classification_list}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginHorizontal: 14 }}>
                    <CustomCard
                      title={item.common_name}
                      subtitle={
                        item.common_name
                          ? `(${item?.complete_name ?? ""})`
                          : item?.complete_name
                      }
                      icon={route.params.icon}
                      tsn_id={item.tsn_id}
                      onPress={() =>
                        navigation.navigate("GenusHierarchy", {
                          tsn_id: item?.tsn_id ?? 0,
                          title: item?.common_name
                          ? capitalize(item?.common_name)
                          : capitalize(item?.complete_name),
                          icon: route.params.icon,
                        })
                      }
                      count={item.animal_count}
                    />
                    
                     
                  </View>
                );
              }}
            />
       
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FamilyHierarchy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: "100%",
    width: "100%",
  },
  DefaultHeaderContainer: {
    height: "20%",
    width: "100%",
    backgroundColor: Colors.ImageBackgroundColor,
  },
  bgImage: {
    height: "100%",
    width: "100%",
  },
  row: {
    paddingTop: "4%",
    paddingBottom: "4%",
    marginHorizontal: "8%",
    flexDirection: "row",
  },
  title: {
    color: "slategrey",
    fontSize: 12,
  },
  cardContainer: {
    marginHorizontal: 14,
    marginVertical: 10,
    height: 129,
    backgroundColor: "#F2FFF8",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 10,
  },
  dataRow: {
    alignItems: "center",
  },
  cardTitle: {
    color: "#006D35",
    fontWeight: "600",
    fontSize: 15,
    margin: 15,
  },
  cardNumber: {
    fontSize: 36,
    fontWeight: "600",
    color: "#1F515B",
  },
  cardNumberTitle: {
    color: "#666666",
  },
  dataRow: {
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  textStyle: {
    textAlign: "center",
    color: "#000",
    fontSize: 18,
    padding: 20,
  },
});
