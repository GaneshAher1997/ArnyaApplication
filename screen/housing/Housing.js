// Created By: Wasim Akram
// created at: 03/05/2023
// modified by Wasim akram at 04/05/2023

import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Colors from "../../configs/Colors";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import HousingInsight from "../../components/HousingInsight";
import {
  getSectioninsight,
  getSectionlisting,
} from "../../services/housingService/SectionHousing";
import { ActivityIndicator } from "react-native-paper";
import HounsingCard from "../../components/housing/HounsingCard";

const DATA = [
  { id: 1, key: "insights" },
  { id: 2, key: "sections" },
];

export const Sectionlist = ({
  sectionData,
  handleLoadMore,
  renderFooter,
  navigation,
}) => {
  return (
    <>
     <View >
     <View style={styles.textbox}>
            <Text style={styles.textStyle}>Sections</Text>
          </View>
      <FlatList
        data={sectionData}
        keyExtractor={(item) => item.section_id}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.4}
        renderItem={({ item }) => (
            <HounsingCard
                title={item.section_name}
                incharge="Charchil"
                chip1={"Enclosures  " + item.total_enclosures}
                chip2={"Animals " + item.total_animals}
                onPress={() =>
                  navigation.navigate("HousingEnclosuer", {
                    section_id: item?.section_id ?? 0,
                  })
                }
              />
        )}
      />
      </View>
    </>
  );
};

const Housing = () => {
  const data = [
    {
      id: 1,
      name: "conure",
    },
    {
      id: 2,
      name: "species",
    },
    {
      id: 3,
      name: "atlantya",
    },
    {
      id: 4,
      name: "atlantya",
    },
    {
      id: 5,
      name: "atlantya",
    },
    {
      id: 6,
      name: "atlantya",
    },
  ];
  const [sectionData, setSectionData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const [insightData, setInsightData] = useState([]);

  useEffect(() => {
    let postData = {
      zoo_id: zooID,
    };
    getSectioninsight(postData)
      .then((res) => {
        setInsightData(res.data.stats);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  // sectionlist API implementation

  useEffect(() => {
    fetchSectionData(page);
  }, []);

  const fetchSectionData = (page) => {
    let requestObj = {
      zoo_id: zooID,
      page: page,
      offset: 6,
    };

    setIsLoading(true);
    getSectionlisting(requestObj)
      .then((res) => {
       
        if (res?.sections[0]) {
          setSectionData((prevSectionData) => [
            ...prevSectionData,
            ...res?.sections[0],
          ]);
        }        
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoadMore = () => {
    console.log("Loading more data...");
    if (!isLoading && sectionData.length > 0) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSectionData(nextPage);
    }
  };

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!isLoading) return null;
    return <ActivityIndicator style={{ color: Colors.primary }} />;
  };

  // console.log("THIS IS THE SECTION DATA IN THE STATE: ", sectionData);

  return (
    <>
       <Header
        title="Housing"
        noIcon={true}
        search={true}
        gotoSearchPage={() => navigation.navigate("HousingSearch")}
        style={{
          paddingBottom: widthPercentageToDP("3%"),
          paddingTop: widthPercentageToDP("2%"),
        }}
      />
      <View style={styles.container}>
        <Loader visible={isLoading} />
   
        <FlatList
          data={DATA}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            item.key == "insights" ? (
               <View style={styles.headerCard}>
            <HousingInsight title={"Insights"} insightData={insightData} />
           </View>
            ) : item.key == "sections" ? ( 
                <Sectionlist
                  sectionData={sectionData}
                  handleLoadMore={handleLoadMore}
                  renderFooter={renderFooter}
                  navigation={navigation}
                 
                />             
            ) : null
          }
        />

      
      </View>
    </>
  );
};

export default Housing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DAE7DF",
    
  },
  headerCard: {
    backgroundColor: "#F2FFF8",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop : 5
  },
  textbox: {
    margin: heightPercentageToDP(2),
    marginBottom: heightPercentageToDP(-0.1),
    alignItems: "flex-start",
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#44544A",
  },
  listitemBox: {
    marginTop: heightPercentageToDP(2),
  },

});
