import React, { useState, useEffect } from "react";
import { Image, ScrollView, View, FlatList, Text } from "react-native";
import InsightsCard from "../../components/InsightsCard";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import InsightAnimalCard from "../../components/InsightAnimalCard";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
//Import API CALLS

import { getHierarchy } from "../../services/StatsService";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const Collections = () => {
  const navigation = useNavigation();

  //Dark time
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

  //Getting current ZooID
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  //Control HomeStat Card
  const [showClass, setShowClass] = useState(false);

  //HomeStat Data
  const [classHierchyData, setClassHierchyData] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getHierarchy({ zoo_id: zooID, type: "class" })
      .then((res) => {
        setClassHierchyData(res.data);
        setShowClass(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Stats Err", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#DAE7DF" }}>
      <Loader visible={Loading} />
      <Header
        title="Collections"
        noIcon={true}
        search={true}
        gotoSearchPage = {() => navigation.navigate("InsightSearching")}
        style={{
          paddingBottom: widthPercentageToDP("3%"),
          paddingTop: widthPercentageToDP("2%"),
        }}
      />

      <ScrollView
        style={{ marginHorizontal: widthPercentageToDP("3.5%") }}
        showsVerticalScrollIndicator={false}
      >
        <InsightsCard
          title={"Insights"}
          middlelabel={198}
          middlabel={437}
          lastlabel={290}
        />

        <View style={{ marginBottom: heightPercentageToDP(2) }}>
          <FlatList
            data={classHierchyData.classification_list}
            numColumns={3}
            columnWrapperStyle={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.tsn_id}
            renderItem={({ item }) => {
              return (
                <>
                  <InsightAnimalCard
                    classData={item}
                    showClassHierchy={showClass}
                    onPress={() => {
                      navigation.navigate("OrderHierarchy", {
                        tsn_id: item.tsn_id,
                        title: item.complete_name,
                        icon: item.default_icon,
                      });
                    }}
                  />
                </>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Collections;
