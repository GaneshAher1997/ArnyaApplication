// modify By : Gaurav Shukla
//date:2-05-2023
//description: add the functions for the navigation footermedical and apply the redux in it.

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Colors from "../../configs/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Data from "./Demo.json";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MedicalHeader from "../../components/MedicalHeader";
import Footermedical from "../../components/Footermedical";
import { useDispatch, useSelector } from "react-redux";
import { setdiagnosis } from "../../redux/MedicalSlice";

const Diagnosis = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const diagnosisSelectData = useSelector((state)=>state.medical.diagnosis)
  const [selectedCommonNames, setSelectedCommonNames] = useState(diagnosisSelectData);
  const [toggleSaveBtn, setToggleBtn] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggleCommNameDropdown, setToogleCommNameDropdown] = useState(false);
  const [selectCommonModalName, setSelectCommonModalName] = useState("");
  const [durationNo, setDurationNo] = useState("");
  const [detailsReport, setDetailsReport] = useState({
    severity: "",
    frequency: "",
    duration: "",
  });

  dispatch(setdiagnosis(selectedCommonNames));
  const handleSelectCommon = (name) => {
    let item = selectedCommonNames.find((item) => item.name === name);
    if (item) {
      setSelectedCommonNames(
        selectedCommonNames.filter((item) => item.name !== name)
      );
    } else {
      setSelectedCommonNames([
        ...selectedCommonNames,
        {
          ...("name" && { ["name"]: name }),
          ...("value" && { ["value"]: {} }),
        },
      ]);
    }
  };

  const selectedItemsColor = (name) => {
    let item = selectedCommonNames.find((item) => item.name === name);
    if (item) {
      return true;
    } else {
      return false;
    }
  };
  const handleClearAll = () => {
    setSelectedCommonNames([]);
  };

  const handleDeleteName = (name) => {
    setSelectedCommonNames(selectedCommonNames.filter((item) => item !== name));
  };

  const handleClickSaveTemp = () => {
    setToggleBtn(true);
  };
  const handleToggleCommDropdown = (item) => {
    setToogleCommNameDropdown(!toggleCommNameDropdown);
    if (toggleCommNameDropdown) {
      setSelectCommonModalName(item);
      setDetailsReport({
        severity: "",
        frequency: "",
        duration: "",
      });
    } else {
      setSelectCommonModalName(item);
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
  useEffect(() => {}, [toggle, selectedCommonNames]);

  const handleSeveritySelect = (name) => {
    setDetailsReport({ ...detailsReport, severity: name });
  };
  const handleFrequencySelect = (frequency) => {
    setDetailsReport({ ...detailsReport, frequency: frequency });
  };
  const handleDurationSelect = (duration) => {
    if (durationNo !== "") {
      setDetailsReport({ ...detailsReport, duration: duration });
    }
  };
  const handleDurationInptSelect = (no) => {
    setDurationNo(no);
  };

  const handleDetailsSubmit = (name) => {
    const index = selectedCommonNames.findIndex((item) => item.name === name);
    const compareObj = {
      severity:
        detailsReport.severity === ""
          ? selectedCommonNames[index].value.severity
          : detailsReport.severity,
      frequency:
        detailsReport.frequency === ""
          ? selectedCommonNames[index].value.frequency
          : detailsReport.frequency,
      duration:
        detailsReport.duration === ""
          ? selectedCommonNames[index].value.duration
          : detailsReport.duration,
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

  const navigateNextScreen = () => {
    navigation.navigate("Complaints");
  };
  const navigatePreviousScreen = () => {
    navigation.navigate("Rx");
  };
  return (
    <>
      <MedicalHeader
        title="Choose Diagnosis"
        noIcon={true}
        style={{ paddingBottom: hp("2%"), paddingTop: wp("3%") }}
      />
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
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
        <View style={[styles.searchContainer, { margin: 5 }]}>
          <View style={styles.histopathologySearchBox}>
            <TextInput
              autoCompleteType="off"
              placeholder="Search Diagnosis"
              placeholderTextColor={Colors.mediumGrey}
              style={styles.histopathologySearchField}
              onFocus={() =>
                navigation.navigate("CommonSearch", {
                  name: "Diagnosis",
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
                style={{ width: "85%" }}
                onPress={() => handleToggleCommDropdown(item.name)}
              >
                <Text style={[styles.selectedName]}>{item.name}</Text>
                <View
                  style={[
                    styles.caseReportDetails,
                    { display: item.value.duration ? "flex" : "none" },
                  ]}
                >
                  <View style={styles.caseReportItem}>
                    <Ionicons
                      name="alarm-outline"
                      size={16}
                      color={Colors.green}
                    />
                    <Text style={[styles.detailsReportTitle]}>
                      {item.value?.duration}
                    </Text>
                  </View>
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
                <Text style={styles.searchSuggestionTitle}>Recently Used</Text>
                <View style={styles.commBtnContainer}>
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

            {/* Common Button */}
            <Text style={[styles.searchSuggestionTitle, { marginTop: 10 }]}>
              Most Common
            </Text>
            <View style={styles.commBtnContainer}>
              {Data.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      style={
                        selectedItemsColor(item.name)
                          ? styles.activeSearchSgBtnCover
                          : styles.searchSuggestionbtnCover
                      }
                      onPress={() => handleSelectCommon(item.name)}
                    >
                      <Text style={styles.caseTypeBtnTxt}>{item.name}</Text>
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
            firstlabel={"Complaint"}
            lastlabel={"Prescription"}
            navigateNextScreen={navigateNextScreen}
            navigatePreviousScreen={navigatePreviousScreen}
          />
        </View>

        {/* Modal Dropdown */}
        {toggleCommNameDropdown ? (
          <Modal
            animationType="none"
            transparent={true}
            statusBarTranslucent={true}
            visible={true}
          >
            <View style={[styles.modalOverlay]}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Colors.black,
                        }}
                      >
                        {selectCommonModalName}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.closeBtn}
                      onPress={handleToggleCommDropdown}
                    >
                      <Ionicons
                        name="close"
                        size={28}
                        color={Colors.mediumGrey}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalBody}>
                    <View style={{ height: "18%" }}>
                      <Text
                        style={[
                          styles.searchSuggestionTitle,
                          { marginTop: 30 },
                        ]}
                      >
                        Duration
                      </Text>
                      <View
                        style={[
                          styles.commBtnContainer,
                          {
                            justifyContent: "center",
                            alignItems: "center",
                          },
                        ]}
                      >
                        <TextInput
                          autoCompleteType="off"
                          style={styles.durationInput}
                          onChangeText={(e) => handleDurationInptSelect(e)}
                          keyboardType="numeric"
                        />
                        <TouchableOpacity
                          style={
                            detailsReport.duration === `${durationNo} Days`
                              ? styles.actvModalDurationBtnCover
                              : styles.modalDurationBtnCover
                          }
                          onPress={() =>
                            handleDurationSelect(`${durationNo} Days`)
                          }
                        >
                          <Text style={styles.caseTypeBtnTxt}>Days</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            detailsReport.duration === `${durationNo} Weeks`
                              ? styles.actvModalDurationBtnCover
                              : styles.modalDurationBtnCover
                          }
                          onPress={() =>
                            handleDurationSelect(`${durationNo} Weeks`)
                          }
                        >
                          <Text style={styles.caseTypeBtnTxt}>Weeks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            detailsReport.duration === `${durationNo} Months`
                              ? styles.actvModalDurationBtnCover
                              : styles.modalDurationBtnCover
                          }
                          onPress={() =>
                            handleDurationSelect(`${durationNo} Months`)
                          }
                        >
                          <Text style={styles.caseTypeBtnTxt}>Months</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={
                            detailsReport.duration == `${durationNo} Years`
                              ? styles.actvModalDurationBtnCover
                              : styles.modalDurationBtnCover
                          }
                          onPress={() =>
                            handleDurationSelect(`${durationNo} Years`)
                          }
                        >
                          <Text style={styles.caseTypeBtnTxt}>Years</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 100,
                      }}
                    >
                      <TouchableOpacity
                        style={[styles.modalBtnCover]}
                        onPress={() =>
                          handleDetailsSubmit(selectCommonModalName)
                        }
                      >
                        <Text style={styles.bottomBtnTxt}>Done</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Modal>
        ) : null}
      </View>
    </>
  );
};
export default Diagnosis;

const windowHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
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
  commonNameList: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    marginTop: 10,
    marginLeft: 5,
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
  selectedName: {
    fontSize: 16,
    color: Colors.black,
  },
  detailsReportTitle: {
    fontSize: 12,
    color: Colors.mediumGrey,
    marginLeft: 4,
  },
  saveTemp: {
    fontSize: 16,
    marginLeft: 3,
    color: Colors.black,
  },
  rowContainer: {
    borderColor: "#d2d1cd",
    borderRadius: 10,
    paddingVertical: 2,
    borderRadius: 3,
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
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.blueBg,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  caseReportDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  caseTypeBtnTxt: {
    fontSize: 14,
    color: Colors.mediumGrey,
  },
  activeSearchSgBtnCover: {
    width: "auto",
    height: 30,
    margin: 6,
    paddingVertical: 2,
    paddingHorizontal: 14,
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
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: Colors.lightGrey,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  caseReportItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    backgroundColor: "#f7f9f9",
    marginTop: 25,
    paddingTop: 10,
  },
  saveBtnContainer: {
    flexDirection: "row",
    marginTop: -2,
    marginBottom: 25,
    marginLeft: -20,
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
  commBtnContainer: { flexDirection: "row", flex: 1, flexWrap: "wrap" },
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
  modalOverlay: {
    height: windowHeight,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    height: Math.floor(windowHeight * 0.4),
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
    height: "100%",
    flex: 1,
    width: "90%",
  },
});
