// Author: Ganesh Aher
// Date: 02-05-2023
// work: 1.Design and impliment the edit API on Design.

import React, { useEffect, useState, useCallback, useRef } from "react";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import { List, SegmentedButtons } from "react-native-paper";
import InputBox from "../../components/InputBox";
import DatePicker from "../../components/DatePicker";
import { useSelector } from "react-redux";
import { listAccessionType } from "../../services/AccessionService";
import { GetEnclosure } from "../../services/FormEnclosureServices";
import { DeleteAnimal, addAnimal, getAnimalConfigs } from "../../services/AnimalService";
import moment from "moment";
import { getTaxonomic } from "../../services/EggsService";
import Loader from "../../components/Loader";
import Colors from "../../configs/Colors";
import { useNavigation } from "@react-navigation/core";
import { AutoCompleteSearch } from "../../components/AutoCompleteSearch";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { animalEditData } from "../../services/AnimalService";
import { capitalize } from "../../utils/Utils";
const AnimalEdit = (props) => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [isLoading, setLoding] = useState(false);

  const [value, setValue] = useState("single");
  const [animal_id, setAnimal_id] = useState(
    props.route.params?.item.animal_id ?? 0
  );
  const [accessionType, setAccessionType] = useState(
    props.route.params?.item.master_accession_type ?? ""
  );
  const [accessionTypeID, setAccessionTypeID] = useState(
    props.route.params?.item.accession_type ?? ""
  );
  const [isAcsnTypeMenuOpen, setIsAcsnTypeMenuOpen] = useState(false);
  const [accessionTypeData, setAccessionTypeData] = useState([]);
  const [accessionDate, setAccessionDate] = useState(new Date());
  const [species, setSpecies] = useState(
    props.route.params?.item.vernacular_name ?? ""
  );
  const [sepciesID, setSpeciesID] = useState(
    props.route.params?.item.taxonomy_id ?? ""
  );
  const [selectEnclosure, setSelectEnclosure] = useState(
    props.route.params?.item.user_enclosure_name ?? ""
  );
  const [selectEnclosureID, setSelectEnclosureID] = useState(
    props.route.params?.item.enclosure_id ?? ""
  );
  const [selectEnclosureData, setSelectEnclosureData] = useState([]);
  const [isSelectEnclosure, setIsSelectEnclosure] = useState(false);
  const [selectSexType, setSelectSexType] = useState(
    capitalize(props.route.params?.item.sex) ?? ""
  );
  const [selectSexTypeID, setSelectSexTypeID] = useState(
    props.route.params?.item.sex ?? ""
  );
  const [selectSexTypeData, setSelectSexTypeData] = useState([
    {
      id: "male",
      name: "MALE",
      isSelect: "male" == props.route.params?.item.sex ? true : false,
    },
    {
      id: "female",
      name: "FEMALE",
      isSelect: "female" == props.route.params?.item.sex ? true : false,
    },
    {
      id: "indetermined",
      name: "INDETERMINATE",
      isSelect: "indetermined" == props.route.params?.item.sex ? true : false,
    },
    {
      id: "undetermined",
      name: "UNDETERMINED",
      isSelect: "undetermined" == props.route.params?.item.sex ? true : false,
    },
  ]);
  const [isSelectSexType, setIsSelectSexType] = useState(false);
  const [selectCollectionType, setSelectCollectionType] = useState(
    props.route.params?.item.master_collection_type ?? ""
  );
  const [selectCollectionTypeID, setSelectCollectionTypeID] = useState(
    props.route.params?.item.collection_type ?? ""
  );
  const [selectCollectionTypeData, setSelectCollectionTypeData] = useState([]);
  const [isSelectCollectionType, setIsSelectCollectionType] = useState(false);
  const [birthDate, setBirthDate] = useState(
    props.route.params?.item.birth_date ?? new Date()
  );
  const [dateComponent, setDateComponent] = useState();
  // console.log('dateComponent>>>>>>>>>>>>>>>>>>>>>>>>>>>',dateComponent);

  const [age, setAge] = useState("");

  const [selectIdentifierType, setSelectIdentifierType] = useState(
    props.route.params?.item.label ?? ""
  );
  const [selectIdentifierTypeID, setSelectIdentifierTypeID] = useState("");
  const [selectIdentifierTypeData, setSelectIdentifierTypeData] = useState([]);
  const [isSelectIdentifierType, setIsSelectIdentifierType] = useState(false);
  const [localIdentifier, setLocalIdentifier] = useState(
    props.route.params?.item.local_id ?? ""
  );
  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  console.log(props.route.params?.item);

  const SetAcsnTypeDropDown = () => {
    setIsAcsnTypeMenuOpen(!isAcsnTypeMenuOpen);
    setIsSelectEnclosure(false);
    setIsSelectSexType(false);
    setIsSelectCollectionType(false);
  };

  const accessPressed = (item) => {
    setIsAcsnTypeMenuOpen(!isAcsnTypeMenuOpen);
    setAccessionType(item.map((value) => value.name).join(","));
    setAccessionTypeID(item.map((value) => value.id).join(","));
    // accessiondatePicker.current.focus();
  };

  const acsnClose = () => {
    setIsAcsnTypeMenuOpen(false);
  };

  const getAccessionDate = (date) => {
    setAccessionDate(date);
  };

  const catTaxonomydata = (item) => {
    if (item) {
      setSpecies(item.title);
      setSpeciesID(item.id);

      // handleSubmitFocus(enclRef);
    }
  };

  const SetSelectEncDropDown = () => {
    setIsSelectEnclosure(!isSelectEnclosure);
    setIsAcsnTypeMenuOpen(false);
    setIsSelectSexType(false);
    setIsSelectCollectionType(false);
  };

  const enclosurePressed = (item) => {
    setIsSelectEnclosure(!isSelectEnclosure);
    setSelectEnclosure(item.map((value) => value.name).join(","));
    setSelectEnclosureID(item.map((value) => value.id).join(","));
    // sexRef.current.focus();
  };

  const encClose = () => {
    setIsSelectEnclosure(false);
  };

  const SetSexTypeDropDown = () => {
    setIsSelectSexType(!isSelectSexType);
    setIsSelectEnclosure(false);
    setIsAcsnTypeMenuOpen(false);
    setIsSelectCollectionType(false);
  };

  const sexTypePressed = (item) => {
    setIsSelectSexType(!isSelectSexType);
    setSelectSexType(item.map((value) => value.name).join(","));
    setSelectSexTypeID(item.map((value) => value.id).join(","));
    // collectionRef.current.focus();
  };

  const sexClose = () => {
    setIsSelectSexType(false);
  };

  const getBirthDate = (birthDate) => {
    const todayDate = new Date();

    if (todayDate < birthDate) {
      setIsError({ birthDate: true });
      setErrorMessage({
        birthDate: "Birth Date Can Not Be Greater Than Today Date",
      });
    } else {
      setBirthDate(birthDate);
      setIsError({ birthDate: false });
      setErrorMessage({ birthDate: "" });
    }

    const age = moment(todayDate).diff(moment(birthDate), "days");
    setAge(String(age));
    setDateComponent("days");
  };

  const handleAge = (age) => setAge(age);

  const handleDate = (dateComponent) => {
    setDateComponent(dateComponent);
    const birthDate = moment()
      .subtract(age, dateComponent)
      .format("YYYY-MM-DD");
    setBirthDate(birthDate);
  };

  const SetCollectionTypeDown = () => {
    setIsSelectCollectionType(!isSelectCollectionType);
    setIsSelectSexType(false);
    setIsSelectEnclosure(false);
    setIsAcsnTypeMenuOpen(false);
  };

  const collectionTypePressed = (item) => {
    setIsSelectCollectionType(!isSelectCollectionType);
    setSelectCollectionType(item.map((value) => value.name).join(","));
    setSelectCollectionTypeID(item.map((value) => value.id).join(","));
  };

  const collectionTypeClose = () => {
    setIsSelectCollectionType(false);
  };

  const SetIdentifierTypeDown = () => {
    setIsSelectIdentifierType(!isSelectIdentifierType);
  };

  const identifierTypePressed = (item) => {
    setIsSelectIdentifierType(!isSelectIdentifierType);
    setSelectIdentifierType(item.map((value) => value.name).join(","));
    setSelectIdentifierTypeID(item.map((value) => value.id).join(","));
    // localIdentifierRef.current.focus();
  };

  const identifierTypeClose = () => {
    setIsSelectIdentifierType(false);
  };

  const validation = () => {
    if (accessionType.length === 0) {
      setIsError({ accessionType: true });
      setErrorMessage({ accessionType: "Select Accession Type" });
      return false;
    } else if (species.length === 0) {
      setIsError({ species: true });
      setErrorMessage({ species: "Select Taxonomy" });
      return false;
    } else if (selectEnclosure.length === 0) {
      setIsError({ selectEnclosure: true });
      setErrorMessage({ selectEnclosure: "Select Enclosure" });
      return false;
    } else if (value === "single" && selectSexType.length === 0) {
      setIsError({ selectSexType: true });
      setErrorMessage({ selectSexType: "Select Sex Type" });
      return false;
    } else if (selectCollectionType.length === 0) {
      setIsError({ selectCollectionType: true });
      setErrorMessage({ selectCollectionType: "Select Collection Type" });
      return false;
    }

    return true;
  };

  const editAnimalData = () => {
    if (validation()) {
      let requestObject = {
        accession_type: accessionTypeID,
        accession_date: moment(accessionDate).format("YYYY-MM-DD"),
        taxonomy_id: sepciesID,
        enclosure_id: selectEnclosureID,
        sex: selectSexTypeID,
        collection_type: selectCollectionTypeID,
        birth_date: moment(birthDate).format("YYYY-MM-DD"),
        age: dateComponent,
        local_id_type: selectIdentifierTypeID,
        local_id: localIdentifier,
        description: "Upadate Animal",
        id: animal_id,
        // zoo_id: zooID,
      };

      console.log(requestObject);
      setLoding(true);
      animalEditData(requestObject)
        .then((res) => {
          if (res.success) {
            alert("Animals Updated successfully");
            navigation.goBack();
          }
          console.log("post data response", res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoding(false);
        });
    }
  };

  useEffect(() => {
    getData();
  }, [value]);

  const getData = () => {
    setLoding(true);

    let postData = {
      zoo_id: zooID,
    };
    Promise.all([
      listAccessionType(),
      GetEnclosure(postData),
      getAnimalConfigs(),
    ])
      .then((res) => {
        setAccessionTypeData(
          res[0].data.map((item) => ({
            id: item.accession_id,
            name: item.accession_type,
            isSelect: item.accession_id == accessionTypeID ? true : false,
          }))
        );
        setSelectEnclosureData(
          res[1].data.map((item) => ({
            id: item.enclosure_id,
            name: item.user_enclosure_name,
            isSelect: item.enclosure_id == selectEnclosureID ? true : false,
          }))
        );
        setSelectCollectionTypeData(
          res[2].data.collection_type.map((item) => ({
            id: item.id,
            name: item.label,
            isSelect: item.id == selectCollectionTypeID ? true : false,
          }))
        );
        setSelectIdentifierTypeData(
          res[2].data.animal_indetifier.map((item) => ({
            id: item.id,
            name: item.label,
            isSelect: item.id == selectIdentifierTypeID ? true : false,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoding(false);
        // handleSubmitFocus("accessRef");
      });
  };

  const accessRef = useRef(null);
  const accessiondatePicker = useRef(null);
  const taxonomyRef = useRef(null);
  const enclRef = useRef(null);
  const sexRef = useRef(null);
  const collectionRef = useRef(null);

  const identifierTypeRef = useRef(null);
  const localIdentifierRef = useRef(null);

  const handleSubmitFocus = (refs, time) => {
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
    }
  };
  const thirdOneOpen = () => {
    setIsSelectEnclosure(true);
  };
  const forthOneOpen = () => {
    if (value == "batch") {
      fifthOneOpen();
    } else {
      setIsSelectSexType(true);
    }
  };
  const fifthOneOpen = () => {
    setIsSelectCollectionType(true);
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

  const dropdownOff = () => {
    setIsAcsnTypeMenuOpen(false);
    setIsSelectEnclosure(false);
    setIsSelectSexType(false);
    setIsSelectCollectionType(false);
    setIsSelectIdentifierType(false);
  };

  const DeleteAnimalData = (id) => {
    let obje = {
      animal_id: animal_id,
    };
    setLoding(true);
    DeleteAnimal(obje)
      .then((res) => {
        setLoding(false);
        if (res.success) {
          alert(res.message);
          setTimeout(() => {
            navigation.navigate("AnimalList");
          }, 500);
        }
      })
      .catch((err) => {
        setLoding(false);
        console.log(err);
      });
  };

  return (
    <>
      <Loader visible={isLoading} />
      <CustomForm
        header={true}
        title={"Edit Animal"}
        marginBottom={60}
        // onPress={handleOnPress}
        onPress={editAnimalData}
      >
        <List.Section>
          <List.Accordion
            title="Basic Information"
            id="1"
            expanded={true}
            titleStyle={{ color: "black" }}
            // right={(props) => <List.Icon {...props} icon="plus" />}
          >
            <View style={{ marginBottom: 15 }}>
              <View>
                <InputBox
                  inputLabel={"Accession Type*"}
                  placeholder={"Choose accession"}
                  editable={false}
                  rightElement={
                    isAcsnTypeMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  value={accessionType}
                  DropDown={SetAcsnTypeDropDown}
                  onFocus={SetAcsnTypeDropDown}
                  errors={errorMessage.accessionType}
                  isError={isError.accessionType}
                />
                <DatePicker
                  title="Accession Date"
                  style={{ borderBottomLeftRadius: 0 }}
                  today={accessionDate}
                  mode={"date"}
                  onChange={(date) => {
                    setAccessionDate(date);
                    // handleSubmitFocus(taxonomyRef, 1000);
                  }}
                  // errors={errorMessage.accessionDate}
                  // isError={isError.accessionDate}
                  onOpen={dropdownOff}
                />

                <AutoCompleteSearch
                  placeholder="Enter atleast 3 charecter to search..."
                  label="Species/Taxonomy"
                  value={species}
                  onPress={catTaxonomydata}
                  errors={errorMessage.species}
                  isError={isError.species}
                />

                <InputBox
                  inputLabel={"Select Enclosure"}
                  placeholder={"Choose Enclosure"}
                  refs={enclRef}
                  editable={false}
                  DropDown={SetSelectEncDropDown}
                  onFocus={SetSelectEncDropDown}
                  value={selectEnclosure}
                  rightElement={
                    isSelectEnclosure ? "chevron-up" : "chevron-down"
                  }
                  // defaultValue={
                  //   selectEnclosure != null ? selectEnclosure : null
                  // }
                  errors={errorMessage.selectEnclosure}
                  isError={isError.selectEnclosure}
                />
                {value === "single" ? (
                  <InputBox
                    inputLabel={"Sex Type*"}
                    placeholder={"Choose sex"}
                    editable={false}
                    refs={sexRef}
                    onFocus={SetSexTypeDropDown}
                    DropDown={SetSexTypeDropDown}
                    value={selectSexType}
                    rightElement={
                      isSelectSexType ? "chevron-up" : "chevron-down"
                    }
                    //  defaultValue={section != null ? section : null}
                    errors={errorMessage.selectSexType}
                    isError={isError.selectSexType}
                  />
                ) : null}

                <InputBox
                  inputLabel={"Collection Type*"}
                  placeholder={"Choose collection"}
                  editable={false}
                  DropDown={SetCollectionTypeDown}
                  onFocus={SetCollectionTypeDown}
                  value={selectCollectionType}
                  rightElement={
                    isSelectCollectionType ? "chevron-up" : "chevron-down"
                  }
                  errors={errorMessage.selectCollectionType}
                  isError={isError.selectCollectionType}
                />
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <List.AccordionGroup>
          <View style={{ display: value === "batch" ? "none" : "flex" }}>
            <List.Accordion
              title="Additional Information"
              id="1"
              titleStyle={{ color: "black" }}
              // right={(props) => <List.Icon {...props} icon="plus" />}
            >
              <View>
                <DatePicker
                  title="Birth Date"
                  style={{ borderBottomLeftRadius: 0 }}
                  today={birthDate}
                  onChange={getBirthDate}
                  onOpen={dropdownOff}
                />
                {isError.birthDate ? (
                  <Text style={{ color: Colors.danger, paddingHorizontal: 4 }}>
                    {errorMessage.birthDate}
                  </Text>
                ) : null}

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

                  <View style={Styles.checkboxWrap}>
                    {/* <TouchableOpacity
                      style={[
                        Styles.botton,
                        dateComponent === "years"
                          ? Styles.activeDateComponent
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
                            ? Styles.activeDateComponentText
                            : null,
                        ]}
                      >
                        Years
                      </Text>
                    </TouchableOpacity> */}
                    <View style={Styles.ageSelectContainer}>
                      <TouchableOpacity
                        style={[
                          Styles.botton,
                          { borderRightWidth: 1 },
                          dateComponent === "months"
                            ? Styles.activeDateComponent
                            : null,
                        ]}
                        onPress={() => {
                          [
                            handleDate("months"),
                            handleSubmitFocus(identifierTypeRef),
                          ];
                        }}
                      >
                        <Text
                          style={[
                            dateComponent === "months"
                              ? Styles.activeDateComponentText
                              : null,
                          ]}
                        >
                          Months
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          Styles.botton,
                          { borderRightWidth: 1 },
                          dateComponent === "weeks"
                            ? Styles.activeDateComponent
                            : null,
                        ]}
                        onPress={() => {
                          [
                            handleDate("weeks"),
                            handleSubmitFocus(identifierTypeRef),
                          ];
                        }}
                      >
                        <Text
                          style={[
                            dateComponent === "weeks"
                              ? Styles.activeDateComponentText
                              : null,
                          ]}
                        >
                          Weeks
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          Styles.botton,
                          dateComponent === "days"
                            ? Styles.activeDateComponent
                            : null,
                        ]}
                        onPress={() => {
                          [
                            handleDate("days"),
                            handleSubmitFocus(identifierTypeRef),
                          ];
                        }}
                      >
                        <Text
                          style={[
                            dateComponent === "days"
                              ? Styles.activeDateComponentText
                              : null,
                          ]}
                        >
                          Days
                        </Text>
                      </TouchableOpacity>
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
                </View>
                <Text
                  style={{
                    marginLeft: 10,
                    color: "#1F515B",
                    fontWeight: "500",
                    fontSize: 13,
                  }}
                >
                  Estimate range
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  {isError.batchOptions !== true ? null : (
                    <Text style={{ color: Colors.danger }}>
                      {errorMessage.batchOptions}
                    </Text>
                  )}
                </View>
                <InputBox
                  inputLabel={"Local Identifier Type"}
                  placeholder={"Choose Local Identifier"}
                  editable={false}
                  value={selectIdentifierType}
                  onFocus={SetIdentifierTypeDown}
                  DropDown={SetIdentifierTypeDown}
                  rightElement={
                    isSelectIdentifierType ? "chevron-up" : "chevron-down"
                  }
                  //  defaultValue={section != null ? section : null}
                />
                <InputBox
                  inputLabel={"Local Identifier"}
                  placeholder={"Enter Local Identifier"}
                  value={localIdentifier}
                  onFocus={dropdownOff}
                  onChange={(value) => setLocalIdentifier(value)}
                />
              </View>
            </List.Accordion>
          </View>
        </List.AccordionGroup>

        <TouchableOpacity
          // button added for delete the Animal data.
          onPress={DeleteAnimalData}
          style={{
            width: "100%",
            alignSelf: "center",
            marginTop: 10,
            borderWidth: 1,
            borderColor: Colors.danger,
            height: 45,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              padding: 10,
              fontSize: 15,
              color: Colors.danger,
            }}
          >
            Delete Animal
          </Text>
        </TouchableOpacity>
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
              onCatPress={accessPressed}
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
              onCatPress={enclosurePressed}
              heading={"Choose Enclosure"}
              isMulti={false}
              onClose={encClose}
            />
          </Modal>
        </View>
      ) : null}

      {isSelectSexType ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isSelectSexType}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={sexClose}
          >
            <Category
              categoryData={selectSexTypeData}
              onCatPress={sexTypePressed}
              heading={"Choose Sex Type"}
              isMulti={false}
              onClose={sexClose}
            />
          </Modal>
        </View>
      ) : null}

      {isSelectCollectionType ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isSelectCollectionType}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={collectionTypeClose}
          >
            <Category
              categoryData={selectCollectionTypeData}
              onCatPress={collectionTypePressed}
              heading={"Choose Collection Type"}
              isMulti={false}
              onClose={collectionTypeClose}
            />
          </Modal>
        </View>
      ) : null}

      {isSelectIdentifierType ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isSelectIdentifierType}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={identifierTypeClose}
          >
            <Category
              categoryData={selectIdentifierTypeData}
              onCatPress={identifierTypePressed}
              heading={"Choose Identifier Type"}
              isMulti={false}
              onClose={identifierTypeClose}
            />
          </Modal>
        </View>
      ) : null}
    </>
  );
};

const Styles = StyleSheet.create({
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
    height: heightPercentageToDP('6%'),
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
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
    alignItems: 'center',
    height: heightPercentageToDP('6.2%'),
  },
});

export default AnimalEdit;
