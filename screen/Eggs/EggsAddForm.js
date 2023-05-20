//create by :gaurav shukla

import React, { useEffect, useState, useRef } from "react";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Checkbox, List, SegmentedButtons } from "react-native-paper";
import InputBox from "../../components/InputBox";
import DatePicker from "../../components/DatePicker";
import { GetEnclosure } from "../../services/FormEnclosureServices";
import { listAccessionType } from "../../services/AccessionService";
import {
  getParentEnclosure,
  getTaxonomic,
  PostaddEggs,
} from "../../services/EggsService";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { AutoCompleteSearch } from "../../components/AutoCompleteSearch";
import Colors from "../../configs/Colors";
import Modal from "react-native-modal";
import Loader from "../../components/Loader";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const EggsAddForm = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [accessionType, setAccessionType] = useState("");
  const [accessionId, setAccessionId] = useState("");
  const [accessionTypeData, setAccessionTypeData] = useState([]);
  const [isAcsnTypeMenuOpen, setisAcsnTypeMenuOpen] = useState(false);

  const [selectEnclosure, setSelectEnclosure] = useState("");
  const [selectEnclosureId, setSelectEnclosureId] = useState("");
  const [selectEnclosureData, setSelectEnclosureData] = useState([]);
  const [isSelectEnclosure, setIsSelectEnclosure] = useState(false);

  // New Lay Date and Age
  const [laysDate, setLaysDate] = useState(new Date());
  const [dateComponent, setDateComponent] = useState();
  const [age, setAge] = useState("");
  const [Loading, setLoading] = useState(false);

  const [foundDate, setFoundDate] = useState(new Date());
  const [layDate, setLayDate] = useState(new Date());

  const [species, setSpecies] = useState("");
  const [speciesId, setSpeciesId] = useState("");
  const [speciesData, setSpeciesData] = useState([]);
  const [isSpecies, setIsSpecies] = useState(false);

  const [markLayDate, setMarkLayDate] = useState(false);

  const [clutch, setClutch] = useState("");
  const [batchCount, setBatchCount] = useState("");

  const [isMother, setIsMother] = useState(false);
  const [genderMother, setGenderMother] = useState("");
  const [genderMotherId, setGenderMotherId] = useState("");
  const [Mother, setMother] = useState([]);

  const [isFather, SetIsFather] = useState(false);
  const [genderFather, setGenderFather] = useState("");
  const [genderFatherId, setGenderFatherId] = useState("");
  const [Father, setFather] = useState([]);

  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const [isDropdownLoding, setisDropdownLoding] = useState({});

  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  /// this function is for Accession Types dropdwon
  const Accessiondata = (item) => {
    setAccessionType(item.map((value) => value.name).join(","));
    setAccessionId(item.map((value) => value.id).join(","));
    setisAcsnTypeMenuOpen(!isAcsnTypeMenuOpen);
    // enclDropdownOpen();
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    enclRef.current.focus();*/
    }
  };
  useEffect(() => {
    let postData = {
      zoo_id: zooID,
    };
    setLoading(true);
    Promise.all([listAccessionType(), GetEnclosure(postData)]).then((res) => {
      let data = res[0]?.data.map((item) => {
        return {
          id: item.accession_id,
          name: item.accession_type,
        };
      });
      let data1 = res[1]?.data.map((item) => {
        return {
          id: item.enclosure_id,
          name: item.user_enclosure_name,
        };
      });
      setAccessionTypeData(data);
      setSelectEnclosureData(data1);
      setLoading(false);
      handleSubmitFocus(accessionRef);
      // setisAcsnTypeMenuOpen(true);
    });
  }, []);

  //this is function is for Select Enclosure Dropdwon

  const EnclosureData = (item) => {
    let enclosure_id = item.map((value) => value.id).join(",");
    setSelectEnclosure(item.map((value) => value.name).join(","));
    setSelectEnclosureId(enclosure_id);
    setIsSelectEnclosure(!isSelectEnclosure);
    // taxiDropdownOpen();

    setLoading(true);
    Promise.all([
      getParentEnclosure({ enclosure_id: enclosure_id, gender: "male" }),
      getParentEnclosure({ enclosure_id: enclosure_id, gender: "female" }),
    ])
      .then((res) => {
        setFather(
          res[0].data.map((item) => {
            return {
              id: item.animal_id,
              name: item?.complete_name ?? "N/A",
            };
          })
        );
        setMother(
          res[1].data.map((item) => {
            return {
              id: item.animal_id,
              name: item?.complete_name ?? "N/A",
            };
          })
        );
        setLoading(false);
        {
          /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
        handleSubmitFocus(taxonomyRef, 1000);*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SetAcsnTypeDropDown = () => {
    setisAcsnTypeMenuOpen(!isAcsnTypeMenuOpen);
    setIsSelectEnclosure(false);
    setIsSpecies(false);
  };

  const SetSelectEncDropDown = () => {
    setIsSelectEnclosure(!isSelectEnclosure);
    setisAcsnTypeMenuOpen(false);
    setIsSpecies(false);
  };

  const onPressMarkLayDate = () => {
    setMarkLayDate(!markLayDate);
  };

  const handleAge = (age) => setAge(age);

  const handleDate = (dateComponent) => {
    setDateComponent(dateComponent);
    const laysDate = moment().subtract(age, dateComponent).format("YYYY-MM-DD");
    setLayDate(laysDate);
  };

  const acsnClose = () => {
    setisAcsnTypeMenuOpen(false);
  };

  const encClose = () => {
    setIsSelectEnclosure(false);
  };

  const speciesClose = () => {
    setIsSpecies(false);
  };

  const getdateFound = (date) => {
    setFoundDate(date);
  };
  const getdateLay = (date) => {
    setLayDate(date);
  };

  //this is  function Taxonomay dropDwon Filed
  const catTaxonomydata = (item) => {
    if (item) {
      setSpecies(item.title);
      setSpeciesId(item.id);
      {
        /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
      datePickerRef.current.focus();*/
      }
    } else {
      setSpecies("");
      setSpeciesId("");
    }
  };

  //this function the Mother DropDwon
  const SetIsMotherDown = () => {
    setIsMother(!isMother);
    setIsSelectEnclosure(false);
    setisAcsnTypeMenuOpen(false);
    setIsSpecies(false);
    SetIsFather(false);
  };

  const catMotherdata = (item) => {
    // setIsMother(!isMother)
    setGenderMother(item.map((value) => value.name).join(","));
    setGenderMotherId(item.map((value) => value.id).join(","));
    IsmotherClose();
    // fatherdropdownOpen();
    // maleRef.current.focus();
  };

  const IsmotherClose = () => {
    setIsMother(false);
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    fatherdropdownOpen();*/
    }
  };

  //this function the Father DropDwon
  const SetIsFatherDown = () => {
    SetIsFather(!isFather);
    setIsMother(false);
    setIsSelectEnclosure(false);
    setisAcsnTypeMenuOpen(false);
    setIsSpecies(false);
  };

  const catFatherdata = (item) => {
    setGenderFather(item.map((value) => value.name).join(","));
    setGenderFatherId(item.map((value) => value.id).join(","));
    IsFatherClose();
  };

  const IsFatherClose = () => {
    SetIsFather(false);
  };

  const setNumberofEggs = (value) => {
    const numberRegex2 = /^[1-9][0-9]*$/;

    if (!numberRegex2.test(value)) {
      setIsError({ batchCount: true });
      setErrorMessage({ batchCount: "Only number accepted" });
      setBatchCount("");
      return false;
    } else {
      setIsError({ batchCount: false });
      setBatchCount(value);
    }
  };

  const validation = () => {
    if (accessionType.length === 0) {
      setIsError({ accessionType: true });
      setErrorMessage({ accessionType: "Select Accession Type Options" });
      return false;
    } else if (selectEnclosure.length === 0) {
      setIsError({ selectEnclosure: true });
      setErrorMessage({ selectEnclosure: "Select Enclosure Options" });
      return false;
    } else if (species.length === 0) {
      setIsError({ species: true });
      setErrorMessage({ species: "Select the Species/Taxonomy Options" });
      return false;
    } else if (layDate.length === 0) {
      setIsError({ layDate: true });
      setErrorMessage({ layDate: "Select the Lay Date" });
      return false;
    } else if (batchCount.trim().length === 0) {
      setIsError({ batchCount: true });
      setErrorMessage({ batchCount: "Enter The Batch Count" });
      return false;
    } else if (foundDate.length === 0) {
      setIsError({ foundDate: true });
      setErrorMessage({
        foundDate: "Select the Found Date ",
      });
      return false;
    }
    // else if (clutch.trim().length === 0) {
    //   setIsError({ clutch: true });
    //   setErrorMessage({ clutch: "Enter The Clutch" });
    //   return false;
    // } else if (genderMother.length === 0) {
    //   setIsError({ genderMother: true });
    //   setErrorMessage({ genderMother: "Select Parents" });
    //   return false;
    // } else if (genderFather.length === 0) {
    //   setIsError({ genderFather: true });
    //   setErrorMessage({ genderFather: "Select Parents" });
    //   return false;
    // }
    return true;
  };

  const sendAddEggsData = () => {
    if (validation()) {
      setLoading(true);
      let obj = {
        accession_type: accessionId,
        enclosure_id: selectEnclosureId,
        taxonomy_id: speciesId,
        // taxonomy_id: 18161,
        lay_date: moment(layDate).format("YYYY-MM-DD"),
        found_date: moment(foundDate).format("YYYY-MM-DD"),
        nest_location: "4",
        batch_count: batchCount,
        parent_female: genderMotherId,
        parent_male: genderFatherId,
        description: "",
        zoo_id: zooID,
        lay_date_approx: markLayDate,
      };
      PostaddEggs(obj)
        .then((res) => {
          setLoading(false);
          if (res.success) {
            alert(res.message);
            navigation.goBack();
          }
          console.log("hello this is response--->>>>", res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "Validation error");
        });
    }
  };

  const checkNumber = (number) => {
    setIsError({ batchOptions: false });
    const pattern = /^[1-9][0-9]*$/;
    let result = pattern.test(number);
    if (!result) {
      setIsError({ batchOptions: true });
      setErrorMessage({ batchOptions: "Only number accepted" });
    }
    return result;
  };

  const eggNumberRef = useRef(null);
  const datePickerRef = useRef(null);
  const femaleRef = useRef(null);
  const accessionRef = useRef(null);
  const enclRef = useRef(null);
  const taxonomyRef = useRef(null);
  const maleRef = useRef(null);
  const datePicker2Ref = useRef(null);
  const handleSubmitFocus = (refs, time) => {
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    if (time) {
      setTimeout(() => {
        if (refs.current) {
          refs.current.focus();
        }
      }, time);
    } else {
      if (refs.current) {
        refs.current.focus();
      }
    }*/
    }
  };
  const enclDropdownOpen = () => {
    setIsSelectEnclosure(true);
  };
  const taxiDropdownOpen = () => {
    setIsSpecies(true);
  };
  const motherDropdownOpen = () => {
    setIsMother(true);
  };
  const fatherdropdownOpen = () => {
    SetIsFather(true);
  };

  const dropdownOff = () => {
    setisAcsnTypeMenuOpen(false);
    setIsSelectEnclosure(false);
    setIsMother(false);
    setIsMother(false);
  };

  return (
    <>
      <Loader visible={Loading} />
      <CustomForm
        header={true}
        title={"Add Eggs"}
        marginBottom={50}
        onPress={sendAddEggsData}
        //   onPress={enclosure_id > 0 ? getEnclosureEdit : getEnclosureFormData}
      >
        <List.Section>
          <List.Accordion
            title="Basic Information"
            id="1"
            expanded={true}
            titleStyle={{ color: "black" }}
          >
            <View style={{ marginBottom: 15 }}>
              <View>
                <InputBox
                  refs={accessionRef}
                  inputLabel={"Accession Type"}
                  placeholder={"Enter Accession Type"}
                  editable={false}
                  DropDown={SetAcsnTypeDropDown}
                  value={accessionType}
                  defaultValue={accessionType != null ? accessionType : null}
                  rightElement={
                    isAcsnTypeMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  errors={errorMessage.accessionType}
                  isError={isError.accessionType}
                />
                <InputBox
                  inputLabel={"Select Enclosure"}
                  placeholder={"Choose Enclosure"}
                  editable={false}
                  refs={enclRef}
                  DropDown={SetSelectEncDropDown}
                  onFocus={SetSelectEncDropDown}
                  value={selectEnclosure}
                  defaultValue={
                    selectEnclosure != null ? selectEnclosure : null
                  }
                  rightElement={
                    isSelectEnclosure ? "chevron-up" : "chevron-down"
                  }
                  onSubmitEditing={() => handleSubmitFocus(datePickerRef)}
                  errors={errorMessage.selectEnclosure}
                  isError={isError.selectEnclosure}
                />
                <AutoCompleteSearch
                  refs={taxonomyRef}
                  placeholder="Enter atleast 3 charecter to search..."
                  label="Species/Taxonomy"
                  onPress={catTaxonomydata}
                  errors={errorMessage.species}
                  isError={isError.species}
                />
                <View>
                  <DatePicker
                    title="Lay Date"
                    style={{ borderBottomLeftRadius: 0 }}
                    refs={datePickerRef}
                    onChange={(date) => {
                      [setLayDate(date), handleSubmitFocus(eggNumberRef)];
                    }}
                    today={layDate}
                    onOpen={dropdownOff}
                  />
                  <View style={styles.layDateWrap}>
                    <Checkbox
                      status={markLayDate ? "checked" : "unchecked"}
                      onPress={onPressMarkLayDate}
                    />
                    <Text style={styles.label}>
                      Mark lay date as approximate
                    </Text>
                  </View>
                  {isError.layDate ? (
                    <Text style={styles.errortext}>{errorMessage.layDate}</Text>
                  ) : null}
                </View>

                {/* <InputBox
                  inputLabel={"Approx Age"}
                  placeholder={"Approx Age"}
                  keyboardType={"numeric"}
                  value={age}
                  onChange={handleAge}
                />
                <View
                  style={[styles.checkboxWrap, { justifyContent: "center" }]}
                >
                  <TouchableOpacity
                    style={[
                      styles.botton,
                      dateComponent === "months"
                        ? styles.activeDateComponent
                        : null,
                    ]}
                    onPress={() => handleDate("months")}
                  >
                    <Text
                      style={[
                        dateComponent === "months"
                          ? styles.activeDateComponentText
                          : null,
                      ]}
                    >
                      Months
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.botton,
                      dateComponent === "weeks"
                        ? styles.activeDateComponent
                        : null,
                    ]}
                    onPress={() => handleDate("weeks")}
                  >
                    <Text
                      style={[
                        dateComponent === "weeks"
                          ? styles.activeDateComponentText
                          : null,
                      ]}
                    >
                      Weeks
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.botton,
                      dateComponent === "days"
                        ? styles.activeDateComponent
                        : null,
                    ]}
                    onPress={() => handleDate("days")}
                  >
                    <Text
                      style={[
                        dateComponent === "days"
                          ? styles.activeDateComponentText
                          : null,
                      ]}
                    >
                      Days
                    </Text>
                  </TouchableOpacity>
                </View> */}

                <View style={{ width: "10%" }}>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      color: "#1F515B",
                      fontSize: 16,
                    }}
                  >
                    {"Or"}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "30%" }}>
                    <InputBox
                      inputLabel={"Enter Age"}
                      placeholder={"Approx Age"}
                      keyboardType={"numeric"}
                      value={age}
                      onFocus={dropdownOff}
                      autoFocus={false}
                      // onChange={handleAge}
                      onChange={(value) => {
                        checkNumber(value) ? setAge(value) : setAge("");
                      }}
                      // errors={errorMessage.enclosureSunlight}
                      // isError={isError.enclosureSunlight}
                    />
                  </View>

                  <View style={styles.checkboxWrap}>
                    {/* <TouchableOpacity
                      style={[
                        styles.botton,
                        dateComponent === "years"
                          ? styles.activeDateComponent
                          : null,
                      ]}
                      onPress={() => {
                        [
                          handleDate("years"),
                          handleSubmitFocus(identifierTypeRef),
                        ];
                      }}
                    >
                      <Text
                        style={[
                          dateComponent === "years"
                            ? styles.activeDateComponentText
                            : null,
                        ]}
                      >
                        Years
                      </Text>
                    </TouchableOpacity> */}
                    <View style={styles.ageSelectContainer}>
                      <TouchableOpacity
                        style={[
                          styles.botton,
                          { borderRightWidth: 1 },
                          dateComponent === "months"
                            ? styles.activeDateComponent
                            : null,
                        ]}
                        onPress={() => {
                          [
                            handleDate("months"),
                            // handleSubmitFocus(identifierTypeRef),
                          ];
                        }}
                      >
                        <Text
                          style={[
                            dateComponent === "months"
                              ? styles.activeDateComponentText
                              : null,
                          ]}
                        >
                          Months
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.botton,
                          { borderRightWidth: 1 },
                          dateComponent === "weeks"
                            ? styles.activeDateComponent
                            : null,
                        ]}
                        onPress={() => {
                          [
                            handleDate("weeks"),
                            // handleSubmitFocus(identifierTypeRef),
                          ];
                        }}
                      >
                        <Text
                          style={[
                            dateComponent === "weeks"
                              ? styles.activeDateComponentText
                              : null,
                          ]}
                        >
                          Weeks
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.botton,
                          dateComponent === "days"
                            ? styles.activeDateComponent
                            : null,
                        ]}
                        onPress={() => {
                          [
                            handleDate("days"),
                            // handleSubmitFocus(identifierTypeRef),
                          ];
                        }}
                      >
                        <Text
                          style={[
                            dateComponent === "days"
                              ? styles.activeDateComponentText
                              : null,
                          ]}
                        >
                          Days
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  {isError.batchOptions !== true ? null : (
                    <Text style={{ color: "red" }}>
                      {errorMessage.batchOptions}
                    </Text>
                  )}
                </View>
                <InputBox
                  inputLabel={"Number of Eggs"}
                  placeholder={"Enter Number"}
                  keyboardType={"numeric"}
                  refs={eggNumberRef}
                  onFocus={dropdownOff}
                  value={batchCount}
                  onChange={setNumberofEggs}
                  onSubmitEditing={() => handleSubmitFocus(datePicker2Ref)}
                  errors={errorMessage.batchCount}
                  isError={isError.batchCount}
                />
                <DatePicker
                  today={foundDate}
                  refs={datePicker2Ref}
                  title="Found Date"
                  onChange={getdateFound}
                  onOpen={dropdownOff}
                />
                {isError.foundDate ? (
                  <Text style={styles.errortext}>{errorMessage.foundDate}</Text>
                ) : null}
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <List.AccordionGroup>
          <List.Accordion
            title="Additional Information"
            id="1"
            titleStyle={{ color: "black" }}
            // right={(props) => <List.Icon {...props} icon="plus" />}
          >
            <InputBox
              inputLabel={"Clutch"}
              placeholder={"Enter Clutch"}
              autoFocus={false}
              value={clutch}
              onFocus={dropdownOff}
              onChange={(value) => setClutch(value)}
              onSubmitEditing={() => handleSubmitFocus(femaleRef)}
              errors={errorMessage.clutch}
              isError={isError.clutch}
            />
            <InputBox
              inputLabel={"Parent Female"}
              placeholder={"Choose Parent Female"}
              refs={femaleRef}
              editable={false}
              value={genderMother}
              defaultValue={genderMother != null ? species : null}
              rightElement={isMother ? "chevron-up" : "chevron-down"}
              DropDown={SetIsMotherDown}
              onFocus={SetIsMotherDown}
              errors={errorMessage.genderMother}
              isError={isError.genderMother}
            />
            <InputBox
              inputLabel={"Parent Male"}
              placeholder={"Choose Parent Male"}
              editable={false}
              refs={maleRef}
              value={genderFather}
              defaultValue={genderFather != null ? species : null}
              rightElement={isFather ? "chevron-up" : "chevron-down"}
              DropDown={SetIsFatherDown}
              onFocus={SetIsFatherDown}
              errors={errorMessage.genderFather}
              isError={isError.genderFather}
            />
            {/* <InputBox
                    inputLabel={"Gestation Period"}
                    placeholder={"Enter Gestation Period"}
                    // onChange={(value) => SetEnclosureDesc(value)}
                    // value={enclosureDesc}
                    // errors={errorMessage.enclosureDesc}
                    // isError={isError.enclosureDesc}
                  /> */}
          </List.Accordion>
        </List.AccordionGroup>
      </CustomForm>

      {isAcsnTypeMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isAcsnTypeMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={acsnClose}
          >
            <Category
              categoryData={accessionTypeData}
              onCatPress={Accessiondata}
              heading={"Choose Accession Type"}
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
              onCatPress={EnclosureData}
              heading={"Choose Enclosure"}
              isMulti={false}
              onClose={encClose}
            />
          </Modal>
        </View>
      ) : null}

      {isMother ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isMother}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={IsmotherClose}
          >
            <Category
              categoryData={Mother}
              onCatPress={catMotherdata}
              heading={"Select Parent Female"}
              isMulti={true}
              onClose={IsmotherClose}
            />
          </Modal>
        </View>
      ) : null}

      {isFather ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isFather}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={IsFatherClose}
          >
            <Category
              categoryData={Father}
              onCatPress={catFatherdata}
              heading={"Select Parent Male"}
              isMulti={true}
              onClose={IsFatherClose}
            />
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default EggsAddForm;

const styles = StyleSheet.create({
  layDateWrap: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    borderWidth: 0.8,
    borderColor: "grey",
    borderTopWidth: 0,
    marginTop: -10,
    padding: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
  },
  errortext: {
    color: "red",
  },
  errortext: {
    color: "red",
  },
  botton: {
    borderWidth: 0.8,
    borderColor: "grey",
    padding: 8,
    paddingHorizontal: 15,
  },
  activeDateComponent: {
    borderWidth: 1,
    borderColor: Colors.success,
    backgroundColor: Colors.success,
  },
  activeDateComponentText: {
    color: "white",
  },
  checkboxWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "70%",
    // borderTopWidth: 0,
    // padding: 10,
    marginTop: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
  },
  botton: {
    borderColor: "grey",
    padding: 8,
    paddingHorizontal: 18,
    height: heightPercentageToDP("6%"),
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  activeDateComponent: {
    borderWidth: 1,
    borderColor: Colors.success,
    backgroundColor: Colors.success,
  },
  activeDateComponentText: {
    color: "white",
  },
  ageSelectContainer: {
    borderWidth: 0.8,
    flexDirection: "row",
    borderRadius: 5,
    borderColor: "grey",
    alignItems: "center",
    height: heightPercentageToDP("6.2%"),
  },
});
