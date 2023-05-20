import React, { useState, useEffect } from "react";
import InsightsCard from "../../components/InsightsCard";
import Header from "../../components/Header";
import { Avatar, Card, Chip } from "react-native-paper";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { capitalize } from "../../utils/Utils";
import CustomCard from "../../components/CustomCard";
import { AntDesign } from "@expo/vector-icons";
import Loader from "../../components/Loader";

//Import API CALLS
import { getSpeciesHierarchy } from "../../services/StatsService";
import Colors from "../../configs/Colors";
import OverlayContent from "../../components/OverlayContent";
import DefaultOverlayContent from "../../components/DefaultOverlayContent";

export default function SpeciesHierarchy() {
  const [showBackgroundImage, SetShowBackgroundImage] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  // console.log('THIS IS THE DATA WE ARE LOOKING FOR: ', route.params?.title ?? '');

  //Getting current ZooID
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  //Control HomeStat Card
  const [showOrder, setShowOrder] = useState(false);

  //HomeStat Data
  const [orderHierchyData, setOrderHierchyData] = useState([]);
  const [Loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    getSpeciesHierarchy({
      zoo_id: zooID,
      parent_tsn: route.params?.tsn_id ?? 0,
    })
      .then((res) => {
        // console.log('THIS IS THE RESPONSE FROM SPECIES HIERARCHY', res);
        setOrderHierchyData(res.data);
        setShowOrder(true);
        setLoading(false);
        console.log('THIS IS THE RECEIVED RESPONSE: ', res.data);
      })
      .catch((err) => console.log("Stats Err", err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const GenderChip = ({ data }) => {
    return Object.keys(data).map((key) => (
      <View style={key == "male" ? Styles.malechip : Styles.femalechip}>
        <Text
          style={key == "male" ? Styles.malechipText : Styles.femalechipText}
        >{`${capitalize(key)} - ${data[key]}`}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.screen}>
      <Loader visible={Loading} />
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
                title={capitalize(route.params?.title ?? "")}
              />
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View style={styles.DefaultheaderContainer}>
          <View>
            <DefaultOverlayContent
              navigation={navigation}
              title={capitalize(route.params?.title ?? "")}
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
      <View style={{ flex: 1 }}>
        <FlatList
          data={orderHierchyData.classification_list}
          keyExtractor={(item) => item.tsn_id}
          renderItem={({ item }) => {
            return (
              <View style={{ marginHorizontal: 14 }}>
                <CustomCard
                  title={capitalize(item.common_name)}
                  subtitle={`(${item?.complete_name ?? ""})`}
                  tsn_id={item.tsn_id}
                  icon={route.params.icon}
                  onPress={() => {
                    navigation.navigate("ComonNameDetails", {
                      title: item.common_name,
                      subtitle: item.complete_name,
                      tags: item.sex_data,
                      tsn_id: item.tsn_id,
                      icon: route.params.icon,
                    });
                  }}
                  count={item.animal_count}
                  tags={item.sex_data}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#DAE7DF",
  },
  genderContainer: {
    flexDirection: "row",
  },
  malechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: "#DAE7DF",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  malechipText: {
    fontSize: 12,
    color: "#1F515B",
  },
  femalechipText: {
    fontSize: 12,
    color: "#1F515B",
  },
  femalechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: "#DAE7DF",
    fontWeight: 500,
  },
  headerContainer: {
    height: "31%",
    width: "100%",
  },
  DefaultheaderContainer: {
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
  // Body Container
  bodyContainer: {
    position: "relative",
    bottom: 20,
    flex: 0.55,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: "6%",
  },

  row: {
    paddingTop: "4%",
    paddingBottom: "4%",
    marginHorizontal: "8%",
    flexDirection: "row",
  },

  column: {
    flex: 0.5,
  },

  title: {
    color: "slategrey",
    fontSize: 12,
  },

  description: {
    color: "dimgrey",
    fontSize: 14,
  },

  // Footer Container
  footerContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#eaf3f0",
  },

  footerItem: {
    justifyContent: "center",
    alignItems: "center",
  },

  footerIcon: {
    fontSize: 20,
    color: "dimgrey",
  },

  footerText: {
    fontSize: 12,
    color: "slategrey",
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
  dropdownIcon: {
    fontSize: 12,
    color: "#006D35",
  },
  overLayTitle: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    borderRadius: 10,
  },
})
