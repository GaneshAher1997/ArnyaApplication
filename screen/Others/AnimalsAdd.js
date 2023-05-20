import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { List, SegmentedButtons } from "react-native-paper";
import { useSelector } from "react-redux";
import { listAccessionType } from "../../services/AccessionService";
import { GetEnclosure } from "../../services/FormEnclosureServices";
import { addAnimal, getAnimalConfigs } from "../../services/AnimalService";
import moment from "moment";
import InputBox from "../../components/InputBox";
import DatePicker from "../../components/DatePicker";
import Colors from "../../configs/Colors";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/core";
import { AutoCompleteSearch } from "../../components/AutoCompleteSearch";
import Modal from "react-native-modal";

const AnimalsAdd = () => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [undeterminedCount, setUndeterminedCount] = useState(0);
  const [indeterminateCount, setIndeterminateCount] = useState(0);

  const [isLoading, setLoding] = useState(false);

  const [accessionType, setAccessionType] = useState("");
  const [isAcsnTypeMenuOpen, setIsAcsnTypeMenuOpen] = useState(false);
  const [accessionTypeData, setAccessionTypeData] = useState([]);
  const [accessionTypeID, setAccessionTypeID] = useState("");

  const [species, setSpecies] = useState("");
  const [sepciesID, setSpeciesID] = useState("");

  const [selectEnclosure, setSelectEnclosure] = useState("");
  const [selectEnclosureID, setSelectEnclosureID] = useState("");
  const [selectEnclosureData, setSelectEnclosureData] = useState([]);
  const [isSelectEnclosure, setIsSelectEnclosure] = useState(false);

  const [selectCollectionType, setSelectCollectionType] = useState("");
  const [selectCollectionTypeID, setSelectCollectionTypeID] = useState("");
  const [selectCollectionTypeData, setSelectCollectionTypeData] = useState([]);
  const [isSelectCollectionType, setIsSelectCollectionType] = useState(false);

  const [accessionDate, setAccessionDate] = useState(new Date());

  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  const SetAcsnTypeDropDown = () => {
    setIsAcsnTypeMenuOpen(!isAcsnTypeMenuOpen);
    setIsSelectEnclosure(false);
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
  const SetSelectEncDropDown = () => {
    setIsSelectEnclosure(!isSelectEnclosure);
    setIsAcsnTypeMenuOpen(false);
    setIsSelectCollectionType(false);
  };

  const enclosurePressed = (item) => {
    setIsSelectEnclosure(!isSelectEnclosure);
    setSelectEnclosure(item.map((value) => value.name).join(","));
    setSelectEnclosureID(item.map((value) => value.id).join(","));
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    forthOneOpen();*/
    }
  };

  const catTaxonomydata = (item) => {
    if (item) {
      setSpecies(item.title);
      setSpeciesID(item.id);
      {
        /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
      thirdOneOpen()*/
      }
    }
  };

  const encClose = () => {
    setIsSelectEnclosure(false);
  };
  const SetCollectionTypeDown = () => {
    setIsSelectCollectionType(!isSelectCollectionType);
    setIsAcsnTypeMenuOpen(false);
    setIsSelectEnclosure(false);
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
    // else if (species.length === 0) {
    //   setIsError({ species: true });
    //   setErrorMessage({ species: "Select Taxonomy" });
    //   return false;
    // }
    else if (selectEnclosure.length === 0) {
      setIsError({ selectEnclosure: true });
      setErrorMessage({ selectEnclosure: "Select Enclosure" });
      return false;
    } else if (selectCollectionType.length === 0) {
      setIsError({ selectCollectionType: true });
      setErrorMessage({ selectCollectionType: "Select Collection Type" });
      return false;
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
      console.log("THIS IS THE OBJECT BEING SEND: ", requestObject);
      setLoding(true);

      addAnimal(requestObject)
        .then((response) => {
          console.log("THIS IS THE RESPONSE: ", response);
          if (response.success) {
            alert(response.message);
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
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoding(false);
        {
          /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
        handleSubmitFocus(maleinputRef) */
        }
      });
  };

  const maleinputRef = useRef(null);
  const femaleinputRef = useRef(null);
  const undetinputRef = useRef(null);
  const indetinputRef = useRef(null);
  const localinputRef = useRef(null);
  const datePicker1Ref = useRef(null);
  const datePicker21Ref = useRef(null);
  const handleSubmitFocus = (refs) => {
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    if (refs.current) {
      refs.current.focus();
    }*/
    }
  };

  const thirdOneOpen = () => {
    setIsSelectEnclosure(true);
  };
  const forthOneOpen = () => {
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
    setIsSelectCollectionType(false);
  };

  return (
    <>
      <CustomForm
        header={true}
        title={"Add Group of Animals"}
        marginBottom={60}
        onPress={handleOnPress}
      >
        <Loader visible={isLoading} />
        <View>
          <List.Section>
            <View>
              <List.Accordion title="Batch Options" id="1" expanded={true}  titleStyle={{ color: "black" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 2,
                  }}
                >
                  <View style={{ width: "50%", paddingHorizontal: 5 }}>
                    <InputBox
                      refs={maleinputRef}
                      // autoFocus={true}
                      inputLabel={"Male"}
                      placeholder={"Male"}
                      onFocus={dropdownOff}
                      keyboardType={"numeric"}
                      onSubmitEditing={() => handleSubmitFocus(femaleinputRef)}
                      value={maleCount}
                      onChange={(value) => {
                        checkNumber(value)
                          ? setMaleCount(value)
                          : setMaleCount("");
                      }}
                    />
                  </View>
                  <View style={{ width: "50%", paddingHorizontal: 5 }}>
                    <InputBox
                      refs={femaleinputRef}
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
                      onSubmitEditing={() => handleSubmitFocus(undetinputRef)}
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
                      refs={undetinputRef}
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
                      onSubmitEditing={() => handleSubmitFocus(indetinputRef)}
                    />
                  </View>
                  <View style={{ width: "50%", paddingHorizontal: 5 }}>
                    <InputBox
                      refs={indetinputRef}
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
            <List.Accordion title="Basic Information" id="1" expanded={true}  titleStyle={{ color: "black" }}>
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
                    onChange={(date) => {
                      setAccessionDate(date);
                    }}
                    onOpen={dropdownOff}
                  />
                  <AutoCompleteSearch
                    placeholder="Species/Taxonomy"
                    onPress={catTaxonomydata}
                  />

                  <InputBox
                    inputLabel={"Select Enclosure"}
                    placeholder={"Choose Enclosure"}
                    editable={false}
                    DropDown={SetSelectEncDropDown}
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
                  <InputBox
                    inputLabel={"Collection Type*"}
                    placeholder={"Choose collection"}
                    editable={false}
                    DropDown={SetCollectionTypeDown}
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
        </View>
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
    </>
  );
};
const Styles = StyleSheet.create({
  checkboxWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    borderColor: "grey",
    borderTopWidth: 0,
    marginTop: -10,
    padding: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
  },
  botton: {
    borderWidth: 0.8,
    borderColor: "grey",
    padding: 8,
    paddingHorizontal: 15,
  },
});
export default AnimalsAdd;
