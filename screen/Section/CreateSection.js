//create by:Gaurav Shukla
// create on :1/03/2023

import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import CustomFormWithoutKeyboardScroll from "../../components/CustomFormWithoutKeyboardScroll";
import InputBox from "../../components/InputBox";
import { MaterialIcons } from "@expo/vector-icons";
import { CreateSection } from "../../services/CreateSectionServices";
import Loader from "../../components/Loader";
import {
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";
import Category from "../../components/DropDownBox";
import { getZooSite } from "../../services/AddSiteService";
import Modal from "react-native-modal";
import CustomForm from "../../components/CustomForm";

export default function CreateSectionForm() {
  const navigation = useNavigation();
  const [sectionName, setSectionName] = useState("");
  const [sectionCode, setSectionCode] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [loading, setLoding] = useState(false);
  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const [sites, setSites] = useState([]);
  const [siteName, setsiteName] = useState(null);
  const [siteId, setsiteId] = useState("");
  const [isSiteOpen, setisSiteOpen] = useState(false);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    // setLoding(true);
    getZooSite(zooID)
      .then((res) => {
        console.log(res)
        let getdata = res.data.map((item) => {
          return {
            id: item.site_id,
            name: item.site_name,
          };
        });
        setSites(getdata);
        setLoding(false);
        console.log("after set loading")
        if (sectionNameRef.current) {
          // setTimeout(() => {
          //   sectionNameRef.current.focus();
          // }, 100);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoding(false);
      });
  }, []);

  const validation = () => {
    if (sectionName.trim().length === 0) {
      setIsError({ sectionName: true });
      setErrorMessage({ sectionName: "Enter The Name" });
      return false;
    } else if (siteId.trim().length === 0) {
      setIsError({ siteId: true });
      setErrorMessage({ siteId: "Select site" });
      return false;
    }
    //  else if (longitude.trim().length === 0) {
    //   setIsError({ longitude: true });
    //   setErrorMessage({ longitude: "Enter The longitude" });
    //   return false;
    // } else if (latitude.trim().length === 0) {
    //   setIsError({ latitude: true });
    //   setErrorMessage({ latitude: "Enter The latitude" });
    //   return false;
    // }
    return true;
  };

  const catPressed = (item) => {
    setsiteName(item.map((u) => u.name).join(", "));
    setsiteId(item[0].id);
    setisSiteOpen(!isSiteOpen);
    // handleSubmitFocus(input2Ref)
    // loginputRef.current.focus();
  };

  const catClose = () => {
    setisSiteOpen(false);
  };

  const getLocation = async () => {
    setLoding(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLoding(false);
      alert("Permission to access location was denied");
      return;
    }
    
    let location = await Location.getCurrentPositionAsync({});
    setLongitude(location.coords.longitude.toString());
    setLatitude(location.coords.latitude.toString());
    setLoding(false);
  };
  console.log(longitude,"********")

  const getSectionData = () => {
    if (validation()) {
      let obj = {
        section_name: sectionName,
        section_code: sectionCode,
        zoo_id: zooID,
        section_latitude: latitude,
        section_longitude: longitude,
        site_id: siteId,
      };
      setLoding(true);
      CreateSection(obj)
        .then((res) => {
          alert(res?.message);
          navigation.goBack();
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong!!");
        })
        .finally(() => {
          setLoding(false);
        });
    }
  };

  const sectionNameRef = useRef(null);
  const sitesRef = useRef(null);
  const loginputRef = useRef(null);
  const latitudeinputRef = useRef(null);
  const input5Ref = useRef(null);
  const handleSubmitFocus = (refs) => {
    // if (refs.current) {
    //   refs.current.focus();
    // }
  };
  const dropdownOff = () => {
    setisSiteOpen(false);
  };

  const checkNumber = (number, type) => {
    setIsError({});
    const pattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
    let result = number.length > 4 ? pattern.test(number) : true;
    if (!result) {
      let err = {};
      err[type] = true;
      let errmsg = {};
      errmsg[type] = "Input format doesn't match";
      setIsError(err);
      setErrorMessage(errmsg);
      return result;
    }
    return result;
  };
  console.log(loading)
  return (
    <View style={{flex:1,backgroundColor:isSwitchOn ? "#1F415B" : "#DAE7DF"}}>
        <Loader visible={loading}/>
        <CustomForm
          header={true}
          title={"Add Section"}
          onPress={getSectionData}
        >
          <InputBox
            refs={sectionNameRef}
            inputLabel={"Name"}
            placeholder={"Enter Name"}
            errors={errorMessage.sectionName}
            isError={isError.sectionName}
            onFocus={dropdownOff}
            onChange={(value) => setSectionName(value)}
            value={sectionName}
            onSubmitEditing={() => handleSubmitFocus(sitesRef)}
          />
          <InputBox
            refs={sitesRef}
            inputLabel={"Sites"}
            placeholder=" "
            editable={false}
            value={siteName}
            isError={isError.siteName}
            errors={errorMessage.siteName}
            onFocus={() => {
              setisSiteOpen(true);
            }}
            rightElement={isSiteOpen ? "chevron-up" : "chevron-down"}
            DropDown={() => {
              setisSiteOpen(true);
            }}
            // onFocus={()=>setisSiteOpen(!isSiteOpen)}
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
            <Text style={{ fontSize: 18,color:isSwitchOn ? "white" : "black" }}>Location of the Section</Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <TouchableOpacity onPress={getLocation}>
                <MaterialIcons name="my-location" size={23} color={isSwitchOn ? "white" : "black"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginHorizontal: 13 }}>
            <InputBox
              refs={loginputRef}
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
              onSubmitEditing={() => handleSubmitFocus(latitudeinputRef)}
            />

            <InputBox
              refs={latitudeinputRef}
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
        </CustomForm>

      {/* // <View style={{ flex: 1, backgroundColor: "#fff" }}>
      //   <Category
      //     categoryData={sites}
      //     onCatPress={catPressed}
      //     heading={"Choose site"}
      //     onClose={catClose}
      //   />
      // </View> */}

      {isSiteOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isSiteOpen}
            onDismiss={catClose}
            style={{ margin: 0, justifyContent: "flex-end", }}
            onBackdropPress={catClose}
          >
            <Category
              categoryData={sites}
              onCatPress={catPressed}
              heading={"Choose Sites"}
              isMulti={false}
              onClose={catClose}
            />
          </Modal>
        </View>
      ) : null}
   </View>
  );
}
