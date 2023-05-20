// created by Wasim Akram
// Created at 26/04/2023
// modified by: wasim Akram at 03.05.2023

/* modify by - gaurav shukla
    Date - 08-05-023
    Des- change the Ui according bugSheets and fixed the api of postAnimalEnclosure.
*/

import React, { useEffect, useState, useRef } from "react";
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
  TextInput,
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
import Modal from "react-native-modal";
import Loader from "../../components/Loader";
import VoiceText from "../../components/VoiceText";
import { getSection } from "../../services/staffManagement/getEducationType";
import { getAnimalConfigs } from "../../services/AnimalService";
import { getZooSite } from "../../services/AddSiteService";
import Footermedical from "../../components/Footermedical";
import { searchScientificName } from "../../services/SearchService";
import Card from "../../components/CustomCard";
import Colors from "../../configs/Colors";
import { postAnimalEnclosure } from "../../services/AnimalEnclosureService";
import AddMedicalRecordCard from "../../components/AddMedicalRecordCard";
import DatePicker from "../../components/DatePicker";
import moment from "moment/moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MedicalModalCard from "./MedicalModalCard";

const Searchanimal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");

  const [firstValue, setFirstValue] = useState(null);
  const [secondValue, setSecondValue] = useState(null);
  const [modalDropdownVal, setModalDropdownVal] = useState(null);

  const [sectionType, setSectionType] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sectionTypeData, setSectionTypeData] = useState([]);
  const [isSecTypeMenuOpen, setIsSecTypeMenuOpen] = useState(false);

  const [selectEnclosure, setSelectEnclosure] = useState("");
  const [selectEnclosureId, setSelectEnclosureId] = useState("");
  const [selectEnclosureData, setSelectEnclosureData] = useState([]);
  const [isSelectEnclosure, setIsSelectEnclosure] = useState(false);

  const [animalType, setAnimalType] = useState("");
  const [animalTypeData, setAnimalTypeData] = useState([]);
  const [isanimalOpen, setIsAnimalOpen] = useState(false);

  const [searchData, setSearchData] = useState([]);
  const [selectAnimalData, setSelectAnimalData] = useState([]);

  const [collectiondata, setCollectionData] = useState([]);
  const [siteData, setSiteData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  const [visible, setVisible] = useState(false);
  const [searchModalText, setSearchModalText] = useState("");
  const [laysDate, setLaysDate] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Date");
  const [storDate, setStoreDate] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let format = moment(date).format("MMM Do YY");
    console.log("*************Date", format);
    setSelectedDate(format);
    hideDatePicker();
  };

  // function call for modal open
  const modalOpen = () => {
    setVisible(true);
  };
  // function call for modal close
  const closeModal = () => {
    setVisible(false);
  };

  const sectionPressed = (item) => {
    setIsSecTypeMenuOpen(!isSecTypeMenuOpen);
    setSectionType(item.map((value) => value.name).join(","));
    setSectionId(item.map((value) => value.id).join(","));
  };

  const enclosurePressed = (item) => {
    setSelectEnclosure(item[0].name);
    setSelectEnclosureId(item[0].id);
    setIsSelectEnclosure(!isSelectEnclosure);

    let obj = {
      enclosure_id: selectEnclosureId,
    };

    postAnimalEnclosure(obj)
      .then((res) => {
        setAnimalTypeData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    var postData = {
      zoo_id: 12,
    };

    getSection(postData)
      .then((res) => {
        setSectionTypeData(
          res.map((item) => ({ id: item.section_id, name: item.section_name }))
        );
        // console.log('THIS IS THE SECTION DATA: ', res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    let postData = {
      section_id: sectionId,
    };
    GetEnclosure(postData)
      .then((res) => {
        // console.log("EnclResponse===>", res);
        setSelectEnclosureData(
          res.data.map((item) => ({
            id: item.enclosure_id,
            name: item.user_enclosure_name,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // console.log("enclosure======>");
        setLoading(false);
      });
  }, [sectionId]);

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
    getZooSite(zooID)
      .then((res) => {
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
    // console.log(query);
    let requestObj = {
      zoo_id: zooID,
      searchquery: query,
    };
    searchScientificName(requestObj)
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  };


  const dataList = [
    {
      id: 1,
      title: " Mixed wash (up to 15 lbs)",
      price: "₹50",
      image: {
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxLwhTOoIa9eQEGNg0Ne-2OLXFxpdGqwGdg&usqp=CAU",
      },
    },
    {
      id: 2,
      title: " Mixed wash (up to 15 lbs)",
      price: "₹50",
      image: {
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxLwhTOoIa9eQEGNg0Ne-2OLXFxpdGqwGdg&usqp=CAU",
      },
    },
    {
      id: 3,
      title: " Mixed wash (up to 15 lbs)",
      price: "₹50",
      image: {
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxLwhTOoIa9eQEGNg0Ne-2OLXFxpdGqwGdg&usqp=CAU",
      },
    },
  ];
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
    // setIsSelectSpecies(false);
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

  const backButton = () => {
    navigation.goBack();
  };

  const gotoSeacrhScreen = () => {
    console.log("THIS IS THE SEARCHDATA: ", searchData);
    let routeData = {
      query: searchText, // searchText should be in State
      result: searchData, // searchData should be in state
    };

    navigation.navigate("ConureSearch", routeData);
  };

  const hideCard = () => {
    setSectionType("");
    setSelectEnclosureData("");
    setSelectEnclosure("");
  };
  const crossCard = () => {
    setAnimalType("");
  };
  const closeCard = () => {
    setSelectEnclosure("");
  };
  const navigatePreviousScreen = () => {
    navigation.navigate("CaseType");
  };
  const goback = () => {
    navigation.navigate("AddMedical");
  };

  const closeModala = () => {
    setVisible(false);
  };

  const handleOutsidePress = () => {
    setVisible(false);
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
              style={{ width: widthPercentageToDP(90) }}
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
                    onPress={() => navigation.navigate("QRCodeScanner")}
                  />
                </>
              )}
            />
          </View>
        </View>

        <View style={styles.secondItembox}>
          <TouchableOpacity
            style={styles.dateDropdown}
            onPress={showDatePicker}
          >
            <Text
              style={{
                marginTop: heightPercentageToDP(0.7),
                marginLeft: selectedDate
                  ? widthPercentageToDP(2)
                  : widthPercentageToDP(4),
              }}
            >
              {selectedDate}
            </Text>
            <View
              style={{
                marginLeft: selectedDate
                  ? heightPercentageToDP("11.5%")
                  : heightPercentageToDP("10%"),
                bottom: heightPercentageToDP("2%"),
                // display: selectedDate ? "none" : null,
              }}
            >
              <AntDesign
                name="down"
                size={widthPercentageToDP(3.5)}
                onPress={showDatePicker}
              />
            </View>
          </TouchableOpacity>

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
          <Text style={styles.textstyle}>Or choose from</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.dropdownBox}
        >
          <TouchableOpacity
            style={[
              styles.boxStyle,
              {
                height: sectionType === "" ? heightPercentageToDP(6.5) : "auto",
              },
            ]}
            onPress={() => SetAcsnTypeDropDown()}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.selectTextstyle}>Select Section</Text>
              <AntDesign
                name="down"
                size={16}
                color="black"
                style={{ marginRight: widthPercentageToDP(2.5) }}
                onPress={() => SetAcsnTypeDropDown()}
              />
            </View>
            <View>
              {sectionType === "" ? null : (
                <Card
                  title={sectionType}
                  style={styles.cardstyle}
                  rightIcon={
                    <Entypo
                      name="cross"
                      size={24}
                      color="black"
                      onPress={hideCard}
                      style={{
                        position: "absolute",
                        left: heightPercentageToDP("6%"),
                      }}
                    />
                  }
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxStyle,
              { marginTop: heightPercentageToDP(2) },
              {
                height:
                  selectEnclosure === "" ? heightPercentageToDP(6.5) : "auto",
              },
            ]}
            onPress={() => SetSelectEncDropDown()}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.selectTextstyle}>Select Enclosure</Text>
              <AntDesign
                name="down"
                size={16}
                color="black"
                style={{ marginRight: widthPercentageToDP(2.5) }}
                onPress={() => SetSelectEncDropDown()}
              />
            </View>
            <View>
              {selectEnclosure === "" ? null : (
                <Card
                  title={selectEnclosure}
                  style={styles.cardstyle}
                  rightIcon={
                    <Entypo
                      name="cross"
                      size={24}
                      color="black"
                      onPress={closeCard}
                      style={{
                        position: "absolute",
                        left: heightPercentageToDP("6%"),
                      }}
                    />
                  }
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.boxStyle,
              { marginTop: heightPercentageToDP(2) },
              {
                height: animalType === "" ? heightPercentageToDP(6.5) : "auto",
              },
            ]}
            onPress={() => SetAnimTypeDropDown()}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.selectTextstyle}>Select Animal</Text>
              <AntDesign
                name="down"
                size={16}
                color="black"
                style={{ marginRight: widthPercentageToDP(2.5) }}
                onPress={() => modalOpen()}
              />
            </View>
            <View>
              {animalType === "" ? null : (
                <Card
                  title={animalType}
                  style={styles.cardstyle}
                  rightIcon={
                    <Entypo
                      name="cross"
                      size={24}
                      color="black"
                      onPress={crossCard}
                      style={{ position: "absolute", left: 90, top: 18 }}
                    />
                  }
                />
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footerStyle}>
          <Footermedical
            navigatePreviousScreen={navigatePreviousScreen}
            lastlabel={"Case Type"}
            onPress={goback}
          />
        </View>
      </View>

      <Modal
        animationType={"slide"}
        // transparent={false}
        visible={visible}
        style={styles.modalView}
        onBackdropPress={handleOutsidePress}
        transparent
        backdropColor="black"
      >
        <View
          style={{
            marginTop: -36,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            alignItems: "center",
            backgroundColor: "#F2FFF8",
            width: 400,
          }}
        >
          <View
            style={{
              height: 55,

              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black", fontSize: 24, fontWeight: "500" }}>
              Select Animal
            </Text>
          </View>
          <View style={styles.modalFirstbox}>
            <View
              style={{
                marginRight: "5%",
                marginLeft: "-5%",
                backgroundColor: "#F2FFF8",
              }}
            >
              <View style={styles.searchBarContainer}>
                <TouchableOpacity >
                  <Ionicons
                    name="search"
                    size={24}
                    color="#1F515B"
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  onChangeText={(e) => {
                    setSearchModalText(e);
                  }}
                  value={searchModalText}
                />
              </View>
            </View>
            <View>
              <Dropdown
                style={styles.speciesDropdown}
                placeholderStyle={styles.modalSearchplaceholderStyle}
                selectedTextStyle={styles.itemstyle}
                data={collectiondata}
                labelField="label"
                valueField="value"
                placeholder="Species"
                searchPlaceholder="Search..."
                value={modalDropdownVal}
                onChange={(item) => {
                  setModalDropdownVal(item.value);
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flex: 1,
          }}
        >
          <FlatList
            data={dataList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width: "100%" }}>
                <MedicalModalCard
                  children={
                    <>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Text style={styles.title}>Peach Fronted Conure</Text>
                      </View>
                      <Text style={styles.ScientificName}>
                        (Scientific Name)
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Text style={styles.subtitle}>
                          {/* {item.local_id == "" || item.local_id == null
                              ? item.animal_id
                              : item.local_id} */}
                          A000093 
                        </Text>
                        <Text style={styles.MBox}>M</Text>
                        <Text style={styles.BBox}>B</Text>
                      </View>
                    </>
                  }
                  image={true}
                  imagePath={require("../../assets/antz.png")}
                  ContainerStyle={{
                    backgroundColor: Colors.white,
                    borderRadius: 0,
                  }}
                />
                
              </View>
            )}
          />
        </View>
      </Modal>
      {isSecTypeMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isSecTypeMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={acsnClose}
          >
            <Category
              categoryData={sectionTypeData}
              onCatPress={sectionPressed}
              heading={"Choose Section"}
              isMulti={false}
              onClose={acsnClose}
            />
          </Modal>
        </View>
      ) : null}

      {isSelectEnclosure ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isSelectEnclosure}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={encClose}
          >
            <Category
              categoryData={selectEnclosureData}
              onCatPress={enclosurePressed}
              heading={"Choose Enclosure"}
              isMulti={false}
              onClose={encClose}
            />
          </Modal>
        </View>
      ) : null}
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

export default Searchanimal;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  searchbox: {
    marginTop: heightPercentageToDP(2),
    width: widthPercentageToDP(90),
    justifyContent: "center",
    alignItems: "center",
  },

  secondItembox: {
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(2),
    // backgroundColor: "red",
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
    marginRight: widthPercentageToDP(2),
    backgroundColor: "white",
    paddingTop: heightPercentageToDP(0.3),
  },
  collectionsDropdown: {
    width: widthPercentageToDP(33),
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
    width: widthPercentageToDP(33),
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
    backgroundColor: "#AFEFEB",
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

  // overlay: {
  //   flex: 0.1,
  // },
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

    marginBottom: "5%",
  },
  //modal search box
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth : 1,
    // paddingVertical: 8,
    paddingLeft: 12,
    height : 35,
    padding :5,
    borderColor : "#1F515B"
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
  color : "#1F515B", 
    width : "30%",
  },
  listofModalStyle: {
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(3),
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

  // Modal Style

  modalView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 35,
    alignItems: "center",
     borderWidth: 0.7,
    overflow: "hidden",
    marginTop : 50,
    marginBottom : 50,
    
  },

  title: {
    fontSize: widthPercentageToDP(4),
    fontWeight: "400",
    color: Colors.subtitle,
    width: "100%",
  },

  subtitle: {
    fontSize: widthPercentageToDP(4),
    color: Colors.subtitle,
    fontWeight: "400",
  },

  ScientificName: {
    fontSize: widthPercentageToDP(4),
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
    backgroundColor: "#DAE7DF",
  },
  BBox: {
    marginLeft: widthPercentageToDP(3),
    paddingTop: widthPercentageToDP(0.3),
    padding: widthPercentageToDP(1.5),
    borderRadius: widthPercentageToDP(2),
    height: heightPercentageToDP(3),
    backgroundColor: "#00D6C9",
  },
});
