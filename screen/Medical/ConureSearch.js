// Created By:Wasim Akram;
// Created at: 27/04/2023

import {
  View,
  Text,
  StyleSheet,
  findNodeHandle,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
// import CustomForm from "../../components/CustomForm";
import { Dropdown } from "react-native-element-dropdown";
import { getAnimalConfigs } from "../../services/AnimalService";
import { getZooSite } from "../../services/AddSiteService";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import DatePicker from "../../components/DatePicker";
import { useSelector } from "react-redux";
// import CustomCard from "../../components/CustomCard";

import { capitalize } from "../../utils/Utils";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Footermedical from "../../components/Footermedical";
import SearchAnimalHeader from "../../components/SearchAnimalHeader";
import { useNavigation } from "@react-navigation/native";
import Card from "../../components/CustomCard";

const ConureSearch = (props) => {
  const navigation = useNavigation();

  const [laysDate, setLaysDate] = useState("");
  const [collectiondata, setCollectionData] = useState([]);
  const [siteData, setSiteData] = useState([]);

  const [firstValue, setFirstValue] = useState(null);
  const [secondValue, setSecondValue] = useState(null);

  const [searchdata, setSearchData] = useState(props.route.params);

  const [itemId, setItemId] = useState("");
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  const listData = [
    {
      listname: "peach fonted",
      listId: "A0000008",
    },
    {
      listname: "peach fonted",
      listId: "A0000009",
    },
    {
      listname: "peach fonted",
      listId: "A0000010",
    },
    {
      listname: "peach fonted ",
      listId: "A00000011",
    },
    {
      listname: "peach fonted ",
      listId: "A00000012",
    },
    {
      listname: "peach fonted ",
      listId: "A00000013",
    },
    {
      listname: "peach fonted ",
      listId: "A00000014",
    },
    {
      listname: "peach fonted ",
      listId: "A00000015",
    },
    {
      listname: "peach fonted",
      listId: "A00000016",
    },
  ];

  useEffect(() => {
    // setLoading(true)
    getAnimalConfigs()
      .then((res) => {
        //  console.log("THIS IS RESPONSE ===============>>>>",res.data);
        setCollectionData(
          res.data.animal_indetifier.map((item) => ({
            value: item.id,
            label: item.label,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // console.log("okkkkk");
        // setLoading(false)
      });
  }, []);

  useEffect(() => {
    // setLoading(true);
    getZooSite(zooID)
      .then((res) => {
        //   console.log("site Api data response",res);
        setSiteData(
          res.data.map((item) => ({
            value: item.site_id,
            label: item.site_name,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false)
      });
  }, []);

  const dropdownOff = () => {};
  const chnageCard = (itemID) => {
    // setBgColor(!bgcolor)
    setItemId(itemID);
    // console.log(itemID);
  };
  // console.log(itemId);
  return (
    <>
      <SearchAnimalHeader
        onPressFirst={() => navigation.navigate("EggDetails")}
        onPressSecond={() => navigation.navigate("Searchanimal")}
      />
      <View style={styles.container}>
        <View style={styles.firstItemBox}>
          <DatePicker
            title="Date"
            style={styles.dateDropdown}
            today={laysDate}
            onOpen={dropdownOff}
            rightElement="chevron-down"
            onChange={(date) => {
              setLaysDate(date);
            }}
          />
          <Dropdown
            style={styles.collectionsDropdown}
            placeholderStyle={styles.placehStyle}
            selectedTextStyle={styles.itemstyle}
            data={collectiondata}
            labelField="label"
            valueField="value"
            placeholder="Collection"
            searchPlaceholder="Search..."
            value={firstValue}
            onChange={(item) => {
              setFirstValue(item.value);
            }}
          />
          <Dropdown
            style={styles.siteDropdown}
            placeholderStyle={styles.placehStyle}
            selectedTextStyle={styles.itemstyle}
            data={siteData}
            labelField="label"
            valueField="value"
            placeholder="Site"
            searchPlaceholder="Search..."
            value={secondValue}
            onChange={(item) => {
              setSecondValue(item.value);
            }}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.textStyle}>Search Result</Text>
        </View>
        <ScrollView style={styles.listBox} showsVerticalScrollIndicator={false}>
          <FlatList
            data={searchdata}
            renderItem={({ item }) => {
              return (
                <View style={styles.cardStyle}>
                  <Card
                    title={capitalize(item.common_name)}
                    subtitle={item.parent_tsn}
                    onPress={() => chnageCard(item.parent_tsn)}
                    style={styles.cardView}
                    cardID={itemId}
                    cardIdtobeChecked={item.parent_tsn}
                  />
                </View>
              );
            }}
          />
        </ScrollView>

        {/* <Footermedical /> */}
      </View>
    </>
  );
};

export default ConureSearch;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#DAE7DF",
  },
  firstItemBox: {
    width: widthPercentageToDP(90),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBox: {
    marginTop: heightPercentageToDP(2.5),
    alignItems: "flex-start",
    // borderWidth:1,
    // borderColor:"red",
    width: widthPercentageToDP(90),
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F415B",
  },
  footerBox: {
    height: heightPercentageToDP(15),
    width: widthPercentageToDP(100),
    flexDirection: "row",
    justifyContent: "space-around",
    //  borderWidth:2,
    //  borderColor:"red"
  },
  dateDropdown: {
    // width: widthPercentageToDP(35),
    // height: heightPercentageToDP(5.5),
    flex: 3,
    flexGrow: 0,
    borderColor: "gray",
    borderWidth: widthPercentageToDP(0.3),
    borderRadius: 8,
    // paddingHorizontal: widthPercentageToDP(8),
  },
  collectionsDropdown: {
    // width: widthPercentageToDP(22),
    height: heightPercentageToDP(5.5),
    flex: 4,
    borderColor: "gray",
    borderWidth: widthPercentageToDP(0.3),
    borderRadius: 8,
    marginHorizontal: widthPercentageToDP(5),
    backgroundColor: "white",
  },

  siteDropdown: {
    // width: widthPercentageToDP(15),
    height: heightPercentageToDP(5.5),
    flex: 2,
    borderColor: "gray",
    borderWidth: widthPercentageToDP(0.3),
    borderRadius: 8,
    backgroundColor: "white",
  },
  placehStyle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  itemstyle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  listBox: {
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(2),
  },
  cardStyle: {
    // marginHorizontal:widthPercentageToDP(10)
  },
  cardView: {
    backgroundColor: "#fff",
    borderRadius: widthPercentageToDP("2%"),
    marginVertical: widthPercentageToDP("2%"),

    elevation: 2, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
