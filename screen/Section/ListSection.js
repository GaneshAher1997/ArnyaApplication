/**
 * Modified By: Biswajit Chakraborty
 * Modification Date: 02/05/23
 */

/**
 * Modified By: Biswajit Chakraborty
 * Modification Date: 08/05/23
 */

/**
 * Modified By: Biswajit Chakraborty
 * Modification Date: 10/05/23
 */

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
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../components/Loader";
import { getSection } from "../../services/staffManagement/getEducationType";
import { Ionicons } from "@expo/vector-icons";
import FloatingButton from "../../components/FloatingButton";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Colors from "../../configs/Colors";

const ListSection = () => {

  const navigation = useNavigation();

  const [sectionData, setSectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const currentTheme = useSelector((state) => state.darkMode.theme);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadData = () => {
    setRefreshing(true);
    setIsLoading(true);
    let postData = {
      zoo_id: zooID,
    };
    getSection(postData)
      .then((res) => {
        // console.log("THIS IS THE SECTIONS LIST: ", res);
        setSectionData(res.data);
        setIsLoading(false);
      })
      .finally(() => {
        setRefreshing(false);
        setIsLoading(false);
      });
  };

  const openMap = (lat, lng) => {
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

  const SectionItem = ({ item }) => {
    const {
      section_id,
      section_name,
      section_incharge,
      section_description,
      created_at,
      section_latitude,
      section_longitude,
    } = item;

    return (
      <>
        <TouchableOpacity
          style={[
            styles.listContainer,
            Platform.OS != "ios" ? styles.shadow : null,
          ]}
          onPress={() => navigation.navigate("EditSection", { section: item })}
        >
          <View style={styles.header}>
            <View style={styles.innerHeader}>
              <Text>ID : </Text>
              <Text style={styles.idNumber}>{`#${section_id}`}</Text>
            </View>
            <Ionicons
              onPress={() => openMap(section_latitude, section_longitude)}
              name="navigate"
              size={24}
              color="#00abf0"
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Name :</Text>
            <Text style={styles.idNumber}>{section_name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Incharge : </Text>
            <Text style={styles.idNumber}>{section_incharge}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Description : </Text>
            <Text style={styles.idNumber}>{section_description}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Created at : </Text>
            <Text style={styles.idNumber}>{created_at}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  // console.log("THIS IS THE DATA FROM STATE: ", sectionData);

  return (
    <>
      <Header title="Sections" noIcon={true} />
      <Loader visible={isLoading || refreshing} />

      <View
        style={[
          styles.container,
          {
            backgroundColor: isSwitchOn
              ? currentTheme.colors.background
              : Colors.background,
          },
        ]}
      >
        {/* <View style={styles.titleSection}>
                            <Text style={styles.title}>Sections</Text>
                        </View> */}
        <View style={styles.listSection}>
          <FlatList
            data={sectionData}
            renderItem={({ item }) => <SectionItem item={item} />}
            keyExtractor={sectionData.id}
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
            onPress={() => navigation.navigate("Section")}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: 8,
    paddingTop: 12,
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
    marginTop: 5,
  },
  listContainer: {
    backgroundColor: "#ccc",
    marginVertical: 5,
    borderRadius: 8,
    padding: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  idNumber: {
    marginLeft: 5,
    fontWeight: "500",
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

export default ListSection;
