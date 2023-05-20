// created by Wasim Akram

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
import { Checkbox, List, SegmentedButtons } from "react-native-paper";
import InputBox from "../../components/InputBox";
import DatePicker from "../../components/DatePicker";
import { listAccessionType } from "../../services/AccessionService";
import { GetEnclosure } from "../../services/FormEnclosureServices";
import moment from "moment";
import Loader from "../../components/Loader";
import {
  DeleteEggsEditList,
  editData,
  getEggConfigData,
  getParentEnclosure,
  getTaxonomic,
} from "../../services/EggsService";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AutoCompleteSearch } from "../../components/AutoCompleteSearch";
import Modal from "react-native-modal";

const EditEggForm = (props) => {

  // console.log(">>>>>>>>>>>>>>>>>>>",props.route.params?.item.egg_id )

  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [egg_id, setEgg_id] = useState(props.route.params?.item.egg_id ?? 0);
  const [accessionType, setAccessionType] = useState(
    props.route.params?.item.accession ?? ""
  );
  const [accessionTypeID, setAccessionTypeID] = useState(
    props.route.params?.item.accession_type ?? ""
  );
  const [accessionTypeData, setAccessionTypeData] = useState([]);
  const [isAcsnTypeMenuOpen, setisAcsnTypeMenuOpen] = useState(false);

  const [selectEnclosure, setSelectEnclosure] = useState(
    props.route.params?.item.enclosure_name ?? ""
  );
  const [selectEnclosureID, setSelectEnclosureID] = useState(
    props.route.params?.item.enclosure_id ?? ""
  );
  const [selectEnclosureData, setSelectEnclosureData] = useState([]);
  const [isSelectEnclosure, setIsSelectEnclosure] = useState(false);

  const [species, setSpecies] = useState(
    props.route.params?.item.vernacular_name ?? ""
  );
  const [sepciesID, setSpeciesID] = useState(
    props.route.params?.item.taxonomy_id ?? ""
  );
  const [speciesData, setSpeciesData] = useState([]);
  const [isSpecies, setIsSpecies] = useState(false);

  const [markLayDate, setMarkLayDate] = useState(
    Boolean(props.route.params?.item.lay_date_approx) ?? false
  );

  const [clutch, setClutch] = useState(props.route.params?.item.clutch ?? "");

  const [gastation, SetGastation] = useState(
    props.route.params?.item.hatching_period ?? ""
  );

  const [layDate, setLayDate] = useState(
    props.route.params?.item.lay_date ?? new Date()
  );
  const [foundDate, setFoundDate] = useState(
    props.route.params?.item.found_date ?? new Date()
  );

  const [fertilityStatus, setFertilityStatus] = useState(
    props.route.params?.item.fertility ?? ""
  );
  const [fertilityStatusID, setFertilityStatusID] = useState(
    props.route.params?.item.fertility_status ?? ""
  );
  const [fertilityStatusData, setFertilityStatusData] = useState([]);
  const [isFertilityStatus, setIsFertilityStatus] = useState(false);

  const [fertAsesmntMethod, setFertAsesmntMethod] = useState(
    props.route.params?.item.fertility_assessment_method_label ?? ""
  );
  const [fertAsesmntMethodID, setFertAsesmntMethodID] = useState(
    props.route.params?.item.fertility_assessment_method ?? ""
  );
  const [fertAsesmntMethodData, setFertAsesmntMethodData] = useState([]);
  const [isFertAsesmntMethod, setisFertAsesmntMethod] = useState(false);

  const [incubationType, setIncubationType] = useState(
    props.route.params?.item.incubation_type_label ?? ""
  );
  const [incubationTypeID, setIncubationTypeID] = useState(
    props.route.params?.item.incubation_type ?? ""
  );
  const [incubationTypeData, setIncubationTypeData] = useState([]);
  const [isIncubationType, setIsIncubationType] = useState(false);

  const [motherType, setMotherType] = useState(
    props.route.params?.item?.parent_female[0]?.parents
      ?.map((value) => value.local_id)
      .join(", ") ?? ""
  );
  const [motherTypeId, setMotherTypeId] = useState(
    props.route.params?.item?.parent_female[0]?.parents
      ?.map((value) => value.animal_id)
      .join(", ") ?? ""
  );
  const [isParentMotherTypeData, setIsParentMotherTypeData] = useState([]);
  const [isParentMotherType, setIsParentMotherType] = useState(false);

  const [fatherType, setFatherType] = useState(
    props.route.params?.item?.parent_male[0]?.parents
      ?.map((value) => value.local_id)
      .join(", ") ?? ""
  );
  const [fatherTypeId, setFatherTypeId] = useState(
    props.route.params?.item?.parent_male[0]?.parents
      ?.map((value) => value.animal_id)
      .join(", ") ?? ""
  );
  const [isParentFatherTypeData, setIsParentFatherTypeData] = useState([]);
  const [isParentFatherType, setIsparentFatherType] = useState(false);

  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setIsLoding] = useState(false);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  useEffect(() => {
    setIsLoding(true);
    // console.log({ props });
    listAccessionType()
      .then((res) => {
        setAccessionTypeData(
          res.data.map((item) => {
        return {
              id: item.accession_id,
              name: item.accession_type,
              isSelect: item.accession_id == accessionTypeID ? true : false
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        {
          /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
        handleSubmitFocus(accessRef) */
        }
        setIsLoding(false);
      });
  }, []);
  // console.log("THIS IS ACCESSION TYPE", accessionTypeData)
  useEffect(() => {
    setIsLoding(true);
    let postData = {
      zoo_id: zooID,
    };
    GetEnclosure(postData)
      .then((res) => {
        // console.log("EnclResponse===>", res);
        setSelectEnclosureData(
          res.data.map((item) =>
          // ({
          //   id: item.enclosure_id,
          //   name: item.user_enclosure_name,
          // })
          {
           
            return {
              id: item.enclosure_id,
              name: item.user_enclosure_name,
              isSelect: item.enclosure_id ==selectEnclosureID? true : false
            }
          }
          )
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // console.log("enclosure======>");
        setIsLoding(false);
      });
  }, []);
  //    useEffect(()=>{
  //     let obj={
  //       enclosure_id:1,
  //       gender:"male",
  //     }
  //     console.log("ParentData",obj)
  //     getMotherData(obj).then((res)=>{
  //     console.log("==>>>>",res)
  //   }).catch((err) => {
  //     console.log(err, "error");
  // });
  // },[])
  useEffect(() => {
    setIsLoding(true);
    getEggConfigData()
      .then((res) => {
        setFertilityStatusData(
          res.data.fertility_type.map((item) => {
            return{
              id: item.fertility_id,
              name: item.text,
              isSelect: item.fertility_id == fertilityStatusID ? true : false
            }
          })
        );
        setFertAsesmntMethodData(
          res.data.incubation_type.map((item) => {
            return {
              id: item.id,
              name: item.label,
              isSelect: item.id == fertAsesmntMethodID ? true : false
            }
            
          })
        );
        setIncubationTypeData(
          res.data.fertility_assessment.map((item) => {
            return {
              id: item.id,
              name: item.label,
              isSelect: item.id ==incubationTypeID ? true : false
            }
           
          })
        );

        // console.log("fertility", res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoding(false);
      });
  }, []);

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
    } else if (foundDate.length === 0) {
      setIsError({ foundDate: true });
      setErrorMessage({
        foundDate: "Select the Found Date ",
      });
      return false;
      // } else if (clutch.trim().length === 0) {
      //   setIsError({ clutch: true });
      //   setErrorMessage({ clutch: "Enter The Clutch" });
      //   return false;
      // } else if (motherType.length === 0) {
      //   setIsError({ motherType: true });
      //   setErrorMessage({ motherType: "Select the Parent Gender Options" });
      //   return false;
      // } else if (fatherType.length === 0) {
      //   setIsError({ fatherType: true });
      //   setErrorMessage({ fatherType: "Select the Parent Gender Options" });
      //   return false;
      // }else if (gastation.trim().length === 0) {
      //   setIsError({ gastation: true });
      //   setErrorMessage({ gastation: "Enter gastation period" });
      //   return false;
      // }else if (fertilityStatus.trim().length === 0) {
      //   setIsError({ fertilityStatus: true });
      //   setErrorMessage({ fertilityStatus: "Enter Fertility status" });
      //   return false;
      // }else if (fertAsesmntMethod.trim().length === 0) {
      //   setIsError({ fertAsesmntMethod: true });
      //   setErrorMessage({ fertAsesmntMethod: "Enter Fertility Assesmnet method" });
      //   return false;
      // }else if (incubationType.trim().length === 0) {
      //   setIsError({ incubationType: true });
      //   setErrorMessage({ incubationType: "Enter Fertility Assesmnet method" });
      //   return false;
    }
    return true;
  };
  // function for post the Edit Api
  const editEggData = () => {
    if (validation()) {
      let obje = {
        accession_type: accessionTypeID,
        enclosure_id: selectEnclosureID,
        taxonomy_id: sepciesID,
        lay_date: moment(layDate).format("YYYY-MM-DD"),
        found_date: moment(foundDate).format("YYYY-MM-DD"),
        // nest_location: 4,
        parent_female: motherTypeId,
        parent_male: fatherTypeId,
        description: "Edit egg",
        zoo_id: zooID,
        lay_date_approx: markLayDate,
        // hatched_status:1,
        egg_id: egg_id,
        gestation_period: gastation,
        clutch: clutch,
        fertility_status: fertilityStatusID,
        fertility_assessment_method: fertAsesmntMethodID,
        incubation_type: incubationTypeID,
      };
      console.log(obje);
      setIsLoding(true);
      editData(obje)
        .then((res) => {
          if (res.success) {
            setIsLoding(false);
            alert(res.message);
            navigation.goBack();
          }
          // console.log("post data response==>", res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoding(false);
        });
    }
  };

  // Delete Egg Function
  const DeleteEggData = () => {
      let obje = {
        egg_id: egg_id,
      };
      console.log("//////////",obje);
      setIsLoding(true);
      DeleteEggsEditList(obje)
        .then((res) => {
          if (res.success) {
            console.log("post data response==>", res);
            setIsLoding(false);
            navigation.navigate("EggLists");
          }
          
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoding(false);
        });
  };
     
  // function for  select enclosure onCatPressed.
  const enclosurePressed = (item) => {
    let enclosure_id = item.map((value) => value.id).join(",");
    setSelectEnclosure(item.map((value) => value.name).join(","));
    setSelectEnclosureID(enclosure_id);
    setIsSelectEnclosure(!isSelectEnclosure);
    // setIsSpecies(true);
    // datePickerRef.current.focus();
    Promise.all([
      getParentEnclosure({ enclosure_id: enclosure_id, gender: "male" }),
      getParentEnclosure({ enclosure_id: enclosure_id, gender: "female" }),
    ])
      .then((res) => {
        console.log({ res });
        setIsParentFatherTypeData(
          res[0].data.map((item) => {
            return {
              id: item.animal_id,
              name: item?.complete_name ?? "N/A",
              
            };
          })
        );
        setIsParentMotherTypeData(
          res[1].data.map((item) => {
            return {
              id: item.animal_id,
              name: item.local_id,
            };
          })
        );
        {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
        handleSubmitFocus(taxonomyRef, 1000);
        console.log({ res });*/}
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // function for  select Accession Type onCatPressed.
  const accessPressed = (item) => {
    setisAcsnTypeMenuOpen(!isAcsnTypeMenuOpen);
    setAccessionType(item.map((value) => value.name).join(","));
    // console.log(item.map((value)=> value.name));
    setAccessionTypeID(item.map((value) => value.id).join(","));
    // setIsSelectEnclosure(true);
    {
      /* Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    enclRef.current.focus();*/
    }
  };

  //this is  function Taxonomay dropDwon Filed
  const catTaxonomydata = (item) => {
    if (item) {
      setSpecies(item.title);
      setSpeciesID(item.id);
      // datePickerRef.current.focus();
    }
  };

  // function for  select Taxonomy onCatPressed.
  const fertilityAssessPressed = (item) => {
    setisFertAsesmntMethod(!isFertAsesmntMethod);
    setFertAsesmntMethod(item.map((value) => value.name).join(","));
    setFertAsesmntMethodID(item.map((value) => value.id).join(","));
    // setIsIncubationType(true);
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    incubationRef.current.focus();*/}
  };
  // function for  select Fertility onCatPressed.
  const fertilityPressed = (item) => {
    setIsFertilityStatus(!isFertilityStatus);
    setFertilityStatus(item.map((value) => value.name).join(","));
    setFertilityStatusID(item.map((value) => value.id).join(","));
    // setisFertAsesmntMethod(true);
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    fertAsesmntMethodRef.current.focus();*/}
  };
  // function for  select incubationType onCatPressed.
  const incubationPressed = (item) => {
    setIsIncubationType(!isIncubationType);
    setIncubationType(item.map((value) => value.name).join(","));
    setIncubationTypeID(item.map((value) => value.id).join(","));
  };
  // function for  select motherType onCatPressed.
  const motherPressed = (item) => {
    // setIsParentMotherType(!isParentMotherType);
    setMotherType(item.map((value) => value.name).join(","));
    setMotherTypeId(item.map((value) => value.id).join(","));
    motherTypeClose();
    // maleRef.current.focus();
  };
  // function for  select fatherType onCatPressed.
  const fatherPressed = (item) => {
    // setIsparentFatherType(!isParentFatherType);
    setFatherType(item.map((value) => value.name).join(","));
    setFatherTypeId(item.map((value) => value.id).join(","));
    fatherTypeClose()
    // gastationRef.current.focus();
  };
  const SetAcsnTypeDropDown = () => {
    setisAcsnTypeMenuOpen(!isAcsnTypeMenuOpen);
    setIsSelectEnclosure(false);
    setIsSpecies(false);
    setIsIncubationType(false);
    setisFertAsesmntMethod(false);
    setIsFertilityStatus(false);
    setIsParentMotherType(false);
    setIsparentFatherType(false);
  };

  const SetSelectEncDropDown = () => {
    setIsSelectEnclosure(!isSelectEnclosure);
    setisAcsnTypeMenuOpen(false);
    setIsSpecies(false);

    setIsIncubationType(false);
    setisFertAsesmntMethod(false);
    setIsFertilityStatus(false);
  };

  const SetSpeciesDown = () => {
    setIsSpecies(!isSpecies);
    setIsSelectEnclosure(false);
    setisAcsnTypeMenuOpen(false);

    setIsIncubationType(false);
    setisFertAsesmntMethod(false);
    setIsFertilityStatus(false);
  };

  const onPressMarkLayDate = () => {
    setMarkLayDate(!markLayDate);
  };
  // function for open fertility dropdown.
  const SetFertilityDown = () => {
    setIsFertilityStatus(!isFertilityStatus);
    setIsSelectEnclosure(false);
    setisAcsnTypeMenuOpen(false);
    setIsSpecies(false);

    setIsIncubationType(false);
    setisFertAsesmntMethod(false);
  };
  // function for open fertility assesment method dropdown.
  const SetAsesmntMethodDown = () => {
    setisFertAsesmntMethod(!isFertAsesmntMethod);
    setIsSelectEnclosure(false);
    setisAcsnTypeMenuOpen(false);
    setIsSpecies(false);

    setIsIncubationType(false);
    setIsFertilityStatus(false);
  };
  // function for open incubationtype dropdown.
  const SetIncubationTypeDown = () => {
    setIsIncubationType(!isIncubationType);

    setIsSelectEnclosure(false);
    setisAcsnTypeMenuOpen(false);
    setIsSpecies(false);
    setisFertAsesmntMethod(false);
    setIsFertilityStatus(false);
  };
  // function for open motherParentType Dropdown.
  const SetMotherParentTypeDown = (data) => {
    setIsParentMotherType(data);
    setIsSelectEnclosure(false);
    setisAcsnTypeMenuOpen(false);
    setIsSpecies(false);
    setisFertAsesmntMethod(false);
    setIsFertilityStatus(false);
    setIsIncubationType(false);
  };
  // function for open fatherParentType Dropdown.
  const SetFatherParentTypeDown = () => {
    setIsparentFatherType(!isParentFatherType);
    setIsSelectEnclosure(false);
    setisAcsnTypeMenuOpen(false);
    setIsSpecies(false);
    setisFertAsesmntMethod(false);
    setIsFertilityStatus(false);
    setIsIncubationType(false);
    setIsParentMotherType(false);
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

  const fertStatusClose = () => {
    setIsFertilityStatus(false);
  };

  const assessmentMethodClose = () => {
    setisFertAsesmntMethod(false);
  };
  const incubationTypeClose = () => {
    setIsIncubationType(false);
  };
  const motherTypeClose = () => {
    setIsParentMotherType(false);
    // setIsparentFatherType(true);
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    maleRef.current.focus();*/}
  };
  const fatherTypeClose = () => {
    setIsparentFatherType(false);
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    gastationRef.current.focus();*/}
    // handleSubmitFocus(input2Ref);
  };
  const getdateLay = (date) => {
    setLayDate(date);
    // console.log(layDate,"Laydate")
  };
  const getdateFound = (date) => {
    setFoundDate(date);
    // console.log(foundDate,"Founddate")
  };
  const accessRef = useRef(null);
  const gastationRef = useRef(null);
  const datePickerRef = useRef(null);
  const datePicker2Ref = useRef(null);
  const enclRef = useRef(null);
  const taxonomyRef = useRef(null);
  const femaleRef = useRef(null);
  const maleRef = useRef(null);
  const fertAsesmntMethodRef = useRef(null);
  const incubationRef = useRef(null);
  const handleSubmitFocus = (refs) => {
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 01.05.2023
    if (refs.current) {
      refs.current.focus();
    }*/}
  };

  const dropdownOff = () => {
    setisAcsnTypeMenuOpen(false);
    setIsSelectEnclosure(false);
    setIsParentMotherType(false);
    setIsparentFatherType(false);
    setIsFertilityStatus(false);
    setisFertAsesmntMethod(false);
    setIsIncubationType(false);
  };
  return (
    <>
      {/* {isLoading ? <Loader /> : */}
      <Loader visible={isLoading} />
      <CustomForm
        header={true}
        title={"Edit Egg"}
        marginBottom={50}
        onPress={editEggData}
      //   onPress={enclosure_id > 0 ? getEnclosureEdit : getEnclosureFormData}
      >
        <List.Section>
          <List.Accordion
            title="Basic Information"
            id="1"
            expanded={true}
            titleStyle={{ color: "black" }}
          // right={(props) => <List.Icon {...props} icon="plus" />}
          >
            <View style={{}}>
              <View>
                <InputBox
                  inputLabel={"Accession Type"}
                  placeholder={"Enter Accession Type"}
                  refs={accessRef}
                  editable={false}
                  DropDown={SetAcsnTypeDropDown}
                  onFocus={SetAcsnTypeDropDown}
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
                  // onSubmitEditing={() => handleSubmitFocus(datePickerRef)}
                  errors={errorMessage.selectEnclosure}
                  isError={isError.selectEnclosure}
                />
                <AutoCompleteSearch
                  refs={taxonomyRef}
                  placeholder="Enter atleast 3 charecter to search..."
                  label="Species/Taxonomy"
                  value={species}
                  onPress={catTaxonomydata}
                  // onSubmitEditing={()=>handleSubmitFocus(datePickerRef)}
                  errors={errorMessage.species}
                  isError={isError.species}
                />
                {isError.species ? (
                  <Text style={{ color: "red", fontSize: 13 }}>
                    {errorMessage.species}
                  </Text>
                ) : null}
                {/* <InputBox
                    inputLabel={"Species/Taxonomy"}
                    placeholder={"Choose Species"}
                    editable={false}
                    value={species}
                    defaultValue={species != null ? species : null}
                    rightElement={isSpecies ? "chevron-up" : "chevron-down"}
                    DropDown={SetSpeciesDown}
                    errors={errorMessage.species}
                    isError={isError.species}
                  /> */}
                <View>
                  <DatePicker
                    title="Lay Date"
                    style={{ borderBottomLeftRadius: 0 }}
                    today={layDate}
                    refs={datePickerRef}
                    onOpen={dropdownOff}
                    onChange={(date) => {
                      [setLayDate(date)];
                    }}
                    errors={errorMessage.layDate}
                    isError={isError.layDate}
                  />

                  <View style={styles.checkboxWrap}>
                    <Checkbox.Android
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

                <DatePicker
                  title="Found Date"
                  today={foundDate}
                  refs={datePicker2Ref}
                  onOpen={dropdownOff}
                  onChange={getdateFound}
                  errors={errorMessage.foundDate}
                  isError={isError.foundDate}
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
              placeholder={"Choose Clutch"}
              autoFocus={false}
              onFocus={dropdownOff}
              value={clutch}
              onChange={(value) => setClutch(value)}
              onSubmitEditing={() => handleSubmitFocus(femaleRef)}
            />
            <InputBox
              inputLabel={"Parent Mother"}
              placeholder={"Enter Mother Name"}
              editable={false}
              refs={femaleRef}
              value={motherType}
              rightElement={isParentMotherType ? "chevron-up" : "chevron-down"}
              DropDown={SetMotherParentTypeDown}
              onFocus={SetMotherParentTypeDown}
            />
            <InputBox
              inputLabel={"Parent Father"}
              placeholder={"Enter Father Name"}
              editable={false}
              refs={maleRef}
              value={fatherType}
              rightElement={isParentFatherType ? "chevron-up" : "chevron-down"}
              DropDown={SetFatherParentTypeDown}
              onFocus={SetFatherParentTypeDown}
            // errors={errorMessage.fatherType}
            // isError={isError.fatherType}
            />
            <InputBox
              refs={gastationRef}
              inputLabel={"Gestation Period"}
              placeholder={"Enter Gestation Period"}
              onFocus={dropdownOff}
              onChange={(value) => SetGastation(value)}
              value={gastation}
              keyboardType="numeric"
            />
          </List.Accordion>
          <List.Accordion
            title="Fertility and Incubation"
            id="2"
            titleStyle={{ color: "black" }}
          >
            <InputBox
              inputLabel={"Fertility Status"}
              placeholder={"Choose Fertility Status"}
              editable={false}
              value={fertilityStatus}
              autoFocus={false}
              defaultValue={fertilityStatus != null ? fertilityStatus : null}
              rightElement={isFertilityStatus ? "chevron-up" : "chevron-down"}
              DropDown={SetFertilityDown}
              onFocus={SetFertilityDown}
              onSubmitEditing={() => handleSubmitFocus(fertAsesmntMethodRef)}
            />
            <InputBox
              inputLabel={"Fertility Assessment Method"}
              placeholder={"Choose Fertility Assessment Method"}
              editable={false}
              refs={fertAsesmntMethodRef}
              value={fertAsesmntMethod}
              defaultValue={
                fertAsesmntMethod != null ? fertAsesmntMethod : null
              }
              rightElement={isFertAsesmntMethod ? "chevron-up" : "chevron-down"}
              DropDown={SetAsesmntMethodDown}
              onFocus={SetAsesmntMethodDown}
              onSubmitEditing={() => handleSubmitFocus(incubationRef)}
            />
            <InputBox
              inputLabel={"Incubation Type"}
              placeholder={"Choose Incubation Type"}
              editable={false}
              refs={incubationRef}
              value={incubationType}
              defaultValue={incubationType != null ? incubationType : null}
              rightElement={isIncubationType ? "chevron-up" : "chevron-down"}
              DropDown={SetIncubationTypeDown}
            />
          </List.Accordion>
        </List.AccordionGroup>
        <TouchableOpacity
          // button added for delete the egg data.
          // onPress={() => {
          //   // setAccessionType(""),
          //   //   setSelectEnclosure(""),
          //   //   setSpecies(""),
          //   //   //  setLayDate(""),
          //   //   //  setFoundDate(""),
          //   //   setClutch(""),
          //   //   setFertilityStatus(""),
          //   //   setFertAsesmntMethod(""),
          //   //   setIncubationType("");
          // }}
          onPress={DeleteEggData}
          style={{
            width: "100%",
            alignSelf: "center",
            marginTop: 10,
            borderWidth: 1,
            borderColor: "red",
            height: 45,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              padding: 10,
              fontSize: 15,
              color: "red",
            }}
          >
            Delete Egg
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

      {/* {isSpecies ? (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Category
            categoryData={speciesData}
            onCatPress={taxonomyPressed}
            heading={"Choose Species"}
            isMulti={false}
            onClose={speciesClose}
          />
        </View>
      ) : null} */}

      {isFertilityStatus ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isFertilityStatus}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={fertStatusClose}
          >
            <Category
              categoryData={fertilityStatusData}
              onCatPress={fertilityPressed}
              heading={"Choose Fertility Status"}
              isMulti={false}
              onClose={fertStatusClose}
            />
          </Modal>
        </View>
      ) : null}

      {isFertAsesmntMethod ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isFertAsesmntMethod}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={assessmentMethodClose}
          >
            <Category
              categoryData={fertAsesmntMethodData}
              onCatPress={fertilityAssessPressed}
              heading={"Choose Fertility Assessment Method"}
              isMulti={false}
              onClose={assessmentMethodClose}
            />
          </Modal>
        </View>
      ) : null}

      {isIncubationType ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isIncubationType}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={incubationTypeClose}
          >
            <Category
              categoryData={incubationTypeData}
              onCatPress={incubationPressed}
              heading={"Choose Incubation Type"}
              isMulti={false}
              onClose={incubationTypeClose}
            />
          </Modal>
        </View>
      ) : null}

      {isParentMotherType ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isParentMotherType}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={motherTypeClose}
          >
            <Category
              categoryData={isParentMotherTypeData}
              onCatPress={motherPressed}
              heading={"Choose Parent Mother"}
              isMulti={true}
              onClose={motherTypeClose}
            />
          </Modal>
        </View>
      ) : null}

      {isParentFatherType ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isParentFatherType}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={fatherTypeClose}
          >
            <Category
              categoryData={isParentFatherTypeData}
              onCatPress={fatherPressed}
              heading={"Choose Parent Father"}
              isMulti={true}
              onClose={fatherTypeClose}
            />
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default EditEggForm;

const styles = StyleSheet.create({
  checkboxWrap: {
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
});
