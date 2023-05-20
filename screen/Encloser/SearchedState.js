// created by Wasim Akram
// Created at 11/05/2023
// modified by : Ganesh Aher at 12/05/2023

import React, { useEffect, useState, useRef, useCallback } from "react";
import Category from "../../components/DropDownBox";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";

import { GetEnclosure } from "../../services/FormEnclosureServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import Loader from "../../components/Loader";
import Colors from "../../configs/Colors";
import AddMedicalRecordCard from "../../components/AddMedicalRecordCard";
import SearchAnimalHeader from "../../components/SearchAnimalHeader";
import { getAnimalConfigs } from "../../services/AnimalService";
import { getZooSite } from "../../services/AddSiteService";
const arr = [
  {
    id: 1,
    title: "Nanday Conure",
    title_id: "A000093",
    sex_data: { male: "M", female: "F" },
  },
  {
    id: 2,
    title: "Nanday Conure",
    title_id: "B000093",
    sex_data: { male: "M", female: "F" },
  },
  {
    id: 3,
    title: "Canday Conure",
    title_id: "C000093",
    sex_data: { male: "M", female: "F" },
  },
  {
    id: 4,
    title: "Fanday Conure",
    title_id: "C000093",
    sex_data: { male: "M", female: "F" },
  },
  {
    id: 5,
    title: "Janday Conure",
    title_id: "D000093",
    sex_data: { male: "M", female: "F" },
  },
  {
    id: 6,
    title: "Tanday Conure",
    title_id: "E000093",
    sex_data: { male: "M", female: "F" },
  },
  {
    id: 7,
    title: "Tanday Conure",
    title_id: "E000093",
    sex_data: { male: "M", female: "F" },
  },
  {
    id: 8,
    title: "Tanday Conure",
    title_id: "E000093",
    sex_data: { male: "M", female: "F" },
  },
  {
    id: 9,
    title: "Tanday Conure",
    title_id: "E000093",
    sex_data: { male: "M", female: "F" },
  },
];

const SearchedState = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  const [collectiondataOpen, setCollectiondataOpen] = useState(false);
  const [collectiondataValue, setCollectiondataValue] = useState("");

  const [collectiondata, setCollectionData] = useState([]);

  const [siteDataValue, setSiteDataValue] = useState("");

  const [siteData, setSiteData] = useState([]);
  const [putDateData, setPutDateData] = useState([
    {
      value: 1,
      label: "SitesName1",
    },
    {
      value: 2,
      label: "SitesName2",
    },
    {
      value: 3,
      label: "SitesName3",
    },
    {
      value: 4,
      label: "SitesName4",
    },
  ]);
  console.log("putDateData", putDateData);

  const [putDateValue, setPutDateValue] = useState("");

  useEffect(() => {
    Promise.all([getAnimalConfigs(), getZooSite(zooID)])
      .then((res) => {
        console.log("got the api data======>", res[0].data);
        setCollectionData(
          res[0].data.animal_indetifier.map((item) => ({
            value: item.id,
            label: item.label,
          }))
        );
        setSiteData(
          res[1].data.map((item) => ({
            label: item.site_name,
            value: item.site_id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // console.log("okkkkk");
        setLoading(false);
      });
  }, []);

  const gotoBackPage = () => navigation.goBack();
  return (
    <>
      <SearchAnimalHeader
        onPressFirst={gotoBackPage}
        // onPressSecond={() => navigation.navigate("Searchanimal")}
      />
      <Loader visible={Loading} />
      <View style={styles.container}>
        <View style={styles.searchbox}>
          {/* <ScrollView> */}
          <View
            style={{
              marginTop: heightPercentageToDP(1),
              flexDirection: "row",
              justifyContent: "space-around",
              marginHorizontal: 13,
              width: widthPercentageToDP(98),
            }}
          >
            <View>
              <Dropdown
                style={styles.lastweekDropdown}
                placeholderStyle={styles.placehStyle}
                selectedTextStyle={styles.itemstyle}
                data={putDateData}
                labelField="label"
                valueField="value"
                placeholder="Added last week"
                searchPlaceholder="Search..."
                value={putDateValue}
                onChange={(item) => {
                  setPutDateValue(item.value);
                }}
              />
            </View>
            <View>
              <Dropdown
                style={styles.collectionsDropdown}
                placeholderStyle={styles.placehStyle}
                selectedTextStyle={styles.itemstyle}
                data={collectiondata}
                labelField="label"
                valueField="value"
                placeholder="Collection"
                searchPlaceholder="Search..."
                value={collectiondataValue}
                onChange={() => {
                  setCollectiondataValue(collectiondata);
                }}
              />
            </View>
            <View>
              <Dropdown
                style={styles.siteDropdown}
                placeholderStyle={styles.placehStyle}
                selectedTextStyle={styles.itemstyle}
                data={siteData}
                labelField="label"
                valueField="value"
                placeholder="Site"
                searchPlaceholder="Search..."
                value={siteDataValue}
                onChange={(item) => setSiteDataValue(item.value)}
              />
            </View>
          </View>

          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              color: "#44544A",
              marginLeft: widthPercentageToDP(7),
              marginTop: heightPercentageToDP(3),
            }}
          >
            Search results
          </Text>

          <View
            style={{
              marginHorizontal: widthPercentageToDP(5),
              marginBottom: heightPercentageToDP(28),
              alignItems: "center",
            }}
          >
            <FlatList
              data={arr}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <>
                    <AddMedicalRecordCard
                      backgroundColorimg={"red"}
                      backgroundColor={"white"}
                      children={
                        <>
                          <Text style={styles.subtitle}>{item.title}</Text>
                          <View
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Text style={styles.subtitle}>{item.title_id}</Text>
                            <Text style={styles.MBox}>
                              {item.sex_data.male}
                            </Text>
                            <Text style={styles.BBox}>
                              {item.sex_data.female}
                            </Text>
                          </View>
                          <Text style={styles.subtitle1}>
                            Enclosure Name,Section Name
                          </Text>
                        </>
                      }
                      imgPath={require("../../assets/antz.png")}
                    />
                  </>
                );
              }}
            />
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    </>
  );
};

export default SearchedState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(218, 231, 223, 1)",
  },
  Searchbar: {
    width: widthPercentageToDP(100),
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
  },

  title: {
    fontSize: widthPercentageToDP(4.8),
    fontWeight: "500",
    color: Colors.subtitle,
    width: "100%",
  },

  //   subtitle: {
  //     fontSize: widthPercentageToDP(4.5),
  //     color: Colors.subtitle,
  //     fontWeight: "600",
  //     fontStyle: "italic",
  //   },

  ScientificName: {
    fontSize: widthPercentageToDP(4.5),
    color: Colors.subtitle,
    fontWeight: "300",
    fontStyle: "italic",
  },

  MBox: {
    marginLeft: widthPercentageToDP(3),
    paddingTop: widthPercentageToDP(0.3),
    padding: widthPercentageToDP(1.5),
    borderRadius: widthPercentageToDP(2),
    height: heightPercentageToDP(3),
    backgroundColor: Colors.mbox,
  },
  BBox: {
    marginLeft: widthPercentageToDP(3),
    paddingTop: widthPercentageToDP(0.3),
    padding: widthPercentageToDP(1.5),
    borderRadius: widthPercentageToDP(2),
    height: heightPercentageToDP(3),
    backgroundColor: Colors.bBox,
  },

  secondItembox: {
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(2),
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginHorizontal: 4,
  },

  collectionsDropdown: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(5),
    borderColor: Colors.boxBorderColor,
    borderWidth: widthPercentageToDP(0.3),
    borderRadius: 8,
    // marginLeft: widthPercentageToDP(4),
    backgroundColor: "white",
  },

  lastweekDropdown: {
    width: widthPercentageToDP(39),
    height: heightPercentageToDP(5),
    borderColor: Colors.boxBorderColor,
    borderWidth: widthPercentageToDP(0.3),
    borderRadius: 8,
    // marginLeft: widthPercentageToDP(4),
    backgroundColor: "white",
  },
  siteDropdown: {
    width: widthPercentageToDP(20),
    height: heightPercentageToDP(5),
    borderColor: Colors.boxBorderColor,
    borderWidth: widthPercentageToDP(0.3),
    marginRight: widthPercentageToDP(3),
    borderRadius: 8,
    backgroundColor: "white",
  },
  speciesDropdown: {
    width: widthPercentageToDP(25),
    height: heightPercentageToDP("4.7%"),
    borderColor: "gray",
    borderWidth: widthPercentageToDP(0.3),
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  textBox: {
    marginTop: heightPercentageToDP(3),
    alignItems: "flex-start",
    width: widthPercentageToDP(90),
  },

  textstyle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F415B",
  },
  dropdownBox: {
    marginTop: heightPercentageToDP(2),
    width: widthPercentageToDP(90),
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
  footerStyle: {
    position: "absolute",
    bottom: 0,
  },
  boxStyle: {
    width: widthPercentageToDP(90),
    borderWidth: 1,
    borderColor: "#C3CEC7",
    borderRadius: 4,
    paddingTop: heightPercentageToDP(1.5),
    backgroundColor: "#F2FFF8",
  },

  boxstylesecond: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(10),
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: heightPercentageToDP(1.5),
  },
  selectTextstyle: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "left",
    marginLeft: widthPercentageToDP(2.5),
  },
  cardstyle: {
    backgroundColor: "##F2FFF8",
    borderRadius: widthPercentageToDP("2%"),
    marginVertical: widthPercentageToDP("2%"),
    borderColor: "grey",
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
    width: widthPercentageToDP(85),
    alignSelf: "center",
  },
  modalMaster: {
    flex: 1,
  },
  modalview: {
    width: widthPercentageToDP(90),
    flex: 0.9,
    backgroundColor: Colors.deemWhite,
    borderRadius: 12,
  },
  overlay: {
    flex: 0.1,
  },
  headerStyle: {
    width: widthPercentageToDP(60),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: heightPercentageToDP(3),
  },
  headerText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
  },
  modalFirstbox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: heightPercentageToDP(2),
  },
  listofModalStyle: {
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(3),
  },
  modalCardStyle: {
    backgroundColor: Colors.white,
    // marginVertical: widthPercentageToDP("2%"),
    borderTopWidth: 0.2,
    borderBottomWidth: 0.3,

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
    width: widthPercentageToDP(90),
    alignSelf: "center",
  },

  modalSearchplaceholderStyle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  tagsContainer: {
    flexDirection: "row",
  },
  tag: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    // paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  malechipText: {
    fontSize: 12,
    color: "#1F515B",
  },
  femalechipText: {
    fontSize: 12,
    color: "#1F515B",
  },
  malechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#DAE7DF",
    marginHorizontal: 5,
    fontWeight: 500,
  },
  femalechip: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#DAE7DF",
    fontWeight: 500,
    marginLeft: 5,
  },
  malechipM: {
    backgroundColor: "#DAE7DF",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    marginHorizontal: 5,
    fontWeight: 500,
  },
  femalechipF: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#00D6C9",
    fontWeight: 500,
    marginLeft: 5,
  },
  subtitle: {
    fontSize: widthPercentageToDP(4.5),
    color: Colors.subtitle,
    fontWeight: "600",
    // fontStyle: "italic",
    padding: heightPercentageToDP(0.3),
  },
  subtitle1: {
    fontSize: widthPercentageToDP(3.6),
    color: "rgba(68, 84, 74, 1)",
    fontWeight: "600",
    // fontStyle: "italic",
    padding: heightPercentageToDP(0.3),
  },
  MBox: {
    //  borderWidth:0.5,
    marginLeft: widthPercentageToDP(3),
    paddingTop: widthPercentageToDP(0.3),
    padding: widthPercentageToDP(1),
    height: heightPercentageToDP(3),
    backgroundColor: "#DAE7DF",
    borderRadius: 5,
  },
  BBox: {
    //  borderWidth:0.5,
    marginLeft: widthPercentageToDP(2),
    paddingTop: widthPercentageToDP(0.1),
    padding: widthPercentageToDP(1.5),
    height: heightPercentageToDP(2.9),
    backgroundColor: "#00D6C9",
    borderRadius: 5,
  },
});
