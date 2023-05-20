//modify By: gaurav shukla
//date:2-05-2023
//description: add the functions for the navigation footermedical

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";
import Colors from "../../configs/Colors";
import {Ionicons } from "@expo/vector-icons";
import { useNavigation} from "@react-navigation/native";
import Data from "./Rx.json";
import MedicalHeader from "../../components/MedicalHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Footermedical from "../../components/Footermedical";

const Rx = () => {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false);
  const [selectedCommonNames, setSelectedCommonNames] = useState([]);
  const [selectItemName, setSelectItemName] = useState("");
  const [toggleSelectedModal, setToggleSelectedModal] = useState(false);
  const [durationType, setDurationType] = useState("");
  const [durationNo, setDurationNo] = useState("");
  const [toggleSaveBtn, setToggleBtn] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [detailsReport, setDetailsReport] = useState({
    dosage: "",
    duration: "",
    when: "",
    quantity: 0,
    note: "",
  });

  useEffect(() => {}, [toggle, selectedCommonNames]);
  const searchSelectData = (data) => {
    for (let index = 0; index < data.length; index++) {
      const item = selectedCommonNames.find(
        (item) => item.name === data[index].name
      );
      if (!item) {
        selectedCommonNames.push(data[index]);
        setToggle(!toggle);
      }
    }
  };

  const handleToggleCommDropdown = (item) => {
    setToggleSelectedModal(!toggleSelectedModal);
    if (toggleSelectedModal) {
      setDetailsReport({
        dosage: "",
        duration: "",
        when: "",
        quantity: 0,
        note: "",
      });
    } else {
      setSelectItemName(item);
    }
  };

  const handleSave = () => {
    setToggleBtn(false);
    if (templateName) {
      setTemplates([
        ...templates,
        {
          ...("name" && { ["name"]: templateName }),
          ...("value" && { ["value"]: selectedCommonNames }),
        },
      ]);
    }
  };

  const handleClearAll = () => {
    setSelectedCommonNames([]);
  };

  const handleDeleteName = (name) => {
    setSelectedCommonNames(selectedCommonNames.filter((item) => item !== name));
  };

  const handleDosageSelect = (d) => {
    setDetailsReport({ ...detailsReport, dosage: d });
  };

  const handleWhenSelect = (name) => {
    setDetailsReport({ ...detailsReport, when: name });
  };

  const handleQuantitySelect = (no) => {
    setDetailsReport({ ...detailsReport, quantity: no });
  };

  const handleNote = (e) => {
    setDetailsReport({ ...detailsReport, note: e });
  };

  const handleDurationSelect = (type) => {
    setDurationType(type);
    if (durationNo !== "") {
      setDetailsReport({
        ...detailsReport,
        duration: `${durationNo} ${type}`,
      });
    }
  };
  const handleDurationInptSelect = (no) => {
    setDurationNo(no);
  };
  const handleClickSaveTemp = () => {
    setToggleBtn(true);
  };
  const handleSelectFromTemplate = (item) => {
    const saveTempValue = item.value;
    for (let index = 0; index < saveTempValue.length; index++) {
      const item = selectedCommonNames.find(
        (item) => item.name === saveTempValue[index].name
      );
      if (!item) {
        selectedCommonNames.push(saveTempValue[index]);
        setToggle(!toggle);
      }
    }
  };

  useEffect(() => {
    let str1 = detailsReport.dosage.replace(/[^\d.]/g, "");
    let str2 = Array.from(String(str1), Number);
    const totalDosePerDay = str2.reduce((partialSum, a) => partialSum + a, 0);

    if (durationType == "Days") {
      setDetailsReport({
        ...detailsReport,
        quantity: totalDosePerDay * durationNo,
      });
    } else if (durationType == "Weeks") {
      setDetailsReport({
        ...detailsReport,
        quantity: totalDosePerDay * durationNo * 7,
      });
    } else if (durationType == "Months") {
      setDetailsReport({
        ...detailsReport,
        quantity: totalDosePerDay * durationNo * 30,
      });
    } else if (durationType == "Years") {
      setDetailsReport({
        ...detailsReport,
        quantity: totalDosePerDay * durationNo * 365,
      });
    }
  }, [durationType, durationNo, detailsReport.dosage]);

  const handleDetailsSubmit = (name) => {
    const index = selectedCommonNames.findIndex((item) => item.name === name);
    const compareObj = {
      dosage:
        detailsReport.dosage === ""
          ? selectedCommonNames[index].value.dosage
          : detailsReport.dosage,
      duration:
        detailsReport.duration === ""
          ? selectedCommonNames[index].value.duration
          : detailsReport.duration,
      when:
        detailsReport.when === ""
          ? selectedCommonNames[index].value.when
          : detailsReport.when,
      quantity:
        detailsReport.quantity === 0
          ? selectedCommonNames[index].value.quantity
          : detailsReport.quantity,
      note:
        detailsReport.note === ""
          ? selectedCommonNames[index].value.note
          : detailsReport.note,
    };
    setSelectedCommonNames([
      ...selectedCommonNames.slice(0, index),
      {
        ...selectedCommonNames[index],
        ["name"]: name,
        ["value"]: compareObj,
      },
      ...selectedCommonNames.slice(index + 1),
    ]);
    handleToggleCommDropdown();
  };

  const navigateNextScreen = () => {
    navigation.navigate("Diagnosis");
  };

  const navigatePreviousScreen = () => {
    navigation.navigate("Advice");
  };

  return (
    <>
      <MedicalHeader
        title="Choose Prescription"
        noIcon={true}
        style={{ paddingBottom: hp("2%"), paddingTop: wp("3%") }}
      />
      <View style={[styles.container, styles.center]}>
        {/* Load prev & Clear All button */}
        {selectedCommonNames.length >= 1 ? (
          <TouchableOpacity style={{ width: "100%" }} onPress={handleClearAll}>
            <Text style={styles.clrAll}>Clear All</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: "100%" }}>
            <Text style={styles.prevLabel}>Load Prev.</Text>
          </View>
        )}

        {/* Search  */}
        <View style={[styles.searchContainer, { margin: 10 }]}>
          <View style={styles.histopathologySearchBox}>
            <TextInput
              autoCompleteType="off"
              placeholder="Search Rx"
              placeholderTextColor={Colors.mediumGrey}
              style={styles.histopathologySearchField}
              onFocus={() =>
                navigation.navigate("CommonSearch", {
                  name: "Rx",
                  onGoBack: (e) => searchSelectData(e),
                })
              }
            />
          </View>
        </View>

        {/* Common Name List */}
        {selectedCommonNames.map((item, index) => {
          return (
            <View key={index} style={styles.commonNameList}>
              <TouchableOpacity
                style={{
                  width: "80%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                onPress={() => handleToggleCommDropdown(item.name)}
              >
                <View>
                  <Text style={[styles.selectedName]}>{item.name}</Text>
                  <View style={[styles.caseReportDetails]}>
                    <View
                      style={[
                        styles.caseReportItem,
                        { display: item.value.duration ? "flex" : "none" },
                      ]}
                    >
                      <Ionicons
                        name="alarm-outline"
                        size={16}
                        color={Colors.green}
                      />
                      <Text style={[styles.detailsReportTitle]}>
                        {item.value?.duration}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.caseReportItem,
                        { display: item.value.when ? "flex" : "none" },
                      ]}
                    >
                      <Ionicons
                        name="restaurant-outline"
                        size={16}
                        color={Colors.chocolate}
                      />
                      <Text style={[styles.detailsReportTitle]}>
                        {item.value?.when}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.caseReportItem,
                        { display: item.value.quantity ? "flex" : "none" },
                      ]}
                    >
                      <Ionicons
                        name="bandage-outline"
                        size={16}
                        color={Colors.blueBg}
                      />
                      <Text style={[styles.detailsReportTitle]}>
                        {item.value?.quantity}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.caseReportItem,
                      { display: item.value.note ? "flex" : "none" },
                    ]}
                  >
                    <Text style={[styles.detailsReportTitle]}>
                      Note: {item.value?.note}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.selectedName]}>{item.value.dosage}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteName(item)}>
                <Ionicons
                  name="close-outline"
                  size={30}
                  color={Colors.mediumGrey}
                  style={{ marginTop: -2 }}
                />
              </TouchableOpacity>
            </View>
          );
        })}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
        >
          <View
            style={[
              styles.rowContainer,
              {
                marginHorizontal: 20,
              },
            ]}
          >
            {/* Save Template */}
            {toggleSaveBtn ? (
              <>
                {selectedCommonNames.length > 1 ? (
                  <View style={styles.saveBtnContainer}>
                    <TextInput
                      onChangeText={(e) => setTemplateName(e)}
                      style={styles.saveTempInput}
                      placeholder={"Type Template Name (Eg: Seasonal Flu)"}
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
                {selectedCommonNames.length > 1 ? (
                  <TouchableOpacity
                    onPress={handleClickSaveTemp}
                    style={styles.saveAsTempBtn}
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
                  <Text style={styles.searchSuggestionTitle}>
                    Recently Used
                  </Text>
                  <View style={styles.commBtnContainer}>
                    {templates.map((item, index) => {
                      return (
                        <View key={index}>
                          <TouchableOpacity
                            onPress={() => handleSelectFromTemplate(item)}
                            style={[styles.recentlyUsedbtnCover]}
                          >
                            <Text style={styles.caseTypeBtnTxt}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </>
              ) : (
                <></>
              )}

              <Text style={[styles.searchSuggestionTitle, { marginTop: 10 }]}>
                Most Common
              </Text>
              <View style={styles.rxCommonBtnCvr}>
                {/* Common Button List */}
                {Data.map((item, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        style={styles.searchSuggestionbtnCover}
                        onPress={() =>
                          navigation.navigate("CommonSearch", {
                            name: "Rx",
                            itemName: item.name,
                            onGoBack: (e) => searchSelectData(e),
                          })
                        }
                      >
                        <Text style={styles.caseTypeBtnTxt}>{item.name}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}

        <View>
          <Footermedical
            ShowIonicons={true}
            firstlabel={"Diagnosis"}
            lastlabel={"Advice"}
            navigateNextScreen={navigateNextScreen}
            navigatePreviousScreen={navigatePreviousScreen}
          />
        </View>

        {/* Modal Dropdown */}
        {toggleSelectedModal === true ? (
          <Modal
            animationType="none"
            transparent={true}
            statusBarTranslucent={true}
            visible={true}
          >
            <View style={[styles.modalOverlay]}>
              <View>
                <View style={styles.modalContainer}>
                  {/* Modal Head */}
                  <View style={styles.modalHeader}>
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Colors.black,
                        }}
                      >
                        {selectItemName}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.closeBtn}
                      // onPress={handleToggleCommDropdown}
                    >
                      <Ionicons
                        name="close"
                        size={28}
                        color={Colors.mediumGrey}
                        onPress={handleToggleCommDropdown}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Modal Body */}
                  <View style={styles.modalBody}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View>
                        <Text style={[styles.searchSuggestionTitle]}>
                          Dosage
                        </Text>
                        <View style={styles.commonListStyle}>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "1-0-0"
                                ? styles.actvModalCommonBtnCover
                                : styles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("1-0-0")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>1-0-0</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "0-0-1"
                                ? styles.actvModalCommonBtnCover
                                : styles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("0-0-1")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>0-0-1</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "1-0-1"
                                ? styles.actvModalCommonBtnCover
                                : styles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("1-0-1")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>1-0-1</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "1-1-1"
                                ? styles.actvModalCommonBtnCover
                                : styles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("1-1-1")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>1-1-1</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.dosage === "1-1-0"
                                ? styles.actvModalCommonBtnCover
                                : styles.modalCommonBtnCover
                            }
                            onPress={() => handleDosageSelect("1-1-0")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>1-1-0</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.modalCommonBtnCover}>
                            <Text style={styles.caseTypeBtnTxt}>Custom</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.searchSuggestionTitle,
                            { marginTop: 10 },
                          ]}
                        >
                          Duration
                        </Text>
                        <View style={[styles.commonListStyle, styles.center]}>
                          <TextInput
                            autoCompleteType="off"
                            style={styles.durationInput}
                            onChangeText={(e) => handleDurationInptSelect(e)}
                          />
                          <TouchableOpacity
                            style={
                              detailsReport.duration === `${durationNo} Days`
                                ? styles.actvModalDurationBtnCover
                                : styles.modalDurationBtnCover
                            }
                            onPress={() => handleDurationSelect("Days")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>Days</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.duration === `${durationNo} Weeks`
                                ? styles.actvModalDurationBtnCover
                                : styles.modalDurationBtnCover
                            }
                            onPress={() => handleDurationSelect("Weeks")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>Weeks</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.duration === `${durationNo} Months`
                                ? styles.actvModalDurationBtnCover
                                : styles.modalDurationBtnCover
                            }
                            onPress={() => handleDurationSelect("Months")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>Months</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.duration == `${durationNo} Years`
                                ? styles.actvModalDurationBtnCover
                                : styles.modalDurationBtnCover
                            }
                            onPress={() => handleDurationSelect("Years")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>Years</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.searchSuggestionTitle,
                            { marginTop: 10 },
                          ]}
                        >
                          When
                        </Text>
                        <View style={styles.commonListStyle}>
                          <TouchableOpacity
                            style={
                              detailsReport.when === "Before food"
                                ? styles.actvModalCommonBtnCover
                                : styles.modalCommonBtnCover
                            }
                            onPress={() => handleWhenSelect("Before food")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>
                              Before Food
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={
                              detailsReport.when === "After Food"
                                ? styles.actvModalCommonBtnCover
                                : styles.modalCommonBtnCover
                            }
                            onPress={() => handleWhenSelect("After Food")}
                          >
                            <Text style={styles.caseTypeBtnTxt}>
                              After Food
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={[
                            styles.commonListStyle,
                            {
                              marginTop: 20,
                            },
                          ]}
                        >
                          <TouchableOpacity style={styles.modalCustomBtnCover}>
                            <Text style={styles.caseTypeBtnTxt}>Custom</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.searchSuggestionTitle,
                            { marginTop: 10 },
                          ]}
                        >
                          Quantity
                        </Text>
                        <View style={styles.inputBox}>
                          <View style={styles.histopathologySearchBox}>
                            <TextInput
                              autoCompleteType="off"
                              style={styles.histopathologySearchField}
                              onChangeText={(no) => handleQuantitySelect(no)}
                              value={detailsReport.quantity.toString()}
                            />
                          </View>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.searchSuggestionTitle,
                            { marginTop: 10 },
                          ]}
                        >
                          Notes (Optional)
                        </Text>
                        <View style={styles.inputBox}>
                          <View style={styles.histopathologySearchBox}>
                            <TextInput
                              autoCompleteType="off"
                              placeholder="Type note"
                              placeholderTextColor={Colors.mediumGrey}
                              style={styles.histopathologySearchField}
                              onChangeText={(e) => handleNote(e)}
                            />
                          </View>
                        </View>
                      </View>
                    </ScrollView>

                    {/* Footer */}
                    <View style={styles.addMedBtn}>
                      <TouchableOpacity
                        onPress={() => handleDetailsSubmit(selectItemName)}
                      >
                        <Text style={styles.bottomBtnTxt}>Add Medicine</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
      </View>
    </>
  );
};

export default Rx;

const windowHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
  center: { justifyContent: "center", alignItems: "center" },
  scrollContainer: {
    width: "110%",
    backgroundColor: "#f7f9f9",
    marginTop: 25,
    paddingTop: 10,
    paddingBottom: 20,
  },
  rxCommonBtnCvr: { flexDirection: "row", flex: 1, flexWrap: "wrap" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  searchContainer: {
    width: "90%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  histopathologySearchBox: {
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#f7f9f9",
    borderRadius: 8,
  },
  histopathologySearchField: {
    width: "90%",
    padding: 3,
    color: Colors.mediumGrey,
    fontSize: 16,
  },
  commonNameList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    marginTop: 10,
    marginLeft: 5,
  },
  selectedName: {
    fontSize: 16,
    color: Colors.black,
  },
  caseReportDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 3,
  },
  caseReportItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsReportTitle: {
    fontSize: 12,
    color: Colors.mediumGrey,
    marginLeft: 4,
  },
  rowContainer: {
    borderColor: "#d2d1cd",
    borderRadius: 10,
    paddingVertical: 2,
    borderRadius: 3,
    // paddingHorizontal: 5,
  },

  saveBtnContainer: {
    flexDirection: "row",
    marginTop: -2,
    marginBottom: 25,
    marginLeft: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  saveTempInput: {
    fontSize: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    width: "60%",
    marginRight: 2,
  },
  saveAsTempBtn: {
    flexDirection: "row",
    marginTop: -2,
    marginBottom: 25,
    marginLeft: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  saveTemp: {
    fontSize: 16,
    marginLeft: 3,
    color: Colors.black,
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
  commBtnContainer: { flexDirection: "row", flex: 1, flexWrap: "wrap" },
  labelName: {
    color: Colors.textColor,
    fontSize: 14,
  },
  textfield: {
    height: 40,
    fontSize: 12,
    color: Colors.textColor,
    // width: "100%",
    padding: 5,
  },
  modalOverlay: {
    height: windowHeight,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    height: Math.floor(windowHeight * 0.65),
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    height: 50,
    width: "90%",
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBody: {
    flex: 1,
    width: "90%",
  },
  headContainerView: {
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  center: { justifyContent: "center", alignItems: "center" },
  dirRowCenter: { flexDirection: "row", alignItems: "center" },
  selectedListItem: {
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    width: "100%",
    maxHeight: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 50,
    backgroundColor: "#fff",
    zIndex: 99,
  },
  inputTextAddField: {
    width: "85%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  searchItemList: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commonListStyle: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  addMedBtn: {
    width: "95%",
    height: 40,
    margin: 10,
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginBottom: 50,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: "100%",
    height: 40,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  labelName: {
    color: Colors.textColor,
    fontSize: 14,
  },
  textfield: {
    height: 40,
    fontSize: 12,
    color: Colors.textColor,
    padding: 5,
  },
  actvModalCommonBtnCover: {
    width: "auto",
    height: 38,
    margin: 6,
    paddingVertical: 2,
    paddingHorizontal: 10,
    // marginTop: 10,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCommonBtnCover: {
    width: "auto",
    height: 38,
    margin: 6,
    paddingVertical: 2,
    paddingHorizontal: 10,
    // marginTop: 10,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  durationInput: {
    width: "18%",
    height: 40,
    padding: 3,
    marginRight: 10,
    backgroundColor: "#f7f9f9",
    color: Colors.mediumGrey,
    fontSize: 16,
  },
  actvModalDurationBtnCover: {
    width: "auto",
    height: 38,
    marginVertical: 6,
    paddingVertical: 2,
    paddingHorizontal: 12,
    // marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  modalDurationBtnCover: {
    width: "auto",
    height: 38,
    marginVertical: 6,
    paddingVertical: 2,
    paddingHorizontal: 12,
    // marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCustomBtnCover: {
    width: "auto",
    height: 38,
    // margin: 6,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginLeft: 5,
    marginTop: -15,
    // marginTop: 10,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
