// Name: Ganesh Aher
// Date:24 April
// work: Add FlatList

/**
 * Modified By: Biswajit Chakraborty
 * Modification Date: 02/05/23
 *
 * Modification: Applied the centralized the dark mode color
 */

/**
 * Modified By: Biswajit Chakraborty
 * Modification Date: 11/05/23
 * 
 * Modification: Added the pagination functionality
 */

import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import ListComponent from "../../components/ListComponent";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import moment from "moment";
import { getAnimalList } from "../../services/AnimalService";
import FloatingButton from "../../components/FloatingButton";
import Card from "../../components/CustomCard";
import AnimalListCard from "../../components/AnimalListCard";
import { capitalize } from "../../utils/Utils";
import Colors from "../../configs/Colors";

const AnimalList = (props) => {
  const navigation = useNavigation();

  const [eggList, setEggList] = useState([]);
  const [isLoading, setIsLoding] = useState(false);
  const user_id = useSelector((state) => state.UserAuth.userDetails.user_id);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const currentTheme = useSelector((state) => state.darkMode.theme);

  const [page, setPage] = useState(1);

  const getData = (page) => {
    let obj = {
      zoo_id: zooID,
      page: page,
      offset: 6,
    };

    setIsLoding(true);
    getAnimalList(obj)
      .then((res) => {
        // console.log("RESPONSE FROM ANIMAL LIST API: ", res);
        // console.log('I AM CALLED!!!');

        if (res.data) {
          setEggList((prevAnimalData) => [...prevAnimalData, ...res.data]);
        }
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoding(false);
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

  const handleLoadMore = () => {
    // console.log("Loading more data...");
    if (!isLoading && eggList.length > 0) {
      const nextPage = page + 1;
      setPage(nextPage);
      getData(nextPage);
    }
  };

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!isLoading) return null;
    return <ActivityIndicator style={{ color: Colors.primary }} />;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getData(page);
  }, []);

  // console.log('PAGE NUMBER: ', page);

  return (
    <>
      <Header noIcon={true} title={"Animal List"} />
      <Loader visible={isLoading} />
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
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <AnimalListCard
              title={capitalize(item.vernacular_name)}
              subtitle={
                item.local_id == "" || item.local_id == null
                  ? "Animal Id: " + item.animal_id
                  : "Local Id: " + item.local_id
              }
              UserEnclosureName={"Enclosure: " + item.user_enclosure_name}
              onPress={() =>
                navigation.navigate("AnimalsDetails", {
                  animal_id: item.animal_id,
                })
              }
            />
          )}
          keyExtractor={(item) => item.animal_id}
          refreshControl={<RefreshControl onRefresh={getData} />}
        />
        <FloatingButton
          icon="plus-circle-outline"
          backgroundColor="#eeeeee"
          borderWidth={0}
          borderColor="#aaaaaa"
          borderRadius={50}
          linkTo=""
          floaterStyle={{ height: 60, width: 60 }}
          onPress={() => navigation.navigate("AnimalAddDynamicForm")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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

export default AnimalList;
