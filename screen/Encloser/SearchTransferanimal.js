// created by Wasim Akram
// Created at 10/05/2023

import React, { useEffect, useState } from "react";
import Category from "../../components/DropDownBox";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import { GetEnclosure } from "../../services/FormEnclosureServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import Colors from "../../configs/Colors";

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
import Modal from "react-native-modal";
import Loader from "../../components/Loader";
import VoiceText from "../../components/VoiceText";
import { getSection } from "../../services/staffManagement/getEducationType";
import { getAnimalConfigs, getAnimalList } from "../../services/AnimalService";
import { getZooSite } from "../../services/AddSiteService";

import { searchScientificName } from "../../services/SearchService";
import Card from "../../components/CustomCard";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import HounsingCard from "../../components/housing/HounsingCard";

const arr = [
  {
    id: 1,
    title: "Mount Kailash",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
    page: "InsightAnimalSelect",
  },
  {
    id: 2,
    title: "Nilgriris",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 3,
    title: "Nilgriris ",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 4,
    title: "Nilgriris",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 5,
    title: "Nilgriris ",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 6,
    title: "Nilgriris",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 7,
    title: "Nilgriris",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 8,
    title: "Nilgriris",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 9,
    title: "Taranjeet Singh",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 19,
    title: "Nilgriris",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 29,
    title: "Nilgriris",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
  {
    id: 91,
    title: "Nilgriris",
    title_id: "Supervisor",
    totalenclosure: "30",
    totalAnimal: "20",
  },
];
const SearchTransferanimal = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");

  const [firstValue, setFirstValue] = useState(null);
  const [secondValue, setSecondValue] = useState(null);

  const [searchData, setSearchData] = useState([]);
  const [idData, setIdData] = useState("");

  const [collectiondata, setCollectionData] = useState([]);
  const [siteData, setSiteData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Date");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

 

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleConfirm = (date) => {
    let format = moment(date).format("MMM Do YY");
    setSelectedDate(format);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const staticData = [
    {
      id: "0000A1",
      name: "mountKailash",
      page: "InsightAnimalSelect",
    },
    {
      id: "0000A2",
      name: "mountKailash",
    },
    {
      id: "0000A3",
      name: "mountKailash",
    },
    {
      id: "0000A4",
      name: "mountKailash",
    },
    {
      id: "0000A5",
      name: "mountKailash",
    },

    {
      id: "0000A6",
      name: "mountKailash",
    },
    {
      id: "0000A7",
      name: "mountKailash",
    },
    {
      id: "0000A8",
      name: "mountKailash",
    },
    {
      id: "0000A9",
      name: "mountKailash",
    },
    {
      id: "0000A10",
      name: "mountKailash",
    },
    {
      id: "0000A11",
      name: "mountKailash",
    },
    {
      id: "0000A12",
      name: "mountKailash",
    },
  ];

  const animPressed = (item) => {
    setIsAnimalOpen(!isanimalOpen);
    setAnimalType(item.map((value) => value.name).join(","));
    setAnimalTypeId(item.map((value) => value.id).join(","));
  };

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    let obj = {
      zoo_id: zooID,
    };

    getAnimalList(obj)
      .then((res) => {
        // console.log("RESPONSE FROM EGG LIST API.........................", res.data);
        setAnimalTypeData(
          res.data.map((item) => ({
            id: item.animal_id,
            name: item.complete_name,
          }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    searchValue(searchText);
  }, []);

  const searchValue = (query) => {
    console.log(query);
    let requestObj = {
      zoo_id: zooID,
      searchquery: query,
    };
    searchScientificName(requestObj)
      .then((res) => {
        // console.log('THIS IS THE RESPONSE: ', res);
        setSearchData(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  };

  const SetSelectEncDropDown = () => {
    setIsSelectEnclosure(!isSelectEnclosure);
  };

  const encClose = () => {
    setIsSelectEnclosure(false);
  };
  const onVoiceInput = (text) => {
    setSearchText(text);
  };
  const dropdownOff = () => {
    setIsAnimalOpen(false);
    setIsSecTypeMenuOpen(false);
    setIsSelectEnclosure(false);
    setIsSelectSpecies(false);
  };
  const SetAcsnTypeDropDown = () => {
    setIsSecTypeMenuOpen(!isSecTypeMenuOpen);
  };
  const SetAnimTypeDropDown = () => {
    setIsAnimalOpen(!isanimalOpen);
  };
  const acsnClose = () => {
    setIsSecTypeMenuOpen(false);
  };
  const specClose = () => {
    setIsSelectSpecies(false);
  };
  const animClose = () => {
    setIsAnimalOpen(false);
  };
  const backButton = () => {
    navigation.goBack();
  };

  const gotoSeacrhScreen = () => {
    console.log("THIS IS THE SEARCHDATA: ", searchData);
    navigation.navigate("ConureSearch", searchData);
  };

  const hideCard = () => {
    setSectionType("");
  };
  const crossCard = () => {
    setAnimalType("");
  };
  const closeCard = () => {
    setSelectEnclosure("");
  };

  const handleCardPress = (item) => {
    console.log("THE ITEM: ", item);
    setIdData(item.id);
    navigation.navigate(item.page);
  };

  return (
    <>
      <Loader visible={Loading} />
      <View style={styles.container}>
        <View style={styles.searchbox}>
          <View>
            <Searchbar
              mode="bar"
              placeholder="Search Animal"
              onChangeText={(e) => {
                setSearchText(e);
              }}
              value={searchText}
              // editable={false}
              style={{
                width: widthPercentageToDP(90),
                backgroundColor: "#F2FFF8",
              }}
              icon={(size) => (
                <Ionicons name="arrow-back" size={24} color="black" />
              )}
              onIconPress={backButton}
              autoFocus={true}
              onSubmitEditing={gotoSeacrhScreen}
              right={() => (
                <>
                  <VoiceText resultValue={onVoiceInput} />
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={24}
                    color="black"
                    style={{ marginRight: heightPercentageToDP(3) }}
                  />
                </>
              )}
            />
          </View>
        </View>

        <View style={styles.secondItembox}>
          <View style={styles.dateDropdown}>
            <Text
              style={{
                top: heightPercentageToDP(0.4),
                marginTop: heightPercentageToDP(0.7),
                marginLeft: widthPercentageToDP(2),
              }}
            >
              {selectedDate}
            </Text>
            <View
              style={{
                marginLeft: heightPercentageToDP("11%"),
                bottom: heightPercentageToDP("2%"),
              }}
            >
              <AntDesign
                name="down"
                size={widthPercentageToDP(4)}
                onPress={showDatePicker}
              />
            </View>
          </View>

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
          <Text style={styles.textstyle}>Sections</Text>
        </View>
        <View style={styles.listItem}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={arr}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <HounsingCard
                  title={item.title}
                  incharge="Charchil"
                  chip1={"Enclosures " + item.totalenclosure}
                  chip2={"Animals "+ item.totalAnimal}
                  onPress={(event)=>handleCardPress(item,event)}
                />
              );
            }}
          />
        </View>
      </View>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </>
  );
};

export default SearchTransferanimal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
   
  },
  searchbox: {
    marginTop: heightPercentageToDP(2),
    width: widthPercentageToDP(90),
    justifyContent: "center",
    alignItems: "center",
  },

  secondItembox: {
    marginTop: heightPercentageToDP(3),
    // borderWidth: 1,
    // borderColor: "red",
    width: widthPercentageToDP(90),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateDropdown: {
    width: widthPercentageToDP(28),
    height: heightPercentageToDP(5),
    borderColor: Colors.boxBorderColor,
    borderWidth: widthPercentageToDP(0.3),
    borderRadius: 8,
    marginRight: widthPercentageToDP(1),
    backgroundColor: "white",
  },

  collectionsDropdown: {
    width: widthPercentageToDP(37),
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
    marginRight: widthPercentageToDP(1),
    borderRadius: 8,
    backgroundColor: "white",
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

  cardstyle: {
    backgroundColor: "#ffff",
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
    width: widthPercentageToDP(90),
    alignSelf: "center",
  },
  listItem: {
    // flex: 1,
    // marginTop: heightPercentageToDP(2),
    // width: widthPercentageToDP(99),
    // alignItems: "center",
    // marginBottom:heightPercentageToDP(2)
    // marginHorizontal:12
  },
});
