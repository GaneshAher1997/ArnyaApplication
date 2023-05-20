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
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import {
  getSection,
  getEnclosurebySection,
} from "../../services/staffManagement/getEducationType";
import {
  AddEnclosure,
  editEnclosure,
} from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { Checkbox, List, SegmentedButtons } from "react-native-paper";

import InputBox from "../../components/InputBox";
import CheckBox from "../../components/CheckBox";
import { getEnclosureService } from "../../services/SettingEnclosure";
import DatePicker from "../../components/DatePicker";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import { getStaffList } from "../../services/staffManagement/addPersonalDetails";
import moment from "moment";

const CreateEnclosure = (props) => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const [value, setValue] = useState("single");
  const [foundDate, setFoundDate] = useState(new Date());

  const [enclosure_id, SetEnclosure_id] = useState(
    props.route.params?.item.enclosure_id ?? ""
  );
  const [enclosureName, setEnclosureName] = useState(
    props.route.params?.item?.user_enclosure_name ?? ""
  );
  const [enclosureDesc, SetEnclosureDesc] = useState(
    props.route.params?.item?.enclosure_desc ?? ""
  );
  const [enclosureCode, setEnclosureCode] = useState(
    props.route.params?.item.enclosure_code ?? ""
  );
  const [isMovable, setIsMovable] = useState(false);
  const [isWalkable, setIsWalkable] = useState(false);

  const [enclosureSunlight, setEnclosureSunlight] = useState(
    props.route.params?.item?.enclosure_sunlight ?? ""
  );
  const [isSunlight, setIsSunlight] = useState(false);
  const [sunlightData, setSunlightData] = useState([
    { id: "0", name: "Moderate" },
    { id: "1", name: "Good" },
    { id: "2", name: "Bad" },
  ]);

  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  const [section, setSection] = useState(props.route.params?.item?.data ?? "");
  const [sectionId, setSectionId] = useState(
    props.route.params?.item?.section_id ?? ""
  );

  // .............................Enclosure Incharge...................................
  // Ganesh Aher
  // Date:5-5-23
  // work:Incharge field design add add API

  const [isInchargeMenuOpen, setIsInchargeMenuOpen] = useState(false);
  const [incharge, setIncharge] = useState(
    props.route.params?.item?.data ?? ""
  );
  const [inchargeId, setInchargeId] = useState(
    props.route.params?.item?.enclosure_incharge_id ?? ""
  );
  const [inchargeData, setInchargeData] = useState([]);

  const [isEnclosureOpen, setIsEnclosureOpen] = useState(false);
  const [enclosureData, setEnclosureData] = useState([]);
  const [enclosure, setParentEnclosure] = useState(
    props.route.params?.item?.data ?? ""
  );
  const [enclosureParentId, setParentEnclosureId] = useState();

  const [isEncEnvMenuOpen, setisEncEnvMenuOpen] = useState(false);
  const [encEnvData, setencEnvData] = useState([]);
  const [enclosureEnvironment, setEnclosureEnvironment] = useState(
    props.route.params?.item.enclosure_environment ?? ""
  );
  const [enclosureEnvironmentId, setEnclosureEnvironmentId] = useState("");
  const [aquaEnctype, setAquaEnctype] = useState([]);

  const [isEncTypeMenuOpen, setisEncTypeMenuOpen] = useState(false);
  const [enclosureType, setEnclosureType] = useState(
    props.route.params?.item.enclosure_type ?? ""
  );
  const [enclosureTypeId, setEnclosureTypeId] = useState();
  const [encTypeData, setencTypeData] = useState([]);

  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [loading, setLoding] = useState(false);

  const [batchCount, setBatchCount] = useState(0);
  const [batchStartSeq, setBatchStartSeq] = useState(0);

  const user_id = useSelector((state) => state.UserAuth.userDetails.user_id);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  const segmentRef = useRef(null);
  const encCountRef = useRef(null);
  const seqStartRef = useRef(null);
  const encNameRef = useRef(null);
  const envTypeRef = useRef(null);
  const encTypeRef = useRef(null);
  const secRef = useRef(null);
  const parentEncRef = useRef(null);
  const sunlightRef = useRef(null);
  const datePickerRef = useRef(null);
  const notesRef = useRef(null);

  const catPressed = (item) => {
    setSection(item.map((u) => u.name).join(", "));
    setSectionId(item.map((id) => id.id).join(","));
    setIsSectionMenuOpen(false);
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    parentEncRef.current.focus();*/
    }
  };

  const catClose = () => {
    setIsSectionMenuOpen(false);
    // parentEncRef.current.focus();
  };

  const parentEnclosurePressed = (item) => {
    // console.log('item==========>', item);
    setParentEnclosure(item.map((u) => u.name).join(", "));
    setParentEnclosureId(item.map((id) => id.id).join(","));
    setIsEnclosureOpen(false);
  };

  const parentEnclosureClose = () => {
    setIsEnclosureOpen(false);
    // encNameRef.current.focus();
  };

  const catEnvPress = (item) => {
    setEnclosureEnvironment(item[0].name);
    setEnclosureEnvironmentId(item[0].id);
    setEnclosureTypeId("");
    setEnclosureType("");
    setisEncEnvMenuOpen(false);
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    encTypeRef.current.focus();*/
    }
  };

  const catEnvClose = () => {
    setisEncEnvMenuOpen(false);
    // encTypeRef.current.focus();
  };

  const catEnTypePress = (item) => {
    setEnclosureType(item.map((u) => u.name).join(","));
    setEnclosureTypeId(item.map((u) => u.id).join(","));
    setisEncTypeMenuOpen(false);
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    secRef.current.focus();*/
    }
  };

  const catEnTypeClose = () => {
    setisEncTypeMenuOpen(false);
    // secRef.current.focus();
  };

  const catIsSunlightPress = (item) => {
    console.log(item.map((u) => u.name).join(","));
    setEnclosureSunlight(item.map((u) => u.name).join(","));
    setIsSunlight(false);
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    datePickerRef.current.focus();*/
    }
  };

  const catIsSunlightClose = () => {
    setIsSunlight(false);
    // datePickerRef.current.focus();
  };
  {
    /*Closing all auto complete for favor of IOS modal By Biswanath Nath 24.04.2023
  useEffect(() => {
    if (value === "single") {
      setTimeout(() => {
        encNameRef.current.focus();
      }, 100);
    } else {
      setTimeout(() => {
        encCountRef.current.focus();
      }, 0);
    }
  }, [value]);*/
  }

  useEffect(() => {
    if (sectionId) {
      getEnclosurebySection(sectionId).then((res) => {
        console.log(res);
        let enc = res?.data.map((item) => {
          console.log(item);
          return {
            id: item.enclosure_id,
            name: item.user_enclosure_name,
          };
        });
        setEnclosureData(enc);
      });
    }
  }, [sectionId]);

  useEffect(() => {
    setLoding(true);
    var postData = {
      zoo_id: zooID,
    };
    Promise.all([
      getStaffList(postData),
      getSection(postData),
      getEnclosureService(),
    ]).then((res) => {
      let section = res[1].map((item) => {
        return {
          id: item.section_id,
          name: item.section_name,
        };
      });
      let env_type = res[2].data.environment_type.map((item) => {
        return {
          id: item.key,
          name: item.name,
        };
      });
      let incharges = res[0].data.map((item) => {
        return {
          id: item._id,
          name: item.user_first_name + " " + item.user_last_name,
        };
      });

      setInchargeData(incharges);
      setencTypeData(res[2].data.enclosure_type);
      setencEnvData(env_type);
      setAquaEnctype(res[2].data.aquatic_enclosure_type);
      setSectionData(section);
      setLoding(false);
    });
  }, []);

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
    }

    return true;
  };

  const getEnclosureFormData = () => {
    if (validation()) {
      let obj = {
        user_enclosure_name: enclosureName,
        section_id: sectionId,
        enclosure_desc: enclosureDesc,
        user_enclosure_id: user_id,
        enclosure_code: enclosureCode,
        enclosure_environment: enclosureEnvironment,
        enclosure_incharge_id: inchargeId,
        enclosure_is_movable: Number(isMovable),
        enclosure_is_walkable: Number(isWalkable),
        enclosure_type: enclosureTypeId,
        enclosure_sunlight: enclosureSunlight,
        enclosure_parent_id: enclosureParentId,
        commistioned_date: moment(foundDate).format("YYYY-MM-DD") ,
        batch_count: batchCount,
        batch_seq: batchStartSeq,
      };
      console.log(obj);
      // return;
      setLoding(true);
      AddEnclosure(obj)
        .then((res) => {
          console.log("response=============", res);
          alert(res.message);
        })
        .finally(() => {
          setLoding(false);
          navigation.goBack();
          alert("EnclosureForm Added Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const SetEncDropDown = (data) => {
    setIsSectionMenuOpen(!isSectionMenuOpen);
    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(false);
    setIsSunlight(false);
  };

  const SetParentEncDropDown = (data) => {
    setIsSectionMenuOpen(false);
    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(!isEnclosureOpen);
    setIsSunlight(false);
  };

  const SetEnvTypeDropDown = (data) => {
    setisEncEnvMenuOpen(!isEncEnvMenuOpen);
    setIsSectionMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsSunlight(false);
    setIsEnclosureOpen(false);
  };

  const SetEncTypeDropDown = (data) => {
    setisEncTypeMenuOpen(!isEncTypeMenuOpen);
    setisEncEnvMenuOpen(false);
    setIsSectionMenuOpen(false);
    setIsSunlight(false);
    setIsEnclosureOpen(false);
  };

  const SetIsSunlightDropDown = () => {
    setIsSunlight(!isSunlight);
    setIsSectionMenuOpen(false);
    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(false);
  };

  const dropdownOff = () => {
    setIsSunlight(false);
    setIsSectionMenuOpen(false);
    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setIsEnclosureOpen(false);
  };

  const getdateFound = (date) => {
    setFoundDate(date);
    handleSubmitFocus(notesRef);
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

  const inchargeCatPressed = (item) => {
    setIncharge(item.map((u) => u.name).join(", "));

    setInchargeId(item.map((id) => id.id).join(","));

    setIsInchargeMenuOpen(false);
  };

  const inchargeCatClose = () => {
    setIsInchargeMenuOpen(false);
    // parentEncRef.current.focus();
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

  const handleSubmitFocus = (refs) => {
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    if (refs.current) {
      refs.current.focus();
    }*/
    }
  };

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
        title={enclosure_id > 0 ? "Edit Enclosure" : "Add Enclosure"}
        marginBottom={60}
        onPress={getEnclosureFormData}
      >
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

        <View>
          <List.Section>
            <View style={{ display: value === "batch" ? "flex" : "none" }}>
              <List.Accordion title="Batch Options" id="1" expanded={true} titleStyle={{ color: "black" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 2,
                  }}
                >
                  <View style={{ width: "50%", paddingHorizontal: 5 }}>
                    <InputBox
                      inputLabel={"Enclosure Count"}
                      placeholder={"Count"}
                      keyboardType={"number-pad"}
                      refs={encCountRef}
                      onFocus={dropdownOff}
                      onSubmitEditing={() => handleSubmitFocus(seqStartRef)}
                      onChange={(value) => onCheckLimitEnclosure(value)}
                      value={batchCount}
                      errors={errorMessage.enclosureCount}
                      isError={isError.enclosureCount}
                    />
                  </View>
                  <View style={{ width: "50%", paddingHorizontal: 5 }}>
                    <InputBox
                      inputLabel={"Sequense Start"}
                      refs={seqStartRef}
                      onFocus={dropdownOff}
                      keyboardType={"numeric"}
                      placeholder={"Start"}
                      onChange={(value) => onCheckLimitSequense(value)}
                      value={batchStartSeq}
                      onSubmitEditing={() => handleSubmitFocus(encNameRef)}
                      errors={errorMessage.enclosureSequense}
                      isError={isError.enclosureSequense}
                    />
                  </View>
                </View>
              </List.Accordion>
            </View>
          </List.Section>
          <List.AccordionGroup expandedId="1">
            <List.Accordion title="Basic Information" id="1" titleStyle={{ color: "black" }}>
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
                <InputBox
                  inputLabel={"Parent Enclosure"}
                  placeholder={"Choose Parent Enclosure"}
                  refs={parentEncRef}
                  value={enclosure}
                  defaultValue={section != null ? section : null}
                  onFocus={SetParentEncDropDown}
                  DropDown={SetParentEncDropDown}
                  rightElement={isEnclosureOpen ? "chevron-up" : "chevron-down"}
                  errors={errorMessage.enclosure}
                  isError={isError.enclosure}
                  helpText={"Assign your enclosure as child under this"}
                />
                <InputBox
                  inputLabel={"Enclosure Incharge"}
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
              </View>
            </List.Accordion>
          </List.AccordionGroup>
          <List.AccordionGroup>
            <List.Accordion title="Additional Information" id="2" titleStyle={{ color: "black" }}>
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
            <List.Accordion title="Facilities" id="3" titleStyle={{ color: "black" }}></List.Accordion>
          </List.AccordionGroup>
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
              heading={"Choose Enclosure Environment"}
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
              heading={"Choose Enclosure Incharge"}
              isMulti={false}
              onClose={inchargeCatClose}
            />
          </Modal>
        </View>
      ) : null}

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
  Label: {
    // top: "3%",
    marginTop: 20,
    fontSize: 5,
    fontWeight: "200",
  },
  button: {
    flex: 1,
  },
  errortext: {
    color: "red",
  },
  group: {
    paddingHorizontal: 30,
    justifyContent: "center",
    paddingBottom: 8,
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
export default CreateEnclosure;
