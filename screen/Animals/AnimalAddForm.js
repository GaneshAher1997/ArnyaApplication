/**
 * Created By: Biswajit Chakraborty
 * Creation Date: 5/4/23
 */

import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { AntDesign } from "@expo/vector-icons";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  LogBox,
  useWindowDimensions,
} from "react-native";
import { List, SegmentedButtons } from "react-native-paper";
import InputBox from "../../components/InputBox";
import DatePicker from "../../components/DatePicker";
import { useSelector } from "react-redux";
import { listAccessionType } from "../../services/AccessionService";
import { GetEnclosure } from "../../services/FormEnclosureServices";
import { addAnimal, getAnimalConfigs } from "../../services/AnimalService";
import moment from "moment";
import { getTaxonomic } from "../../services/EggsService";
import Loader from "../../components/Loader";
import Colors from "../../configs/Colors";
import { useNavigation } from "@react-navigation/core";
import { AutoCompleteSearch } from "../../components/AutoCompleteSearch";
import Modal from "react-native-modal";
import styles from "../../configs/Styles";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const AnimalAddForm = (props) => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [isLoading, setLoding] = useState(false);

  const [value, setValue] = useState("single");

  const [accessionType, setAccessionType] = useState("");
  const [isAcsnTypeMenuOpen, setIsAcsnTypeMenuOpen] = useState(false);
  const [accessionTypeData, setAccessionTypeData] = useState([]);
  const [accessionTypeID, setAccessionTypeID] = useState("");

  const [accessionDate, setAccessionDate] = useState(new Date());

  const [species, setSpecies] = useState(props.route.params?.tsn ?? "");
  const [sepciesID, setSpeciesID] = useState(props.route.params?.tsn_id ?? "");

  const [selectEnclosure, setSelectEnclosure] = useState("");
  const [selectEnclosureID, setSelectEnclosureID] = useState("");
  const [selectEnclosureData, setSelectEnclosureData] = useState([]);
  const [isSelectEnclosure, setIsSelectEnclosure] = useState(false);

  const [selectSexType, setSelectSexType] = useState("");
  const [selectSexTypeID, setSelectSexTypeID] = useState();
  const [selectSexTypeData, setSelectSexTypeData] = useState([
    { id: "male", name: "MALE" },
    { id: "female", name: "FEMALE" },
    { id: "indeterminate", name: "INDETERMINATE" },
    { id: "undetermined", name: "UNDETERMINED" },
  ]);
  const [isSelectSexType, setIsSelectSexType] = useState(false);

  const [selectCollectionType, setSelectCollectionType] = useState("");
  const [selectCollectionTypeID, setSelectCollectionTypeID] = useState("");
  const [selectCollectionTypeData, setSelectCollectionTypeData] = useState([]);
  const [isSelectCollectionType, setIsSelectCollectionType] = useState(false);

  const [birthDate, setBirthDate] = useState(new Date());
  const [dateComponent, setDateComponent] = useState();
  const [age, setAge] = useState("");

  const [selectIdentifierType, setSelectIdentifierType] = useState("");
  const [selectIdentifierTypeID, setSelectIdentifierTypeID] = useState("");
  const [selectIdentifierTypeData, setSelectIdentifierTypeData] = useState([]);
  const [isSelectIdentifierType, setIsSelectIdentifierType] = useState(false);

  const [localIdentifier, setLocalIdentifier] = useState("");

  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [undeterminedCount, setUndeterminedCount] = useState(0);
  const [indeterminateCount, setIndeterminateCount] = useState(0);
  const [batchOptions, setBatchOptions] = useState(0);

  const [input2Focus, setinput2Focus] = useState(false);

  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

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
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    datePicker1Ref.current.focus();*/
    }
  };

  const acsnClose = () => {
    setIsAcsnTypeMenuOpen(false);
  };

  const getAccessionDate = (date) => {
    setAccessionDate(date);
  };

  //this is  function Taxonomay dropDwon Filed
  const catTaxonomydata = (item) => {
    if (item) {
      setSpecies(item.title);
      setSpeciesID(item.id);
      // thirdOneOpen()
      handleSubmitFocus(enclRef);
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
    // forthOneOpen();
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    if(value === "single"){
    handleSubmitFocus(sexRef)
    }else {
      handleSubmitFocus(collectionRef)
    }*/
    }
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
    // fifthOneOpen();
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    handleSubmitFocus(collectionRef)*/
    }
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
    // if (value === "batch") {
    //   handleSubmitFocus(input2Ref);
    // }
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
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    handleSubmitFocus(localIdentifierRef,1000);*/
    }
  };

  const identifierTypeClose = () => {
    setIsSelectIdentifierType(false);
  };

  const validation = () => {
    if (accessionType.length === 0) {
      setIsError({ accessionType: true });
      setErrorMessage({ accessionType: "Select Accession Type" });
      return false;
    }
    // else if (accessionDate.length === 0) {
    //   setIsError({ accessionDate: true });
    //   setErrorMessage({ accessionDate: "Select Accession Date" });
    //   return false;
    // }
    else if (species.length === 0) {
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

    if (value === "batch") {
      let totalBatchCount =
        Number(maleCount) +
        Number(femaleCount) +
        Number(indeterminateCount) +
        Number(undeterminedCount);
      setBatchOptions(totalBatchCount);

      if (Number(totalBatchCount) < 2) {
        setIsError({ batchOptions: true });
        setErrorMessage({ batchOptions: "Atleast 2 batch count required" });
        return false;
      }
      console.log({ totalBatchCount });
    }

    return true;
  };

  const handleOnPress = () => {
    setIsError({});
    setErrorMessage({});
    if (validation()) {
      const requestObject = {
        accession_type: accessionTypeID,
        accession_date: moment(accessionDate).format("YYYY-MM-DD"),
        taxonomy_id: sepciesID,
        enclosure_id: selectEnclosureID,
        // sex: (value === 'single'
        //   ? selectSexTypeID
        //   : { male: maleCount, female: femaleCount, undetermined: undeterminedCount, indetermined: indeterminateCount }),
        collection_type: selectCollectionTypeID, //
        birth_date: moment(birthDate).format("YYYY-MM-DD"),
        local_id_type: selectIdentifierTypeID,
        local_id: localIdentifier,
        description: "Add Animal",
        form_type: value,
        zoo_id: zooID,
      };

      if (value === "single") {
        requestObject.sex = selectSexTypeID;
      } else {
        requestObject.male = maleCount;
        requestObject.female = femaleCount;
        requestObject.undetermined = undeterminedCount;
        requestObject.indeterminate = indeterminateCount;
      }

      console.log("THIS IS THE OBJECT BEING SEND: ", requestObject);
      setLoding(true);

      addAnimal(requestObject)
        .then((response) => {
          console.log("THIS IS THE RESPONSE: ", response);
          if (response.success) {
            // alert(response.message)
            navigation.goBack();
          } else {
            alert("Somethimg went wrong!!");
          }
        })
        .catch((error) => {
          alert("Somethimg went wrong!!");
          console.log(error);
        })
        .finally(() => {
          setLoding(false);
          alert("Add animal successfully");
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
          }))
        );
        setSelectEnclosureData(
          res[1].data.map((item) => ({
            id: item.enclosure_id,
            name: item.user_enclosure_name,
          }))
        );
        setSelectCollectionTypeData(
          res[2].data.collection_type.map((item) => ({
            id: item.id,
            name: item.label,
          }))
        );
        setSelectIdentifierTypeData(
          res[2].data.animal_indetifier.map((item) => ({
            id: item.id,
            name: item.label,
          }))
        );

        {
          /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
        if (value === "single") {
          
          setinput2Focus(false);
          handleSubmitFocus(accessRef)
        } else {
          setIsAcsnTypeMenuOpen(false);
          setinput2Focus(true);
          handleSubmitFocus(maleRef,1000);
        }*/
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoding(false);
      });
  };

  const maleRef = useRef(null);
  const femaleRef = useRef(null);
  const undeterminedRef = useRef(null);
  const indeterminateRef = useRef(null);
  const accessRef = useRef(null);
  const taxonomyRef = useRef(null);
  const enclRef = useRef(null);
  const sexRef = useRef(null);
  const collectionRef = useRef(null);
  const identifierTypeRef = useRef(null);
  const localIdentifierRef = useRef(null);
  const datePicker1Ref = useRef(null);
  const datePicker21Ref = useRef(null);
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

  // useEffect(() => {
  //   if (value === "single") {
  //     setIsAcsnTypeMenuOpen(true)
  //     setinput2Focus(false);
  //     handleSubmitFocus(accessRef)
  //   } else {
  //     setIsAcsnTypeMenuOpen(false);
  //     setinput2Focus(true);
  //     handleSubmitFocus(maleRef);
  //   }
  // }, [value]);

  // const acessDropdownOpen = () => {
  //   setIsAcsnTypeMenuOpen(true)
  // };

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

  return (
    <>
      <CustomForm
        header={true}
        title={"Add Animal"}
        marginBottom={60}
        onPress={handleOnPress}
      >
        <Loader visible={isLoading} />
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "single",
              label: "Single",
              style: Styles.button,
              showSelectedCheck: true,
            },
            {
              value: "batch",
              label: "Batch",
              style: Styles.button,
              showSelectedCheck: true,
            },
          ]}
          style={Styles.group}
        />
        <List.Section>
          <View style={{ display: value === "batch" ? "flex" : "none" }}>
            <List.Accordion
              title="Batch Options"
              id="1"
              expanded={true}
              titleStyle={{ color: "black" }}
              //   right={(props) => <List.Icon {...props} icon="plus" />}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 2,
                }}
              >
                <View style={{ width: "50%", paddingHorizontal: 5 }}>
                  <InputBox
                    refs={maleRef}
                    autoFocus={input2Focus}
                    inputLabel={"Male"}
                    placeholder={"Male"}
                    keyboardType={"numeric"}
                    onFocus={dropdownOff}
                    onSubmitEditing={() => handleSubmitFocus(femaleRef)}
                    value={maleCount}
                    onChange={(value) => {
                      checkNumber(value)
                        ? setMaleCount(value)
                        : setMaleCount("");
                    }}
                    // errors={errorMessage.enclosureName}
                    // isError={isError.enclosureName}
                  />
                </View>
                <View style={{ width: "50%", paddingHorizontal: 5 }}>
                  <InputBox
                    refs={femaleRef}
                    inputLabel={"Female"}
                    placeholder={"Female"}
                    keyboardType={"numeric"}
                    onFocus={dropdownOff}
                    value={femaleCount}
                    onChange={(value) => {
                      checkNumber(value)
                        ? setFemaleCount(value)
                        : setFemaleCount("");
                    }}
                    onSubmitEditing={() => handleSubmitFocus(undeterminedRef)}
                    // errors={errorMessage.enclosureName}
                    // isError={isError.enclosureName}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 2,
                }}
              >
                <View style={{ width: "50%", paddingHorizontal: 5 }}>
                  <InputBox
                    refs={undeterminedRef}
                    inputLabel={"Undetermined"}
                    placeholder={"Undetermined"}
                    keyboardType={"numeric"}
                    onFocus={dropdownOff}
                    value={undeterminedCount}
                    onChange={(value) => {
                      checkNumber(value)
                        ? setUndeterminedCount(value)
                        : setUndeterminedCount("");
                    }}
                    onSubmitEditing={() => handleSubmitFocus(indeterminateRef)}
                    // errors={errorMessage.enclosureName}
                    // isError={isError.enclosureName}
                  />
                </View>
                <View style={{ width: "50%", paddingHorizontal: 5 }}>
                  <InputBox
                    refs={indeterminateRef}
                    inputLabel={"Indeterminate"}
                    placeholder={"Indeterminate"}
                    keyboardType={"numeric"}
                    onFocus={dropdownOff}
                    value={indeterminateCount}
                    onChange={(value) => {
                      checkNumber(value)
                        ? setIndeterminateCount(value)
                        : setIndeterminateCount("");
                    }}
                    onSubmitEditing={() => setIsAcsnTypeMenuOpen(true)}
                    // errors={errorMessage.enclosureName}
                    // isError={isError.enclosureName}
                  />
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
            </List.Accordion>
          </View>
        </List.Section>

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
                  refs={accessRef}
                  editable={false}
                  rightElement={
                    isAcsnTypeMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  value={accessionType}
                  DropDown={SetAcsnTypeDropDown}
                  onFocus={SetAcsnTypeDropDown}
                  // defaultValue={
                  //   enclosureEnvironment != null
                  //     ? enclosureEnvironment
                  //     : null
                  // }
                  errors={errorMessage.accessionType}
                  isError={isError.accessionType}
                />
                <DatePicker
                  title="Accession Date"
                  style={{ borderBottomLeftRadius: 0 }}
                  today={accessionDate}
                  refs={datePicker1Ref}
                  mode={"date"}
                  onChange={(date) => {
                    setAccessionDate(date);
                    handleSubmitFocus(taxonomyRef, 1000);
                  }}
                  // errors={errorMessage.accessionDate}
                  // isError={isError.accessionDate}
                  onOpen={dropdownOff}
                />

                <AutoCompleteSearch
                  refs={taxonomyRef}
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
                  refs={collectionRef}
                  DropDown={SetCollectionTypeDown}
                  onFocus={SetCollectionTypeDown}
                  value={selectCollectionType}
                  rightElement={
                    isSelectCollectionType ? "chevron-up" : "chevron-down"
                  }
                  //   defaultValue={section != null ? section : null}
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
                  <Text style={{ color: "red", paddingHorizontal: 4 }}>
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
                <InputBox
                  inputLabel={"Local Identifier Type"}
                  placeholder={"Choose Local Identifier"}
                  editable={false}
                  refs={identifierTypeRef}
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
                  refs={localIdentifierRef}
                  value={localIdentifier}
                  onFocus={dropdownOff}
                  onChange={(value) => setLocalIdentifier(value)}
                />
              </View>
            </List.Accordion>
          </View>
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

export default AnimalAddForm;