//modify By: gaurav shukla
//date:2-05-2023
//description: add the functions for the navigation footermedical

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../configs/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Data from "./Advice.json";
import MedicalHeader from "../../components/MedicalHeader";
import Footermedical from "../../components/Footermedical";

const Advice = () => {
  const navigation = useNavigation();
  const [selectRecommendeNames, setSelectRecommendedNames] = useState([]);
  const [toggleSaveBtn, setToggleBtn] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleSelectRecomended = (name) => {
    let item = selectRecommendeNames.find((item) => item === name);
    if (item) {
      setSelectRecommendedNames(
        selectRecommendeNames.filter((item) => item !== name)
      );
    } else {
      setSelectRecommendedNames([...selectRecommendeNames, name]);
    }
  };

  const handleClickSaveTemp = () => {
    setToggleBtn(true);
  };

  const changeAdvice = (e) => {
    let arr = [];
    arr = e.split(",");
    setSelectRecommendedNames(arr);
  };

  const selectedItemsColor = (name) => {
    let item = selectRecommendeNames.find((item) => item === name);
    if (item) {
      return true;
    } else {
      return false;
    }
  };

  const handleClearAll = () => {
    setSelectRecommendedNames([]);
  };

  const handleSelectFromTemplate = (item) => {
    const saveTempValue = item.value;
    for (let index = 0; index < saveTempValue.length; index++) {
      if (!selectRecommendeNames.includes(saveTempValue[index])) {
        selectRecommendeNames.push(saveTempValue[index]);
        setToggle(!toggle);
      }
    }
  };

  useEffect(() => {}, [toggle, selectRecommendeNames]);

  const handleSave = () => {
    setToggleBtn(false);
    if (templateName) {
      setTemplates([
        ...templates,
        {
          ...("name" && { ["name"]: templateName }),
          ...("value" && { ["value"]: selectRecommendeNames }),
        },
      ]);
    }
  };

  const navigateNextScreen = () => {
    navigation.navigate("Rx");
  };

  const navigatePreviousScreen = () => {
    navigation.navigate("Searchanimal");
  };
  return (
    <>
      <MedicalHeader
        title=" Choose Advice Type"
        noIcon={true}
        style={{ paddingBottom: hp("2%"), paddingTop: wp("3%") }}
      />
      <View style={[styles.container, styles.center]}>
        {/* Load prev & Clear all  */}
        {selectRecommendeNames.length >= 1 ? (
          <TouchableOpacity style={{ width: "100%" }} onPress={handleClearAll}>
            <Text style={styles.clrAll}>Clear All</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: "100%" }}>
            <Text style={styles.prevLabel}>Load Prev.</Text>
          </View>
        )}

        {/* Advice Input Box */}
        <View style={[styles.adviceContainer, { margin: 10 }]}>
          <View style={styles.histopathologyAdviceBox}>
            <TextInput
              multiline={true}
              autoCompleteType="off"
              placeholder="Type Advice"
              placeholderTextColor={Colors.mediumGrey}
              style={styles.histopathologySearchField}
              onChangeText={(e) => changeAdvice(e)}
              maxLength={500}
              defaultValue={String(
                selectRecommendeNames.map((item) => {
                  return item;
                })
              )}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          {/* Save Button */}
          {toggleSaveBtn ? (
            <>
              {selectRecommendeNames.length > 1 ? (
                <View style={styles.saveBtnCover}>
                  <TextInput
                    onChangeText={(e) => setTemplateName(e)}
                    style={styles.inputTemp}
                    placeholder={"Type Template Name (Eg: Drink Water)"}
                  />
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={handleSave}
                  >
                    <Ionicons
                      name="save-outline"
                      size={20}
                      color={Colors.mediumGrey}
                    />
                    <Text style={[styles.saveTemp]}>Save</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {selectRecommendeNames.length > 1 ? (
                <TouchableOpacity
                  onPress={handleClickSaveTemp}
                  style={styles.saveBtn}
                >
                  <Ionicons
                    name="save-outline"
                    size={20}
                    color={Colors.mediumGrey}
                  />
                  <Text style={[styles.saveTemp]}>Save as Template</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </>
          )}
          <View
            style={[
              styles.rowContainer,
              {
                marginHorizontal: 20,
              },
            ]}
          >
            {/* Template List */}
            {templates.length >= 1 ? (
              <>
                <Text style={styles.searchSuggestionTitle}>Your Template</Text>
                <View style={styles.commonListStyle}>
                  {templates.map((item, index) => {
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          onPress={() => handleSelectFromTemplate(item)}
                          style={[styles.recentlyUsedbtnCover]}
                        >
                          <Text style={styles.caseTypeBtnTxt}>{item.name}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </>
            ) : (
              <></>
            )}

            {/* Recommende List */}
            <Text style={[styles.searchSuggestionTitle, { marginTop: 10 }]}>
              Recommended
            </Text>
            <View style={styles.commonListStyle}>
              {Data.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      style={
                        selectedItemsColor(item.name)
                          ? styles.activeSearchSgBtnCover
                          : styles.searchSuggestionbtnCover
                      }
                      onPress={() => handleSelectRecomended(item.name)}
                    >
                      <Text style={styles.caseTypeBtnTxt}>
                        {item.name.length > 10
                          ? item.name.slice(0, 10) + "..."
                          : item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Footer */}

        <View>
          <Footermedical
            ShowIonicons={true}
            firstlabel={"Prescription"}
            lastlabel={"Select Animal"}
            navigateNextScreen={navigateNextScreen}
            navigatePreviousScreen={navigatePreviousScreen}
          />
        </View>
      </View>
    </>
  );
};

export default Advice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: { justifyContent: "center", alignItems: "center" },
  scrollContainer: {
    width: "100%",
    backgroundColor: "#f7f9f9",
    marginTop: 25,
    paddingTop: 10,
  },
  clrAll: {
    color: "red",
    fontWeight: "400",
    textAlign: "right",
    borderBottomWidth: 0,
    fontSize: 13,
    paddingLeft: 4,
    height: "auto",
    paddingVertical: 10,
    marginRight: 20,
  },
  saveBtnCover: {
    flexDirection: "row",
    marginTop: -2,
    marginBottom: 25,
    marginLeft: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  prevLabel: {
    color: Colors.blueBg,
    fontWeight: "400",
    textAlign: "right",
    borderBottomWidth: 0,
    fontSize: 13,
    paddingLeft: 4,
    height: "auto",
    paddingVertical: 10,
    marginRight: 20,
  },
  histopathologyAdviceBox: {
    width: "100%",
    height: 100,
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#f7f9f9",
    borderRadius: 8,
  },
  adviceContainer: {
    width: "90%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  histopathologySearchField: {
    width: "90%",
    padding: 3,
    color: Colors.mediumGrey,
    fontSize: 16,
  },
  inputTemp: {
    fontSize: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    width: "60%",
    marginRight: 2,
  },
  rowContainer: {
    borderColor: "#d2d1cd",
    borderRadius: 10,
    paddingVertical: 2,
    borderRadius: 3,
    // paddingHorizontal: 5,
  },
  saveBtn: {
    flexDirection: "row",
    marginTop: -2,
    marginBottom: 25,
    marginLeft: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  searchSuggestionTitle: {
    fontSize: 16,
    color: Colors.mediumGrey,
  },
  recentlyUsedbtnCover: {
    width: "auto",
    height: 30,
    margin: 6,
    paddingVertical: 2,
    paddingHorizontal: 14,
    // marginTop: 10,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.blueBg,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  caseTypeBtnTxt: {
    fontSize: 14,
    color: Colors.mediumGrey,
  },
  searchSuggestionTitle: {
    fontSize: 16,
    color: Colors.mediumGrey,
  },
  activeSearchSgBtnCover: {
    width: "auto",
    height: 30,
    margin: 6,
    paddingVertical: 2,
    paddingHorizontal: 14,
    // marginTop: 10,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.green,
    backgroundColor: Colors.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  searchSuggestionbtnCover: {
    width: "auto",
    height: 30,
    margin: 6,
    paddingVertical: 2,
    paddingHorizontal: 14,
    // marginTop: 10,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomPreviewBtnCover: {
    width: "auto",
    height: 40,
    margin: 10,
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomPreviewBtnTxt: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.blueBg,
  },
  bottomBtnCover: {
    width: "45%",
    height: 40,
    margin: 10,
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBtnTxt: {
    fontSize: 16,
    color: Colors.white,
  },
  saveTemp: {
    fontSize: 16,
    marginLeft: 3,
    color: Colors.black,
  },
  commonListStyle: { flexDirection: "row", flex: 1, flexWrap: "wrap" },
});
