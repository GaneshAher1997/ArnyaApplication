import React, { useState, createRef, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import VoiceText from "../components/VoiceText";
import { SearchPage, data } from "../configs/Config";
import Colors from "../configs/Colors";
import {
  searchCommonName,
  searchEnclosure,
  searchScientificName,
  searchSection,
  searchSite,
} from "../services/SearchService";
import { useSelector } from "react-redux";
import Category from "../components/DropDownBox";
import Modal from "react-native-modal";
import CustomCard from "../components/CustomCard";
import CustomList from "../components/CustomList";
import { capitalize } from "../utils/Utils";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const deviceWidth = Dimensions.get("window").width;

const SearchScreen = (props) => {
  const { height, width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [value, setValue] = useState(SearchPage.filter((element) => element.isSelect == true)[0].name);
  const [isloadong, setIsloadong] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [searchdata, setSearchData] = useState([]);
  const [searchTypeID, setSearchTypeID] = useState("");
  const [secrhDropDownOpen, setSecrchDropDownOpen] = useState(false);
  const [apiDataShow, setApiDataShow] = useState(false);
  const navigation = useNavigation();
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const gotoBack = () => navigation.goBack();

  let popUpRef = createRef();

  const firstLetter = (s) => {
    return s ? s[0].toUpperCase() : "...";
  };

  const List = ({ item }) => {
    if (value === "Enclosure") {
      return (
        <CustomList
          title={capitalize(item.user_enclosure_name)}
          subtitle={item.enclosure_environment}
          valueletter={firstLetter(item.user_enclosure_name)}
          onPress={() =>
            navigation.navigate("EnclosureDetails", {
              enclosure_id: item.enclosure_id,
            })
          }
        />
      );
    } else if (value === "Section") {
      return (
        <CustomList
          title={capitalize(item.section_name)}
          subtitle={"Section Code: " + item.section_code}
          valueletter={firstLetter(item.section_name)}
          onPress={() =>
            navigation.navigate("ListSection", { title: item.section_id })
          }
        />
      );
    } else if (value === "Site") {
      return (
        <CustomList
          title={capitalize(item.site_name)}
          subtitle={"Site Description: " + item.site_description}
          valueletter={firstLetter(item.site_name)}
          onPress={() => {}}
        />
      );
    } else if (value === "Common Name") {
      return (
        <CustomCard
          title={capitalize(item.common_name)}
          subtitle={item.scientific_name}
          onPress={() =>
            navigation.navigate("ComonNameDetails", {
              tsn_id: item.tsn,
              title: item.common_name,
              tags: item.sex_data,
            })
          }
          count={item.sex_data.total}
          tags={item.sex_data}
        />
      );
    } else if (value === "Scientific Name") {
      console.log({ item });
      return (
        <CustomCard
          title={capitalize(item.scientific_name)}
          subtitle={item.common_name}
          onPress={() =>
            navigation.navigate("ComonNameDetails", {
              tsn_id: item.tsn,
              title: item.common_name,
              tags: item.sex_data,
            })
          }
          count={item.sex_data.total}
          tags={item.sex_data}
        />
      );
    }
  };

  useEffect(() => {
    setSearchData([]);
    seterrorMessage("");
    const getData = setTimeout(() => {
      searchData(searchText, value, page);
    }, 1000);

    return () => clearTimeout(getData);
  }, [searchText, value]);

  const searchData = (query, val, page) => {
    if (query.length >= 3) {
      let requestObj = {
        searchquery: query,
        zoo_id: zooID,
        limit: 5,
        offset: page,
      };
      if (val === "Enclosure") {
        setIsloadong(true);
        searchEnclosure(requestObj)
          .then((res) => {
            // console.log('........res ......', res);
            if (res.data.length > 0) {
              Keyboard.dismiss();
            }
            setSearchData(res.data);
            setApiDataShow(true);
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsloadong(false);
          });
      } else if (val === "Section") {
        setIsloadong(true);
        searchSection(requestObj)
          .then((res) => {
            console.log("........res ......", res);
            if (res.data.length > 0) {
              Keyboard.dismiss();
            }
            setSearchData(res.data);
            setApiDataShow(true);
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsloadong(false);
          });
      } else if (val === "Site") {
        setIsloadong(true);
        searchSite(requestObj)
          .then((res) => {
            // console.log('........res ......', res);
            if (res.data.length > 0) {
              Keyboard.dismiss();
            }
            setSearchData(res.data);
            setApiDataShow(true);
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsloadong(false);
          });
      } else if (val === "Common Name") {
        setIsloadong(true);
        searchCommonName(requestObj)
          .then((res) => {
            console.log("........res ......", res);
            if (res.data.length > 0) {
              Keyboard.dismiss();
            }
            setSearchData(res.data);
            setApiDataShow(true);
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsloadong(false);
          });
      } else if (val === "Scientific Name") {
        setIsloadong(true);
        searchScientificName(requestObj)
          .then((res) => {
            console.log("........res ......", res);
            if (res.data.length > 0) {
              Keyboard.dismiss();
            }
            setSearchData(res.data);
            setApiDataShow(true);
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setIsloadong(false);
          });
      } else {
        seterrorMessage("Please Choose Search by..");
      }
    }
  };

  const onVoiceInput = (text) => {
    setSearchText(text);
  };

  // const SetDropDown = (data) => {
  //   setSecrchDropDownOpen(true)
  //   setSecrchDropDownOpen(data)
  // };

  const searchPressed = (item) => {
    setSecrchDropDownOpen(!secrhDropDownOpen);
    setValue(item.map((value) => value.name).join(","));
    // console.log(item.map((value)=> value.name));
    setSearchTypeID(item.map((value) => value.id).join(","));
  };

  {
    /*
    Author: Biswanath nath
    Date:  01.05.2023
    Desc: When scroll reach end will call this function to work as pagination and load more data
  */
  }
  const handleLoadMore = () => {
    if (!isloadong && searchdata.length > 0) {
      let p = page + 1; // increase page by 1
      searchData(searchText, value, p); // method for API call
    }
  };

  const acsnClose = () => {
    setSecrchDropDownOpen(false);
  };

  // console.log(('.....searchdata.......', searchdata));

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: isSwitchOn ? "#1F415B" : "#DAE7DF" },
        ]}
      >
        {/* <Loader visible={isloadong} /> */}
        <View>
          <Searchbar
            placeholder={value === "" ? "Search..." : `Search by ${value}`}
            inputStyle={styles.input}
            onIconPress={gotoBack}
            style={[
              styles.Searchbar,
              { backgroundColor: isSwitchOn ? "#1F415B" : "#DAE7DF" },
            ]}
            loading={isloadong}
            onChangeText={(e) => {
              setSearchText(e);
            }}
            value={searchText}
            autoFocus={true}
            icon={({ size, color }) => (
              <Ionicons
                name="md-arrow-back"
                size={24}
                color
                style={{
                  color: isSwitchOn ? "white" : "black",
                }}
              />
            )}
            right={() => (
              <>
                <VoiceText resultValue={onVoiceInput} />
                <Ionicons
                  name="md-filter-outline"
                  size={20}
                  color={isSwitchOn ? "white" : "black"}
                  style={{ marginRight: 10 }}
                  onPress={() => setSecrchDropDownOpen(true)}
                />
              </>
            )}
          />
          {errorMessage ? (
            <Text style={styles.errortext}>{errorMessage}</Text>
          ) : null}
        </View>

        <View style={styles.SearchContainer}>
          {searchdata.length > 0 ? (
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "600",
                color: isSwitchOn ? "white" : "black",
              }}
            >
              {isloadong === false ? value : ""}
            </Text>
          ) : (
            ""
          )}
          {searchdata.length > 0 ? (
            <FlatList
              con
              data={searchdata}
              renderItem={List}
              keyExtractor={(item) => item.enclosure_id}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.4}
              onEndReached={handleLoadMore}
            />
          ) : (
            <>
              {apiDataShow === true ? (
                <Text style={styles.errortext}>...No Data Found...</Text>
              ) : null}
            </>
          )}
        </View>
        {/* } */}
      </SafeAreaView>

      {secrhDropDownOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={secrhDropDownOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={acsnClose}
          >
            <Category
              categoryData={SearchPage}
              onCatPress={searchPressed}
              heading={"Choose Search By"}
              isMulti={false}
              onClose={acsnClose}
            />
          </Modal>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errortext: {
    color: "red",
    textAlign: "center",
  },
  button: {
    width: "81%",
    borderRadius: 5,
  },
  btnText: {
    fontWeight: "600",
    fontSize: 14,
  },
  btnCont: {
    width: "100%",
    padding: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGrey,
    marginTop: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
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
  SearchContainer: {
    // backgroundColor: '#fff',
    // flex :1,
    paddingHorizontal: 8,
    paddingBottom: 8,
    marginBottom: hp(9),
  },
  listContainer: {
    backgroundColor: "#ccc",
    marginVertical: 5,
    borderRadius: 8,
    padding: 7,
  },
  rightIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "3%",
    marginHorizontal: "1%",
  },
  Searchbar: {
    width: "100%",
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
  },
});

export default SearchScreen;
