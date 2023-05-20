// Modify By Wasim Akram at 08/05/2023
// navigation add to navigate Editsite screen and item pass to that screen

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import FloatingButton from "../../../components/FloatingButton";
import Loader from "../../../components/Loader";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { deletesite, getZooSite } from "../../../services/AddSiteService";
import ListComponent from "../../../components/ListComponent";
import { useSelector } from "react-redux";
import { heightPercentageToDP } from "react-native-responsive-screen";

const ListSite = () => {
  const [siteData, setSiteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getRefreshData();
    });
    return unsubscribe;
  }, [navigation]);

  const getRefreshData = () => {
    setRefreshing(true);
    setIsLoading(true);
    getZooSite(zooID)
      .then((res) => {
        setSiteData(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(() => {
        setRefreshing(false);
        setIsLoading(false);
      });
  };

  const deleteSite = (item) => {
    setIsLoading(true);
    let obj = {
      id: item.id,
    };
    deletesite(obj)
      .then((res) => {
        if (!res.success) {
          alert("Something went wrong!!");
        } else {
          alert("Deleted Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const InnerComponent = ({ item }) => {
    const {
      site_id,
      site_name,
      user_id,
      full_access,
      active,
      created_at,
      modified_at,
    } = item.item;
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text>Id:</Text>
          <Text style={styles.idNumber}>{site_id}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Site Name:</Text>
          <Text style={styles.idNumber}>{site_name}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>User Id:</Text>
          <Text style={styles.idNumber}>{user_id}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Full Access :</Text>
          <Text style={styles.idNumber}>{full_access}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Active :</Text>
          <Text style={styles.idNumber}>{active}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Created_at:</Text>
          <Text style={styles.idNumber}>{created_at}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Modified_at:</Text>
          <Text style={styles.idNumber}>{modified_at}</Text>
        </View>
      </View>
    );
  };

  const editExperienceData = ({ item }) => {
    navigation.navigate("CreateSite", { item });
  };

  return (
    <>
      <Loader visible={isLoading} />
      <Header noIcon={true} title={"Sites"} />
      <View
        style={[
          styles.container,
          { backgroundColor: isSwitchOn ? "#1F415B" : "#DAE7DF" },
        ]}
      >
        <View style={styles.listSection}>
          <FlatList
            data={siteData}
            renderItem={(item) => (
              <ListComponent
                item={item}
                onPress={() => navigation.navigate("EditSite", { site: item })}
              >
                <InnerComponent item={item} />
              </ListComponent>
            )}
            showsVerticalScrollIndicator={false}
            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getRefreshData} />}
          />

          <FloatingButton
            icon="plus-circle-outline"
            backgroundColor="#eeeeee"
            borderWidth={0}
            borderColor="#aaaaaa"
            borderRadius={50}
            linkTo=""
            floaterStyle={{ height: 60, width: 60 }}
            onPress={() => navigation.navigate("CreateSite")}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  listSection: {
    flex: 1,
    // backgroundColor:'red'
    marginBottom:heightPercentageToDP(12.5)
  },
});

export default ListSite;
