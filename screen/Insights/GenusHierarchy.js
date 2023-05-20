// DATE:13 APRIL 2023
// NAME: GANESH AHER
// WORK:
// 1. fixed parot ScrollView
// 2. fixed the Image issues in FamilyHierarchy page
// 3. fixed the  header issues in FamilyHierarchy page
// 4. Design the Title in FamilyHierarchy page

// modify By : Gaurav Shukla
//date:04-05-2023
//description: remove the Background image form header and give the desing according figma(DefaultOverlayContent) .

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
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
// import Loader from "../../components/Loader";
import { Card } from "react-native-paper";
import CustomCard from "../../components/CustomCard";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../configs/Colors";
import OverlayContent from "../../components/OverlayContent";
import DefaultOverlayContent from "../../components/DefaultOverlayContent";

export default function FamilyHierarchy() {
  const navigation = useNavigation();
  const route = useRoute();

  //for header BackGround Image
  const [showBackgroundImage, SetShowBackgroundImage] = useState(false);

  //Getting current ZooID
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  //Control HomeStat Card
  const [showOrder, setShowOrder] = useState(false);

  //HomeStat Data
  const [orderHierchyData, setOrderHierchyData] = useState([]);

  useEffect(() => {
    getHierarchy({
      zoo_id: zooID,
      type: "genus",
      parent_tsn: route.params?.tsn_id ?? 0,
    })
      .then((res) => {
        setOrderHierchyData(res.data);
        setShowOrder(true);
        console.log("data>>>>>>>>>>>>>>>>>>", res.data);
      })
      .catch((err) => console.log("Stats Err", err));
  }, []);

  if (!showOrder) {
    return null;
  }
  return (
    <>
      <StatusBar />

      {showBackgroundImage === true ? (
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
      ) : (
        <View style={styles.DefaultheaderContainer}>
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

      <View style={{flex: 1, height: "100%", backgroundColor: "#DAE7DF", }}>
        <FlatList
          data={orderHierchyData.classification_list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={{ marginHorizontal: 14 }}>
                <CustomCard
                  title={item.common_name}
                  icon={route.params.icon}
                  subtitle={
                    item.common_name
                      ? `(${item?.complete_name ?? ""})`
                      : item?.complete_name
                  }
                  tsn_id={item.tsn_id}
                  onPress={() =>
                    navigation.navigate("SpeciesHierarchy", {
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: "31%",
    width: "100%",
  },
  DefaultheaderContainer:{
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
    
    marginHorizontal : 14,
    marginVertical : 10,
    height: 129,
    backgroundColor: "#F2FFF8",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 10,
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
});
