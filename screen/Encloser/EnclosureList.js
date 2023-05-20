import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Linking,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { GetEnclosure } from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import FloatingButton from "../../components/FloatingButton";
import { useSelector } from "react-redux";

const EnclosureList = () => {
  const navigation = useNavigation();
  const [enclosureData, setEnclosureData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = () => {
    setRefreshing(true);
    setIsLoading(true);
    $postData = {
      zoo_id: zooID,
    };
    GetEnclosure($postData)
      .then((res) => {
        // console.log( res ,"rrrrrrrrrr");
        setEnclosureData(res.data);
        setIsLoading(false);
      })
      .finally(() => {
        setRefreshing(false);
        setIsLoading(false);
      });
  };

  const openMap = (lat, lng) => {
    console.log("clll");
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${lat},${lng}`;
    const label = "Custom Label";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const handelID = (id) => {
    navigation.navigate("EnclosureDetails", { enclosure_id: id })
  }

  const renderItem = (item) => {
    // console.log(item);
    const {
      enclosure_id,
      enclosure_status,
      user_enclosure_name,
      enclosure_code,
      created_at,
      enclosure_desc,
      enclosure_environment,
      enclosure_sunlight,
      enclosure_lat,
      enclosure_long,
    } = item;
    return (
      <TouchableOpacity
        style={[
          styles.listContainer,
          Platform.OS != "ios" ? styles.shadow : null,
        ]}
        onPress={() => handelID(enclosure_id)}
      >
        <View style={styles.header}>
          <View style={styles.innerHeader}>
            <Text>ID : </Text>
            <Text style={styles.idNumber}>{`#${enclosure_id}`}</Text>
          </View>
          <Text style={{textAlign: "right", width: widthPercentageToDP(20)}}>
            <Ionicons
              onPress={() => openMap(enclosure_lat, enclosure_long)}
              name="navigate"
              size={24}
              color="#00abf0"
            />
          </Text>
          { <Text style={styles.idNumber}>{enclosure_status}</Text> }
        </View>
        <View style={styles.innerHeader}>
          <Text>Name :</Text>
          <Text style={styles.idNumber}>{user_enclosure_name}</Text>
        </View>
        <View style={styles.innerHeader}>
          <Text>Code :</Text>
          <Text style={styles.idNumber}>{enclosure_code}</Text>
        </View>

        <View style={styles.innerHeader}>
          <Text>Descripation :</Text>
          <Text style={styles.idNumber}>{enclosure_desc}</Text>
        </View>

        <View style={styles.innerHeader}>
          <Text>Environment :</Text>
          <Text style={styles.idNumber}>{enclosure_environment}</Text>
        </View>
        <View style={styles.innerHeader}>
          <Text>Sunlite :</Text>
          <Text style={styles.idNumber}>{enclosure_sunlight}</Text>
        </View>

        {/* <View style={styles.innerHeader}>
          <Text>Created at : </Text>
          <Text style={styles.idNumber}>{created_at}</Text>
        </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Loader visible={isLoading || refreshing} />
      <Header title="Enclosures" noIcon={true} />
      <View
        style={[
          styles.container,
          { backgroundColor: isSwitchOn ? "#1F415B" : "#DAE7DF" },
        ]}
      >
        <View style={styles.listSection}>
          <FlatList
            data={enclosureData}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.enclosure_id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={loadData} />
            }
          />
          <FloatingButton
            icon="plus-circle-outline"
            backgroundColor="#eeeeee"
            borderWidth={0}
            borderColor="#aaaaaa"
            borderRadius={50}
            linkTo=""
            floaterStyle={{ height: 60, width: 60 }}
            onPress={() => navigation.navigate("CreateEnclosure")}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  titleSection: {
    marginTop: 14,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    color: "#000",
    lineHeight: 22,
  },
  listSection: {
    // backgroundColor:'#ffe',
    flex: 1,
    marginTop: 15,
  },
  listContainer: {
    backgroundColor: "#ccc",
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    // justifyContent: "space-between",
    width: widthPercentageToDP(100),
    alignItems: "center",
  },
  innerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: widthPercentageToDP(70),
  },
  idNumber: {
    marginLeft: 5,
    width: widthPercentageToDP(45),
    fontWeight: "500",
    textAlign: "left",
  },
  shadow: {
    shadowOffset: {
      height: 10,
      width: 5,
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 1,
    // backgroundColor:'rgba(0,0,0,0.2)'
  },
});

export default EnclosureList;