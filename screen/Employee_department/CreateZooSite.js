import React, { useEffect, useState, useRef } from "react";
import CustomForm from "../../components/CustomForm";
import InputBox from "../../components/InputBox";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import styles from "../../configs/Styles";
import { createZooSite } from "../../services/ZooSiteService";
import { MaterialIcons } from "@expo/vector-icons";
import NewDropdown from "../../components/Dropdown";
import { useSelector } from "react-redux";
import { Switch } from "react-native-paper";
import { getStaffList } from "../../services/staffManagement/addPersonalDetails";
import Category from "../../components/DropDownBox";
import Modal from "react-native-modal";

const CreateZooSite = () => {
  const navigation = useNavigation();
  const [siteName, setSiteName] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [incharge, setIncharge] = useState("");
  const [inchargeId, setInchargeId] = useState("");
  const [userData, setuserData] = useState("");
  const [isInchargeMenuOpen, setisInchargeMenuOpen] = useState(false);

  const [isLoading, setLoding] = useState(false);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  const [errorMessage, setErrorMessage] = useState({});
  const [isError, setIsError] = useState({});
  const { height, width } = useWindowDimensions();

  const getLocation = async (check) => {
    setLoding(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLoding(false);
      console.log("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    if(check){
      setLongitude(location.coords.longitude.toString());
      setLatitude(location.coords.latitude.toString());
      setLoding(false);
    }
  };

  const validation = () => {
    if (siteName.trim().length === 0) {
      setIsError({ siteName: true });
      setErrorMessage({ siteName: "Site name is required" });
      return false;
    } else if (longitude.trim().length === 0) {
      setIsError({ longitude: true });
      setErrorMessage({ longitude: "Longitude is required" });
      return false;
    } else if (latitude.trim().length === 0) {
      setIsError({ latitude: true });
      setErrorMessage({ latitude: "Latitude is required" });
      return false;
    } else if (incharge.trim().length === 0) {
      setIsError({ incharge: true });
      setErrorMessage({ incharge: "Site Incharge is required" });
      return false;
    } else if (number.trim().length === 0) {
      setIsError({ number: true });
      setErrorMessage({ number: "Site Incharge number is required" });
      return false;
    } else if (description.trim().length === 0) {
      setIsError({ description: true });
      setErrorMessage({ description: "Description is required" });
      return false;
    }
    return true;
  };

  const saveZooSiteData = () => {
    if (validation()) {
      let obj = {
        zoo_id: zooID,
        site_name: siteName,
        site_description: description,
        site_latitude: latitude,
        site_longitude: longitude,
        site_incharge: inchargeId,
        site_incharge_number: number,
      };
      setLoding(true);
      createZooSite(obj)
        .then((res) => {
          setLoding(false);
          if (res.success) {
            navigation.navigate("Home");
            alert("Site data added successfully");
          }
        })
        .catch((err) => {
          setLoding(false);
          console.log(err);
        });
    }
  };

  const siteNameRef = useRef(null);
  const lognitudeRef = useRef(null);
  const latitudeRef = useRef(null);
  const inchargeRef = useRef(null);
  const inchargeNumRef = useRef(null);
  const descripRef = useRef(null);

  useEffect(() => {
    setLoding(true);
    let postData = {
      zoo_id: zooID,
    };
    getStaffList(postData).then((res) => {
      getLocation(false)
      let staff = res.data.map((item) => {
        return {
          id: item.user_id,
          name: item.user_first_name + " " + item.user_last_name,
        };
      });
      setLoding(false);
      setuserData(staff);
    });
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    if (siteNameRef.current) {
      setTimeout(() => {
        siteNameRef.current.focus();
      }, 100);
    }*/}
  }, []);

  const handleSubmitFocus = (refs, time) => {
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
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
    }*/}
  };

  const SetInchargeDropDown = () => {
    setisInchargeMenuOpen(!isInchargeMenuOpen);
  };

  const catInchargeClose = () => {
    setisInchargeMenuOpen(false);
  };

  const catInchargePress = (item) => {
    setIncharge(item.map((u) => u.name).join(","));
    setInchargeId(item.map((id) => id.id).join(","));
    setisInchargeMenuOpen(false);
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    handleSubmitFocus(inchargeNumRef, 1000);*/}
  };

  const checkNumber = (number, type) => {
    setIsError({});
    const pattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
    const numberPattern = /^\d+$/;
    let result =
      type == "number"
        ? numberPattern.test(number)
        : number.length > 4
        ? pattern.test(number)
        : true;
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

  return (
    <>
      <CustomForm header={true} title={"Zoo Site"} onPress={saveZooSiteData}>
        <Loader visible={isLoading} />
        <InputBox
          inputLabel={"Site Name"}
          placeholder={"Enter Site Name"}
          refs={siteNameRef}
          onFocus={catInchargeClose}
          onChange={(val) => setSiteName(val)}
          value={siteName}
          onSubmitEditing={() => handleSubmitFocus(lognitudeRef)}
          errors={errorMessage.siteName}
          isError={isError.siteName}
          // keyboardType={"alpha"}
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
            <Text style={{ fontSize: 18 }}>Location of the Site</Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={()=>getLocation(true)}>
              <MaterialIcons name="my-location" size={23} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: 13 }}>
          <InputBox
            refs={lognitudeRef}
            inputLabel={"Longitude"}
            placeholder={"Longitude"}
            keyboardType={"numeric"}
            onFocus={catInchargeClose}
            errors={errorMessage.longitude}
            isError={isError.longitude}
            value={longitude}
            onChange={(value) => {
              checkNumber(value, "longitude")
                ? setLongitude(value)
                : setLongitude("");
            }}
            onSubmitEditing={() => handleSubmitFocus(latitudeRef)}
          />

          <InputBox
            refs={latitudeRef}
            inputLabel={"Latitude"}
            placeholder={"Latitude"}
            keyboardType={"numeric"}
            onFocus={catInchargeClose}
            errors={errorMessage.latitude}
            isError={isError.latitude}
            value={latitude}
            onChange={(value) => {
              checkNumber(value, "latitude")
                ? setLatitude(value)
                : setLatitude("");
            }}
            onSubmitEditing={() => handleSubmitFocus(inchargeRef)}
          />
        </View>

        <InputBox
          refs={inchargeRef}
          inputLabel={"Site Incharge*"}
          placeholder={"Choose Site Incharge"}
          value={incharge}
          rightElement={isInchargeMenuOpen ? "chevron-up" : "chevron-down"}
          onFocus={SetInchargeDropDown}
          DropDown={SetInchargeDropDown}
          errors={errorMessage.incharge}
          isError={isError.incharge}
        />

        <InputBox
          refs={inchargeNumRef}
          inputLabel={"Site Incharge Number"}
          placeholder={"Enter Site Incharge Number"}
          onChange={(value) => {
            checkNumber(value, "number") ? setNumber(value) : setNumber("");
          }}
          value={number}
          onFocus={catInchargeClose}
          errors={errorMessage.number}
          isError={isError.number}
          maxLength={10}
          keyboardType={"numeric"}
          onSubmitEditing={() => handleSubmitFocus(descripRef)}
        />
        <InputBox
          refs={descripRef}
          inputLabel={"Site Description"}
          onFocus={catInchargeClose}
          multiline={true}
          numberOfLines={3}
          placeholder={"Enter Site Description"}
          onChange={(val) => setDescription(val)}
          value={description}
          errors={errorMessage.description}
          isError={isError.description}
          // keyboardType={"alpha"}
        />
      </CustomForm>

      {/* <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Category
            categoryData={userData}
            onCatPress={catInchargePress}
            heading={"Choose Site Incharge"}
            isMulti={false}
            onClose={catInchargeClose}
          />
        </View> */}
      {isInchargeMenuOpen ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={isInchargeMenuOpen}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catInchargeClose}
          >
            <Category
              categoryData={userData}
              onCatPress={catInchargePress}
              heading={"Choose Entity"}
              isMulti={false}
              onClose={catInchargeClose}
            />
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default CreateZooSite;
