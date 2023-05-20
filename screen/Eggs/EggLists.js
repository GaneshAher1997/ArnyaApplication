/**
 * Modified By: Biswajit Chakraborty
 * Modification Date: 02/05/23
 */

import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ListComponent from "../../components/ListComponent";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import moment from "moment";
import { getEggsList } from "../../services/EggsService";
import FloatingButton from "../../components/FloatingButton";
import Colors from "../../configs/Colors";

const EggLists = (props) => {
  const navigation = useNavigation();

  const [eggList, setEggList] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const user_id = useSelector((state) => state.UserAuth.userDetails.user_id);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const currentTheme = useSelector((state) => state.darkMode.theme);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData(page);
    });
    return unsubscribe;
  }, [navigation]);

  const getData = (page) => {
    setIsLoding(true);

    let obj = {
      zoo_id: zooID,
      created_by: user_id,
      offset: page,
      limit: 6,
    };

    getEggsList(obj)
      .then((res) => {
        console.log("RESPONSE FROM EGG LIST API: ", res.data);

        if (res.data) {
          setEggList((prevEggsData) => [...prevEggsData, ...res.data]);
        }
        setIsLoding(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoding(false);
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  const InnerList = ({ item }) => {
    const {
      egg_id,
      local_id,
      taxonomy_id,
      enclosure_id,
      user_enclosure_name,
      accession_type,
      lay_date,
      found_date,
      nest_location,
      fertility_status,
      fertility_status_code,
      hatched_status,
      hatched_key,
      accession_status,
      clutch_id,
      description,
    } = item.item;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.innerHeader}>
            <Text>Egg Id:</Text>
            <Text style={styles.idNumber}>{`#${egg_id}`}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>local_id :</Text>
          <Text style={styles.idNumber}>{local_id}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>taxonomy_id:</Text>
          <Text style={styles.idNumber}>{taxonomy_id}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>enclosure_id : </Text>
          <Text style={styles.idNumber}>{enclosure_id}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>user_enclosure_name : </Text>
          <Text style={styles.idNumber}>{user_enclosure_name}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>accession_type:</Text>
          <Text style={styles.idNumber}>{accession_type}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text> lay_date:</Text>
          <Text style={styles.idNumber}>
            {moment(lay_date).format("MMM Do YY")}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text> found_date:</Text>
          <Text style={styles.idNumber}>
            {" "}
            {moment(found_date).format("MMM Do YY")}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>nest_location:</Text>
          <Text style={styles.idNumber}>{nest_location}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>fertility_status:</Text>
          <Text style={styles.idNumber}>{fertility_status}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>fertility_status_code:</Text>
          <Text style={styles.idNumber}>{fertility_status_code}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text> hatched_status:</Text>
          <Text style={styles.idNumber}>{hatched_status}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text> hatched_key:</Text>
          <Text style={styles.idNumber}>{hatched_key}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>accession_status:</Text>
          <Text style={styles.idNumber}>{accession_status}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>clutch_id :</Text>
          <Text style={styles.idNumber}>{clutch_id}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>description:</Text>
          <Text style={styles.idNumber}>{description}</Text>
        </View>
      </View>
    );
  };

  const handleLoadMore = () => {
    console.log("Loading more data...");
    if (!isLoading && eggList.length > 0) {
      const nextPage = page + 1;
      setPage(nextPage);
      getData(nextPage);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header noIcon={true} title={"Eggs List"} />
      <Loader visible={isLoading} />
      <View style={{ flex: 1 }}>
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
          <FlatList
            data={eggList}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            renderItem={(item) => {
              return (
                <ListComponent
                  item={item}
                  onPress={() =>
                    navigation.navigate("EggDetails", { item: item.item })
                  }
                  onPressEdit={() =>
                    navigation.navigate("EditEggForm", { item: item.item })
                  }
                >
                  <InnerList item={item} />
                </ListComponent>
              )
            }}
            keyExtractor={(item) => item.index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
          <FloatingButton
            icon="plus-circle-outline"
            backgroundColor="#eeeeee"
            borderWidth={0}
            borderColor="#aaaaaa"
            borderRadius={50}
            linkTo=""
            floaterStyle={{ height: 60, width: 60 }}
            onPress={() => navigation.navigate("EggsAddForm")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
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
    marginLeft: 3,
    fontWeight: "500",
  },
  shadow: {
    shadowOffset: {
      height: 10,
      width: 5,
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default EggLists;
