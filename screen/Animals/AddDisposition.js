// Author :  Ganesh
// Date:- 31 March 2023 modify :11 May 2023


import React, { useContext, useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Category from "../../components/DropDownBox";
import CustomForm from "../../components/CustomForm";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { getSection } from "../../services/staffManagement/getEducationType";
import {
  AddEnclosure,
  editEnclosure,
} from "../../services/FormEnclosureServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../../components/InputBox";
import DatePicker from "../../components/DatePicker";
import { data } from "../../configs/Config";
import { BottomSheet } from "../../configs/Config";
import {
  addanimalmortality,
  carcassCondition,
  carcassDisposition,
  getAnimal,
  mannerOfDeath,
} from "../../services/AddDispositionService";
import moment from "moment";
import { useSelector } from "react-redux";
import { getAnimalList } from "../../services/AnimalService";
import { capitalize } from "../../utils/Utils";
import { Checkbox, Switch } from "react-native-paper";
import Card from "../../components/CustomCard";
import Modal from "react-native-modal";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import Colors from "../../configs/Colors";
import AnimalListCard from "../../components/AnimalListCard";

const EntityItem = [
  {
    id: 1,
    name: "Preselected",
  },
  {
    id: 2,
    name: "Auto completed",
  },
];

// const Necropsy = [
//   {
//     id: 1,
//     name: "Yes",
//   },
//   {
//     id: 0,
//     name: "No",
//   },
// ];



const AddDisposition = (props) => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [toggleValue, setToggleValue] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [necropsyValue,setNecropsyValue] = useState("");

  const [vernacularName, setVernacularName] = useState(
    props.route.params?.item.vernacular_name ?? ""
  );

  const [animalId, setAnimalId] = useState(
    props.route.params?.item.animal_id ?? ""
  );

  const [localId, setLocalId] = useState(
    props.route.params?.item.local_id ?? ""
  );

  const [selectEnclosure, setSelectEnclosure] = useState(
    props.route.params?.item.user_enclosure_name ?? ""
  );

  const [section, setSetSection] = useState(
    props.route.params?.item.section_name ?? ""
  );
  // console.log("props.route.params?.item....................",props.route.params?.item);

  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const [encEnvData, setencEnvData] = useState([]);
  const [encTypeData, setencTypeData] = useState([]);

  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [isEncEnvMenuOpen, setisEncEnvMenuOpen] = useState(false);

  const [isEncTypeMenuOpen, setisEncTypeMenuOpen] = useState(false);
  const [isEncTypeMenuOpen1, setisEncTypeMenuOpen1] = useState(false);
  const [isEncTypeMenuOpen2, setisEncTypeMenuOpen2] = useState(false);

  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [isfocus,setIsFocus] = useState(false);

  const [entity, setEntity] = useState(
    capitalize(props.route.params?.item?.vernacular_name) +
    " (" +
    props.route.params?.item?.complete_name +
    ")" ?? ""
  );
  const [entityData, setEntityData] = useState([]);
  const [entityId, setEntityId] = useState(
    props.route.params?.item?.animal_id ?? undefined
  );
  const [date, setDate] = useState(
    props.route.params?.item?.user_dob ?? new Date()
  );
  const [mannerDeath, setMannerDeath] = useState(
    props.route.params?.item.manner_death ?? ""
  );
  const [mannerDeathId, setMannerDeathId] = useState(
    props.route.params?.item?.manner_of_death ?? ""
  );
  const [mannerData, setMannerData] = useState([]);

  const [reason, setReason] = useState(
    props.route.params?.item?.reason_for_death ?? ""
  );
  const [condition, setCondition] = useState(
    props.route.params?.item?.condition_type ?? ""
  );
  const [conditionId, setConditionId] = useState(
    props.route.params?.item?.carcass_condition ?? ""
  );
  const [conditionData, setConditionData] = useState([]);

  const [disposition, setDisposition] = useState(
    props.route.params?.item.disposition_type ?? ""
  );
  const [dispositionId, setDispositionId] = useState(
    props.route.params?.item?.carcass_disposition ?? ""
  );
  const [dispositionData, setDispositionData] = useState([]);
  const [note, setNotes] = useState(
    props.route.params?.item?.user_for_notes ?? ""
  );
  const [necropsy, setNecropsy] = useState(
    props.route.params?.item.necropsy_type ?? ""
  );
  const [necropsyId, setNecropsyId] = useState(
    props.route.params?.item.necropsy_type ?? ""
  );
  const [markLayDate, setMarkLayDate] = useState(false);
  const [loading, setLoding] = useState(false);
  const [animalData, setAnimalData] = useState([]);
  const [enclosureTypeDown, setEnclosureTypeDown] = useState(false);

  const entityRefs = useRef(null);
  const dispositionDateRef = useRef(null);
  const mannerofDeathRef = useRef(null);
  const reasonRef = useRef(null);
  const carcassConditionRef = useRef(null);
  const carcassDispositionRef = useRef(null);
  const notesRef = useRef(null);
  const necropsyRef = useRef(null);

  const handleSubmitFocus = (refs, time) => {

  };

  const catPressed = (item) => {

    setEntity(item.map((u) => u.name).join(", "));

    setEntityId(item.map((id) => id.id).join(","));

    setIsSectionMenuOpen(false);
    handleSubmitFocus(dispositionDateRef);
  };

  const catEnvPress = (item) => {
    
    setMannerDeath(item.map((u) => u.name).join(","));
    setMannerDeathId(item.map((id) => id.id).join(","));

    setisEncEnvMenuOpen(false);
    handleSubmitFocus(reasonRef, 1000);
  };

  const catEnTypePress = (item) => {
    setCondition(item.map((u) => u.name).join(","));
    setConditionId(item.map((id) => id.id).join(","));

    setisEncTypeMenuOpen(false);
    handleSubmitFocus(carcassDispositionRef);
  };

  const catEnTypePress1 = (item) => {
    setDisposition(item.map((u) => u.name).join(","));
    setDispositionId(item.map((id) => id.id).join(","));
    setisEncTypeMenuOpen1(false);
    handleSubmitFocus(notesRef, 1000);
  };

  const catEnTypePress2 = (item) => {
    item.map((value) => {
      setNecropsy(value.name);
    });
    item.map((value) => {
      setNecropsyId(value.id);
    });
    setisEncTypeMenuOpen2(false);
  };

  useEffect(() => {
    setLoding(true);
    let obj = {
      zoo_id: zooID,
    };
    Promise.all([
      getAnimalList(obj),
      mannerOfDeath(),
      carcassCondition(),
      carcassDisposition(),
    ])
      .then((res) => {

        setAnimalData(
          res[0].data.map((item) => ({
            id: item.animal_id,
            name:
              capitalize(item.vernacular_name) +
              " (" +
              item.complete_name +
              ")",
          }))
        );
        setMannerData(res[1].data);
        setConditionData(res[2].data);
        setDispositionData(res[3].data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoding(false);
        if (entityId === undefined) {
          handleSubmitFocus(entityRefs);
        } else {
          handleSubmitFocus(dispositionDateRef);
        }
      });
  }, []);

  const validation = () => {
    if (entity.length === 0) {
      setIsError({ entity: true });
      setErrorMessage({ entity: "Select The Entity Name" });
      return false;
    } else if (date === "") {
      setIsError({ date: true });
      setErrorMessage({ date: "Select from dropdown" });
      return false;
    } else if (mannerDeath.trim().length === 0) {
      setIsError({ mannerDeath: true });
      setErrorMessage({ mannerDeath: "Select The Manner of Death" });
      return false;
    } else if (reason.trim().length === 0) {
      setIsError({ reason: true });

      setErrorMessage({ reason: "Enter The Reason of Death" });
      return false;
    } else if (condition.trim().length === 0) {
      setIsError({ condition: true });
      setErrorMessage({ condition: "Select The Carcoss Condition" });
      return false;
    } else if (disposition.trim().length === 0) {
      setIsError({ disposition: true });
      setErrorMessage({ disposition: "Select The Carcoss Disposition" });
      return false;
    } else if (note.trim().length === 0) {
      setIsError({ note: true });
      setErrorMessage({ note: "Enter The Notes" });
      return false;
    }

    else if (necropsy.trim().length === 0) {
      setIsError({ necropsy: true });
      setErrorMessage({ necropsy: "Select The Necropsy" });
      return false;
    }
    return true;
  };

  const getEnclosureFormData = () => {
    if (validation()) {
      let obj = {
        entity_id: entityId,
        entity_type: "animal",
        discovered_date: moment(date).format("YYYY-MM-DD"),
        is_estimate: Number(markLayDate),
        manner_of_death: mannerDeathId,
        reason_for_death: reason,
        carcass_condition: conditionId,
        carcass_disposition: dispositionId,
        user_for_notes: note,
        submitted_for_necropsy: necropsyId,
      };
      setLoding(true);
      addanimalmortality(obj)
        .then((res) => {
          alert(res.message);
          navigation.goBack();
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong!!!");
        })
        .finally(() => {
          setLoding(false);
        });
    }
  };

  const SetDropDown = (data) => {

    setIsSectionMenuOpen(data);
    setisEncEnvMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setisEncTypeMenuOpen1(false);
    setisEncTypeMenuOpen2(false);
  };
  const SetEnvTypeDropDown = (data) => {
    setisEncEnvMenuOpen(data);
    setIsSectionMenuOpen(false);
    setisEncTypeMenuOpen(false);
    setisEncTypeMenuOpen1(false);
    setisEncTypeMenuOpen2(false);
  };


  const SetEncTypeDropDown = (data) => {
    setisEncTypeMenuOpen(data);

    setisEncEnvMenuOpen(false);
    setIsSectionMenuOpen(false);
    setisEncTypeMenuOpen1(false);
    setisEncTypeMenuOpen2(false);
  };
  const SetEncTypeDropDown1 = (data) => {
    setisEncTypeMenuOpen1(data);

    setisEncTypeMenuOpen2(false);
    setisEncEnvMenuOpen(false);
    setIsSectionMenuOpen(false);
    setisEncTypeMenuOpen(false);
  };
  const SetEncTypeDropDown2 = (data) => {
    setisEncTypeMenuOpen2(data);
    setisEncEnvMenuOpen(false);
    setIsSectionMenuOpen(false);
    setisEncTypeMenuOpen1(false);
    setisEncTypeMenuOpen(false);
  };

  const setSelectedDate = (item) => {
    let today = new Date();
    if (today < item) {
      alert("Select only today or previous date");
      return;
    }
    setDate(item);

  };

  const onPressMarkLayDate = () => {
    setMarkLayDate(!markLayDate);
  };

  const closeAllDropDown = () => {
    setisEncTypeMenuOpen2(false);
    setisEncEnvMenuOpen(false);
    setIsSectionMenuOpen(false);
    setisEncTypeMenuOpen1(false);
    setisEncTypeMenuOpen(false);
  };

  const closeEntity = () => {
    setIsSectionMenuOpen(false);
  };

  const closeManner = () => {
    setisEncEnvMenuOpen(false);
  };

  const closeCarcassCondition = () => {
    setisEncTypeMenuOpen(false);
  };

  const closeCarcassDisposition = () => {
    setisEncTypeMenuOpen1(false);
  };



  const closeNecropsy = () => {
    setisEncTypeMenuOpen2(false);
  };

  const diableDown = () => {
    setIsSectionMenuOpen(false);
  };
  const handleToggleButton = () => {
    setToggleValue(!toggleValue);
  };
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    
    
    
  } 
  {
    isSwitchOn === false ? necropsyValue : "false"
  }

  const onFocusTouchable = ()=>{
    setIsFocus(!isfocus);
  }


  return (
    <>
      <CustomForm
        header={true}
        title={"Add Mortality"}
        marginBottom={60}
        onPress={getEnclosureFormData}
      >
        <Loader visible={loading} />

        <AnimalListCard
        backgroundColo={'teal'}
        borderWidth={0.4}
        
        titleName={"Select Animal"}
          title={capitalize(vernacularName)}


          subtitle={
            localId == "" || localId == null
              ? animalId
              : localId
          }
          subfont={16}
          subweight={'600'}

          color={Colors.titleName}
          fontSize={17}
          fontWeight={'500'}
          tags={'typesTag'}


          UserEnclosureName={"Enclosure Name : " + selectEnclosure}
          encWeight={'500'}
          encColor={'#44544A'}
          sectionName={"Section Name : " + section}
        
         
 
          

        />


        <View>
          <DatePicker
            today={date}
            onChange={setSelectedDate}
            title="Discovered Date"
            onOpen={closeAllDropDown}
            refs={dispositionDateRef}
          />
          <View style={styles.checkboxWrap}>
            <Checkbox.Android
              status={markLayDate ? "checked" : "unchecked"}
              onPress={onPressMarkLayDate}
            />
            <Text style={styles.label}>Mark this date as approximate</Text>
          </View>
          {isError.date ? (
            <Text style={styles.errortext}>{errorMessage.date}</Text>
          ) : null}
        </View>

        <InputBox
          inputLabel={"Manner of Deaths"}
          placeholder={"Manner of Deaths"}
          editable={false}
          value={mannerDeath}
          refs={mannerofDeathRef}
          rightElement={isEncEnvMenuOpen ? "chevron-up" : "chevron-down"}
          onFocus={SetDropDown}
          DropDown={SetEnvTypeDropDown}
          errors={errorMessage.mannerDeath}
          isError={isError.mannerDeath}
        
        
        />

        <InputBox
          inputLabel={"Reason for Death"}
          placeholder={"Reason for Death"}
          editable={true}
          refs={reasonRef}

          onChange={(val) => {
            setReason(val);
            
          }}
          multiline={true}
        
          numberOfLines={1}
          onSubmitEditing={() => handleSubmitFocus(carcassConditionRef)}
          errors={errorMessage.reason}
          isError={isError.reason}
          keyboardType={"default"}
          placeholderTextColor ="yellow"
        />

        <InputBox
          inputLabel={"Carcass condition"}
          placeholder={"Choose Carcass condition"}
          editable={false}
         
          value={condition}
          refs={carcassConditionRef}
          onFocus={SetEncTypeDropDown}
          rightElement={isEncTypeMenuOpen ? "chevron-up" : "chevron-down"}
          DropDown={SetEncTypeDropDown}
          errors={errorMessage.condition}
          isError={isError.condition}
          style={{backgroundColor:"#F2FFF8",}}
          placeholderTextColor ="yellow"
        />

        <InputBox
          inputLabel={"Carcass Disposition"}
          placeholder={"Necropsy"}
          editable={false}
          value={disposition}
          refs={carcassDispositionRef}
          rightElement={isEncTypeMenuOpen1 ? "chevron-up" : "chevron-down"}
          onFocus={SetEncTypeDropDown1}
          DropDown={SetEncTypeDropDown1}
          errors={errorMessage.disposition}
          isError={isError.disposition}
        />
        <InputBox
          inputLabel={"Notes"}
          placeholder={"Notes"}
          editable={true}
          refs={notesRef}
          onChange={(val) => {
            setNotes(val);
          }}
          multiline={true}
          numberOfLines={1}
          errors={errorMessage.note}
          isError={isError.note}
        />

        <TouchableOpacity style={[styles.boxStyle, 
        { marginTop: heightPercentageToDP(2),borderWidth: isfocus === true ? 2 : 1, borderColor:isfocus === true ? "red" : 'black'}]}
        onPress={onFocusTouchable}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            
            <Text style={styles.selectTextstyle}>{necropsyValue === undefined || necropsyValue === "" ? "Necropsy": necropsyValue}</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>
          <View></View>
        </TouchableOpacity>
      </CustomForm>
      {isSectionMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isSectionMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={closeEntity}
          >
            <Category
              categoryData={animalData}
              onCatPress={catPressed}
              heading={"Choose Entity"}
              isMulti={false}
              onClose={closeEntity}
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
            onBackdropPress={closeManner}
          >
            <Category
              categoryData={mannerData}
              onCatPress={catEnvPress}
              heading={"Choose Manner of Death"}
              isMulti={false}
              onClose={closeManner}
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
            onBackdropPress={closeCarcassCondition}
          >
            <Category
              categoryData={conditionData}
              onCatPress={catEnTypePress}
              heading={"Choose Carcass condition"}
              isMulti={false}
              onClose={closeCarcassCondition}
            />
          </Modal>
        </View>
      ) : null}

      {isEncTypeMenuOpen1 ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isEncTypeMenuOpen1}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={closeCarcassDisposition}
          >
            <Category
              categoryData={dispositionData}
              onCatPress={catEnTypePress1}
              heading={"Choose Carcass Disposition"}
              isMulti={false}
              onClose={closeCarcassDisposition}
            />
          </Modal>
        </View>
      ) : null}

      {isEncTypeMenuOpen2 ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isEncTypeMenuOpen2}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={closeNecropsy}
          >
            <Category
              categoryData={Necropsy}
              onCatPress={catEnTypePress2}
              heading={"Choose Necropsy "}
              isMulti={false}
              onClose={closeNecropsy}
            />
          </Modal>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  Label: {
    // top: "3%",
    marginTop: 20,
    fontSize: 5,
    fontWeight: "200",
  },
  btnCont: {
    flexDirection: "row",
    width: "55%",
    padding: "2%",
  },
  btnText: {
    fontWeight: "600",
    fontSize: 18,
  },
  button: {
    width: "81%",
    borderRadius: 5,
  },
  checkboxWrap: {
    flexDirection: "row",
    alignItems: "center",
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
  boxStyle: {
    width: widthPercentageToDP(94),
    height: heightPercentageToDP(6.5),
    borderWidth: 0.9,
    backgroundColor:'#F2FFF8',
    borderColor: "grey",
    borderRadius: 4,
  },
  selectTextstyle: {
    fontSize: 15,
    fontWeight: "500",
    color: '#4d5751',
    textAlign: "left",
    lineHeight: 24,
    marginLeft: widthPercentageToDP(4.5),
    marginTop: widthPercentageToDP(3.2),
  },
});
export default AddDisposition;
