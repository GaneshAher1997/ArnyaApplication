// Author: Ganesh Aher
// Date: 04-05-2023
// work:

// 1.Design and impliment the edit API on Design.
// 2.Edit Enclosure api implementation
// 3.Delete Enclosure Design
// 4.Add long lat in edit enclosure page.
// 5.design and impliment api on Enclosure Incharge field (Date: 05-05-23)

import React, { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import {
  getSection,
  getEnclosurebySection,
  DeleteEnclosure,
} from "../../services/staffManagement/getEducationType";
import { editEnclosure } from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { Checkbox, List, SegmentedButtons } from "react-native-paper";

import InputBox from "../../components/InputBox";
import CheckBox from "../../components/CheckBox";
import { getEnclosureService } from "../../services/SettingEnclosure";
import DatePicker from "../../components/DatePicker";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import Colors from "../../configs/Colors";
import { getStaffList } from "../../services/staffManagement/addPersonalDetails";
import { log } from "react-native-reanimated";
import moment from "moment";

const EnclosureEdit = (props) => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const [value, setValue] = useState("single");
  const [enclosureCode, setEnclosureCode] = useState(
    props.route.params?.item.enclosure_code ?? ""
  );

  const [enclosure_id, SetEnclosure_id] = useState(
    props.route.params?.item.enclosure_id ?? ""
  );

  const [enclosureName, setEnclosureName] = useState(
    props.route.params?.item?.user_enclosure_name ?? ""
  );

  const [userEnclosureId, setUserEnclosureId] = useState(
    props.route.params?.item?.user_enclosure_id ?? ""
  );

  const [encEnvData, setencEnvData] = useState([]);

  const [enclosureEnvironment, setEnclosureEnvironment] = useState(
    props.route.params?.item.enclosure_environment ?? ""
  );

  const [enclosureType, setEnclosureType] = useState("");

  const [enclosureTypeId, setEnclosureTypeId] = useState(
    props.route.params?.item.enclosure_type ?? ""
  );

  const [section, setSection] = useState(
    props.route.params?.item?.section_name ?? ""
  );

  const [sectionId, setSectionId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  const [isInchargeMenuOpen, setIsInchargeMenuOpen] = useState(false);
  const [incharge, setIncharge] = useState("");

  const [inchargeId, setInchargeId] = useState(
    props.route.params?.item?.enclosure_incharge_id ?? ""
  );
  const [inchargeData, setInchargeData] = useState([]);

  const [enclosure, setParentEnclosure] = useState("");

  const [enclosureParentId, setParentEnclosureId] = useState(
    props.route.params?.item?.enclosure_parent_id ?? ""
  );

  const [isMovable, setIsMovable] = useState(
    props.route.params?.item?.enclosure_is_movable == "1" ? true : false
  );
  const [isWalkable, setIsWalkable] = useState(
    props.route.params?.item?.enclosure_is_walkable == "1" ? true : false
  );

  const [enclosureSunlight, setEnclosureSunlight] = useState(
    props.route.params?.item?.enclosure_sunlight ?? ""
  );

  const [isSunlight, setIsSunlight] = useState(false);

  const [sunlightData, setSunlightData] = useState([
    {
      id: "0",
      name: "Moderate",
      isSelect:
        "Moderate" == props.route.params?.item.enclosure_sunlight
          ? true
          : false,
    },
    {
      id: "1",
      name: "Good",
      isSelect:
        "Good" == props.route.params?.item.enclosure_sunlight ? true : false,
    },
    {
      id: "2",
      name: "Bad",
      isSelect:
        "Bad" == props.route.params?.item.enclosure_sunlight ? true : false,
    },
  ]);

  const [foundDate, setFoundDate] = useState(
    props.route.params?.item.commistioned_date ?? new Date()
  );

  const [enclosureDesc, SetEnclosureDesc] = useState(
    props.route.params?.item?.enclosure_desc ?? ""
  );

  const [enclosure_lat, Setenclosure_lat] = useState(
    props.route.params?.item?.enclosure_lat ?? "0"
  );

  const [enclosure_long, Setenclosure_long] = useState(
    props.route.params?.item?.enclosure_long ?? "0"
  );

  const [enclosure_status, Setenclosure_status] = useState(
    props.route.params?.item?.enclosure_status ?? ""
  );

  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [sectionData, setSectionData] = useState([]);

  const [isEnclosureOpen, setIsEnclosureOpen] = useState(false);
  const [enclosureData, setEnclosureData] = useState([]);

  const [isEncEnvMenuOpen, setisEncEnvMenuOpen] = useState(false);

  const [aquaEnctype, setAquaEnctype] = useState([]);

  const [isEncTypeMenuOpen, setisEncTypeMenuOpen] = useState(false);

  const [encTypeData, setencTypeData] = useState([]);

  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoding] = useState(false);

  const user_id = useSelector((state) => state.UserAuth.userDetails.user_id);

  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  const [longitude, setLongitude] = useState(
    props.route.params?.item.enclosure_long ?? ""
  );

  const [latitude, setLatitude] = useState(
    props.route.params?.item.enclosure_lat ?? ""
  );

  const encNameRef = useRef(null);
  const envTypeRef = useRef(null);
  const encTypeRef = useRef(null);
  const secRef = useRef(null);
  const parentEncRef = useRef(null);
  const sunlightRef = useRef(null);
  const datePickerRef = useRef(null);
  const notesRef = useRef(null);

  const getLocation = async (check) => {
    setLoding(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLoding(false);
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    if(check){
      setLongitude(location.coords.longitude.toString());
      setLatitude(location.coords.latitude.toString());
      setLoding(false);
    }
  };
  // console.log('latitude',latitude,"********")

  const catPressed = (item) => {
    setSection(item.map((u) => u.name).join(", "));
    setSectionId(item.map((id) => id.id).join(","));
    setIsSectionMenuOpen(false);
  };

  const catClose = () => {
    setIsSectionMenuOpen(false);
  };

  // ..........................Incharge ..................................
  const inchargeCatPressed = (item) => {
    setIncharge(item.map((u) => u.name).join(", "));

    setInchargeId(item.map((id) => id.id).join(","));

    setIsInchargeMenuOpen(false);
  };

  const inchargeCatClose = () => {
    setIsInchargeMenuOpen(false);
    // parentEncRef.current.focus();
  };

  const parentEnclosurePressed = (item) => {
    setParentEnclosure(item.map((u) => u.name).join(", "));
    setParentEnclosureId(item.map((id) => id.id).join(","));
    setIsEnclosureOpen(false);
  };

  const parentEnclosureClose = () => {
    setIsEnclosureOpen(false);
  };

  const catEnvPress = (item) => {
    setEnclosureEnvironment(item.map((u) => u.name).join(","));

    setisEncEnvMenuOpen(false);
  };

  const catEnvClose = () => {
    setisEncEnvMenuOpen(false);
  };

  const catEnTypePress = (item) => {
    setEnclosureType(item.map((u) => u.name).join(","));
    setEnclosureTypeId(item.map((u) => u.id).join(","));
    setisEncTypeMenuOpen(false);
  };

  const catEnTypeClose = () => {
    setisEncTypeMenuOpen(false);
  };

  const catIsSunlightPress = (item) => {
    item.map((u) => u.name).join(",");
    setEnclosureSunlight(item.map((u) => u.name).join(","));
    setIsSunlight(false);
  };

  const catIsSunlightClose = () => {
    setIsSunlight(false);
  };

  useEffect(() => {
    if (sectionId) {
      getEnclosurebySection(sectionId).then((res) => {
        let enc = res?.data.map((item) => {
          return {
            id: item.enclosure_id,
            name: item.user_enclosure_name,
            isSelect: item.enclosure_id == enclosureParentId ? true : false,
          };
        });
        setEnclosureData(enc);
        let parent_enclosure = enc.filter(
          (item) => item.id == enclosureParentId
        );
        setParentEnclosure(parent_enclosure[0].name);
      });
    }
  }, [sectionId]);

  // Fetch all data

  useEffect(() => {
    setLoding(true);
    var requestObj = {
      zoo_id: zooID,
    };
    Promise.all([
      getStaffList(requestObj),
      getSection(requestObj),
      getEnclosureService(),
      getLocation(false)
    ])
      .then((res) => {
        let incharges = res[0].data.map((item) => {
          return {
            id: item._id,
            name: item.user_first_name + " " + item.user_last_name,
            isSelect: item._id == inchargeId ? true : false,
          };
        });
        setInchargeData(incharges);

        let section = res[1].data.map((item) => {
          return {
            id: item.section_id,
            name: item.section_name,
            isSelect: item.section_id == sectionId ? true : false,
          };
        });
        setSectionData(section);

        let environments = res[2].data.environment_type.map((item) => {
          return {
            id: item.id,
            name: item.name,
            isSelect: item.name == enclosureEnvironment ? true : false,
          };
        });
        setencEnvData(environments);

        let aquatic_enclosure_type = res[2].data.aquatic_enclosure_type.map(
          (item) => {
            return {
              id: item.id,
              name: item.name,
              isSelect: item.id == enclosureTypeId ? true : false,
            };
          }
        );
        setAquaEnctype(aquatic_enclosure_type);

        let enclosure_type = res[2].data.enclosure_type.map((item) => {
          return {
            id: item.id,
            name: item.name,
            isSelect: item.id == enclosureTypeId ? true : false,
          };
        });
        setencTypeData(enclosure_type);

        let type_name_aqua = res[2].data.aquatic_enclosure_type.filter(
          (item) => item.id == enclosureTypeId
        );
        let type_name = res[2].data.enclosure_type.filter(
          (item) => item.id == enclosureTypeId
        );
        let incharge_name = incharges.filter((item) => item.id == inchargeId);
        setIncharge(incharge_name[0].name);
        setEnclosureType(
          type_name_aqua.length > 0 ? type_name_aqua[0].name : type_name[0].name
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoding(false);
      });
  }, []);

  // Delete Enclosure Function
  const DeleteEnclosureData = (id) => {
    let obje = {
      enclosure_id: enclosure_id,
    };
    setLoding(true);
    DeleteEnclosure(obje)
      .then((res) => {
        setLoding(false);
        if (res.success) {
          alert(res.message);

          setTimeout(() => {
            navigation.navigate("EnclosureList");
          }, 500);
        }
      })
      .catch((err) => {
        setLoding(false);
        console.log(err);
      });
  };

  const validation = () => {
    if (enclosureName.trim().length === 0) {
      setIsError({ enclosureName: true });
      setErrorMessage({ enclosureName: "Enter The Name" });
      return false;
    } else if (enclosureEnvironment.trim().length === 0) {
      setIsError({ enclosureEnvironment: true });
      setErrorMessage({
        enclosureEnvironment: "Enter The Enclosure Environment",
      });
      return false;
    } else if (enclosureType.trim().length === 0) {
      setIsError({ enclosureType: true });
      setErrorMessage({ enclosureType: "Enter The Enclosure Type" });
      return false;
    } else if (section.length === 0) {
      setIsError({ section: true });
      setErrorMessage({ section: "Select Section Id" });
      return false;
    } else if (incharge.length === 0) {
      setIsError({ incharge: true });
      setErrorMessage({ incharge: "Select incharge Id" });
      return false;
    } else if (longitude.length === 0) {
      setIsError({ longitude: true });
      setErrorMessage({ longitude: "Select longitude" });
      return false;
    } else if (latitude.length === 0) {
      setIsError({ latitude: true });
      setErrorMessage({ latitude: "Select latitude" });
      return false;
    }

    return true;
  };

  const getEnclosureEdit = () => {
    if (validation()) {
      let obj = {
        enclosure_id: enclosure_id,
        user_enclosure_name: enclosureName,
        section_id: sectionId,
        enclosure_desc: enclosureDesc,
        enclosure_environment: enclosureEnvironment,
        enclosure_incharge_id: inchargeId,
        user_enclosure_id: userEnclosureId,
        enclosure_is_movable: Number(isMovable),
        enclosure_is_walkable: Number(isWalkable),
        enclosure_type: enclosureTypeId,
        enclosure_sunlight: enclosureSunlight,
        enclosure_parent_id: enclosureParentId,
        enclosure_lat: latitude,
        enclosure_long: longitude,
        commistioned_date: moment(foundDate).format("YYYY-MM-DD"),
        enclosure_status: enclosure_status,
        enclosure_code: enclosureCode,
      };
      console.log("edit obj=========", obj);
      setLoding(true);
      editEnclosure(obj)
        .then((res) => {
          if (res.success) {
            alert("Enclosure Edit successfully");
            navigation.goBack();
          }
          console.log("post data response", res);
        })
        .catch((err) => {
          console.log("error===>", err);
        })
        .finally(() => {
          setLoding(false);
        });
    }
  };

  const SetEncDropDown = (data) => {
    setIsSectionMenuOpen(!isSectionMenuOpen);
    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(false);

    setIsSunlight(false);
    setIsInchargeMenuOpen(false);
  };

  // incharge
  const SetInchargeDropDown = () => {
    setIsInchargeMenuOpen(!isInchargeMenuOpen);

    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(false);
    setIsSectionMenuOpen(false);

    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(false);
  };
  const SetParentEncDropDown = (data) => {
    setIsSectionMenuOpen(false);
    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(!isEnclosureOpen);

    setIsSunlight(false);
    setIsInchargeMenuOpen(false);
  };

  const SetEnvTypeDropDown = (data) => {
    setisEncEnvMenuOpen(!isEncEnvMenuOpen);
    setIsSectionMenuOpen(false);
    setisEncTypeMenuOpen(false);

    setIsSunlight(false);
    setIsEnclosureOpen(false);
    setIsInchargeMenuOpen(false);
  };

  const SetEncTypeDropDown = (data) => {
    setisEncTypeMenuOpen(!isEncTypeMenuOpen);
    setisEncEnvMenuOpen(false);
    setIsSectionMenuOpen(false);

    setIsSunlight(false);
    setIsEnclosureOpen(false);
    setIsInchargeMenuOpen(false);
  };

  const SetIsSunlightDropDown = () => {
    setIsSunlight(!isSunlight);

    setIsSectionMenuOpen(false);
    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(false);
    setIsInchargeMenuOpen(false);
  };

  const dropdownOff = () => {
    setIsSunlight(false);

    setIsSectionMenuOpen(false);
    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(false);
    setIsInchargeMenuOpen(false);
  };

  const getdateFound = (date) => {
    setFoundDate(date);
    handleSubmitFocus(notesRef);
  };

  const onCheckLimitEnclosure = (value) => {
    const cleanNumber = value.replace(/^0|[^0-9]/g, "");

    setBatchCount(cleanNumber);
    setIsError({ enclosureCount: false });
  };

  const onCheckLimitSequense = (value) => {
    const cleanNumber = value.replace(/^0|[^0-9]/g, "");

    setBatchStartSeq(cleanNumber);
    setIsError({ enclosureSequense: false });
  };

  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

  const handleSubmitFocus = (refs) => {};

  const onPressMovable = () => {
    setIsMovable(!isMovable);
  };
  const onPressWalkable = () => {
    setIsWalkable(!isWalkable);
  };

  return (
    <>
      <Loader visible={loading} />
      <CustomForm
        header={true}
        title={"Edit Enclosure"}
        marginBottom={60}
        onPress={getEnclosureEdit}
      >
        <View>
          <List.AccordionGroup expandedId="1">
            <List.Accordion title="Basic Information" id="1"  titleStyle={{ color: "black" }}>
              <View style={{ marginBottom: 15 }}>
                <InputBox
                  refs={encNameRef}
                  keyboardType={"default"}
                  value={enclosureName}
                  inputLabel={
                    value === "single"
                      ? "Enclosure Name/Prefix*"
                      : "Enclosure Prefix*"
                  }
                  placeholder={
                    value === "single"
                      ? "Enter Enclosure Name/Prefix"
                      : "Enter Enclosure Prefix"
                  }
                  onFocus={dropdownOff}
                  onChange={(value) => setEnclosureName(value)}
                  onSubmitEditing={() => handleSubmitFocus(envTypeRef)}
                  isError={isError.enclosureName}
                  errors={errorMessage.enclosureName}
                />
                <InputBox
                  refs={envTypeRef}
                  inputLabel={"Environment Type*"}
                  placeholder={"Choose environment"}
                  value={enclosureEnvironment}
                  defaultValue={
                    enclosureEnvironment != null ? enclosureEnvironment : null
                  }
                  rightElement={
                    isEncEnvMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  onFocus={SetEnvTypeDropDown}
                  DropDown={SetEnvTypeDropDown}
                  errors={errorMessage.enclosureEnvironment}
                  isError={isError.enclosureEnvironment}
                />

                <InputBox
                  inputLabel={"Enclosure Type*"}
                  placeholder={"Choose enclosure type"}
                  refs={encTypeRef}
                  value={enclosureType}
                  defaultValue={enclosureType != null ? enclosureType : null}
                  rightElement={
                    isEncTypeMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  onFocus={SetEncTypeDropDown}
                  DropDown={SetEncTypeDropDown}
                  errors={errorMessage.enclosureType}
                  isError={isError.enclosureType}
                />

                <InputBox
                  inputLabel={"Choose Section*"}
                  placeholder={"Choose Section Name"}
                  refs={secRef}
                  value={section}
                  defaultValue={section != null ? section : null}
                  onFocus={SetEncDropDown}
                  DropDown={SetEncDropDown}
                  rightElement={
                    isSectionMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  errors={errorMessage.section}
                  isError={isError.section}
                  helpText={"Location within the zoo single"}
                />

                {enclosure || enclosureParentId ? (
                  <InputBox
                    inputLabel={"Parent Enclosure"}
                    placeholder={"Choose Parent Enclosure"}
                    refs={parentEncRef}
                    value={enclosure}
                    defaultValue={section != null ? section : null}
                    onFocus={SetParentEncDropDown}
                    DropDown={SetParentEncDropDown}
                    rightElement={
                      isEnclosureOpen ? "chevron-up" : "chevron-down"
                    }
                    errors={errorMessage.enclosure}
                    isError={isError.enclosure}
                    helpText={"Assign your enclosure as child under this"}
                  />
                ) : null}

                {/* ..........................Incharge Enclosure................................ */}

                <InputBox
                  inputLabel={"Enclosure Incharge *"}
                  placeholder={"Choose Enclosure Incharge"}
                  value={incharge}
                  defaultValue={incharge != null ? incharge : null}
                  onFocus={SetInchargeDropDown}
                  DropDown={SetInchargeDropDown}
                  rightElement={
                    isInchargeMenuOpen ? "chevron-up" : "chevron-down"
                  }
                  errors={errorMessage.incharge}
                  isError={isError.incharge}
                  // helpText={"Location within the zoo single"}
                />

                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 5,
                    padding: 3,
                  }}
                >
                  <View style={{ flex: 7 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: isSwitchOn ? "white" : "black",
                      }}
                    >
                      Location of the Enclosure
                    </Text>
                  </View>
                  <View style={{ justifyContent: "flex-end" }}>
                    <TouchableOpacity onPress={()=>getLocation(true)}>
                      <MaterialIcons
                        name="my-location"
                        size={23}
                        color={isSwitchOn ? "white" : "black"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginHorizontal: 13 }}>
                  <InputBox
                    inputLabel={"Longitude"}
                    placeholder={"Longitude"}
                    keyboardType={"numeric"}
                    onFocus={dropdownOff}
                    errors={errorMessage.longitude}
                    isError={isError.longitude}
                    value={longitude}
                    onChange={(value) => {
                      checkNumber(value, "longitude")
                        ? setLongitude(value)
                        : setLongitude("");
                    }}
                  />

                  <InputBox
                    inputLabel={"Latitude"}
                    placeholder={"Latitude"}
                    keyboardType={"numeric"}
                    onFocus={dropdownOff}
                    errors={errorMessage.latitude}
                    isError={isError.latitude}
                    value={latitude}
                    onChange={(value) => {
                      checkNumber(value, "latitude")
                        ? setLatitude(value)
                        : setLatitude("");
                    }}
                  />
                </View>
              </View>
            </List.Accordion>
          </List.AccordionGroup>
          <List.AccordionGroup>
            <List.Accordion title="Additional Information" id="2"  titleStyle={{ color: "black" }}>
              <View>
                <View style={Styles.layDateWrap}>
                  <Checkbox
                    status={isMovable ? "checked" : "unchecked"}
                    onPress={onPressMovable}
                  />
                  <Text style={Styles.label}>Enclosure is Movable ?</Text>
                </View>
                <View style={Styles.layDateWrap}>
                  <Checkbox
                    status={isWalkable ? "checked" : "unchecked"}
                    onPress={onPressWalkable}
                  />
                  <Text style={Styles.label}>Enclosure is Walkable ?</Text>
                </View>
                {/* <InputBox
                  inputLabel={"Is Movable"}
                  placeholder={"Is Movable"}
                  value={movable}
                  autoFocus={false}
                  defaultValue={movable != null ? movable : null}
                  rightElement={isMovable ? "chevron-up" : "chevron-down"}
                  onFocus={SetIsMovableDropDown}
                  DropDown={SetIsMovableDropDown}
                /> */}

                <InputBox
                  inputLabel={"Sunlight"}
                  placeholder={"Choose Sunlight"}
                  onChange={(value) => setEnclosureSunlight(value)}
                  value={enclosureSunlight}
                  defaultValue={
                    enclosureSunlight != null ? enclosureSunlight : null
                  }
                  refs={sunlightRef}
                  rightElement={isSunlight ? "chevron-up" : "chevron-down"}
                  DropDown={SetIsSunlightDropDown}
                  onSubmitEditing={() => handleSubmitFocus(datePickerRef)}
                  isError={isError.enclosureSunlight}
                  errors={errorMessage.enclosureSunlight}
                />
                <DatePicker
                  title="Commistioned Date"
                  refs={datePickerRef}
                  today={foundDate}
                  onChange={getdateFound}
                  onOpen={dropdownOff}
                />
                {isError.foundDate ? (
                  <Text style={Styles.errortext}>{errorMessage.foundDate}</Text>
                ) : null}
                <InputBox
                  refs={notesRef}
                  inputLabel={"Notes"}
                  onFocus={dropdownOff}
                  placeholder={"Write a note"}
                  onChange={(value) => SetEnclosureDesc(value)}
                  value={enclosureDesc}
                  multiline={true}
                  errors={errorMessage.enclosureDesc}
                  isError={isError.enclosureDesc}
                />
              </View>
            </List.Accordion>
            <List.Accordion title="Facilities" id="3"  titleStyle={{ color: "black" }}></List.Accordion>
          </List.AccordionGroup>

          <TouchableOpacity
            // delete button use for  the Delete Enclosure form data.
            onPress={DeleteEnclosureData}
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
              Delete Enclosure
            </Text>
          </TouchableOpacity>
        </View>
      </CustomForm>
      {isSectionMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isSectionMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catClose}
          >
            <Category
              categoryData={sectionData}
              onCatPress={catPressed}
              heading={"Choose Section"}
              isMulti={false}
              onClose={catClose}
            />
          </Modal>
        </View>
      ) : null}

      {isInchargeMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isInchargeMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={inchargeCatClose}
          >
            <Category
              categoryData={inchargeData}
              onCatPress={inchargeCatPressed}
              onClose={inchargeCatClose}
              heading={"Choose Enclosure Incharge"}
              isMulti={false}
            />
          </Modal>
        </View>
      ) : null}

      {isEnclosureOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isEnclosureOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={parentEnclosureClose}
          >
            <Category
              categoryData={enclosureData}
              onCatPress={parentEnclosurePressed}
              heading={"Choose Parent Enclosure"}
              isMulti={false}
              onClose={parentEnclosureClose}
              noOptionAvailableMessage={"Choose Section First"}
            />
          </Modal>
        </View>
      ) : null}

      {isEncEnvMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isEncEnvMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catEnvClose}
          >
            <Category
              categoryData={encEnvData}
              onCatPress={catEnvPress}
              heading={"Choose environment"}
              isMulti={false}
              onClose={catEnvClose}
            />
          </Modal>
        </View>
      ) : null}

      {isEncTypeMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isEncTypeMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catEnTypeClose}
          >
            <Category
              categoryData={
                enclosureEnvironment === ""
                  ? []
                  : enclosureEnvironment === "Aquatic"
                  ? aquaEnctype
                  : encTypeData
              }
              onCatPress={catEnTypePress}
              heading={"Choose enclosure type"}
              isMulti={false}
              onClose={catEnTypeClose}
              noOptionAvailableMessage={"Choose Enclosure Environment First"}
            />
          </Modal>
        </View>
      ) : null}

      {/* {isMovable ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isMovable}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catIsMovableClose}
          >
            <Category
              categoryData={isMovableData}
              onCatPress={catIsMovablePress}
              heading={"Choose movable"}
              isMulti={false}
              onClose={catIsMovableClose}
            />
          </Modal>
        </View>
      ) : null} */}

      {isSunlight ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isSunlight}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catIsSunlightClose}
          >
            <Category
              categoryData={sunlightData}
              onCatPress={catIsSunlightPress}
              heading={"Choose Sunlight"}
              isMulti={false}
              onClose={catIsSunlightClose}
            />
          </Modal>
        </View>
      ) : null}
    </>
  );
};
const Styles = StyleSheet.create({
  errortext: {
    color: Colors.tomato,
  },
  layDateWrap: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: -10,
    padding: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
  },
});
export default EnclosureEdit;
