//create by:Gaurav Shukla
// create on :1/03/2023

/**
 * Modified By: Biswajit Chakraborty
 * Modification Date: 02/05/23
 */

/**
 * Modified By: Biswajit Chakraborty
 * Modification Date: 08/05/23
 */

/**
 * Modified By: Biswajit Chakraborty
 * Modification Date: 09/05/23
 *
 * Modification: Added the edit and delete functionality
 */

import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import CustomFormWithoutKeyboardScroll from "../../components/CustomFormWithoutKeyboardScroll";
import InputBox from "../../components/InputBox";
import { MaterialIcons } from "@expo/vector-icons";
import { editSection } from "../../services/CreateSectionServices";
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
import { deleteSection } from "../../services/CreateSectionServices";
import Modal from "react-native-modal";
import Colors from "../../configs/Colors";
import CustomForm from "../../components/CustomForm";

export default function EditSectionForm(props) {
  // console.log("THIS IS THE PARTICULAR SECTION: ", props.route.params.section);
  // console.log("THIS ARE TEH SITES: ", props.route.params.section?.site_details);

  const selectedSiteName = props.route.params.section?.site_details
    .map((site) => site.site_name)
    .join(", ");

  const selectedSiteId = props.route.params.section?.site_details
    .map((site) => site.site_id)
    .join(", ");

  // console.log("THESE ARE THE SITE NAME: ", selectedSiteName);
  // console.log("THESE ARE THE SITE ID: ", selectedSiteId);

  const navigation = useNavigation();

  const [sectionId, setSectionId] = useState(
    props.route.params?.section?.section_id ?? ""
  );
  const [sectionName, setSectionName] = useState(
    props.route.params?.section?.section_name ?? ""
  );
  const [sectionCode, setSectionCode] = useState("");
  const [longitude, setLongitude] = useState(
    props.route.params?.section?.section_longitude ?? ""
  );
  const [latitude, setLatitude] = useState(
    props.route.params?.section?.section_latitude ?? ""
  );
  const [sectionInCharge, setSectionInCharge] = useState(
    props.route.params?.section?.section_incharge ?? ""
  );
  const [sectionDescription, setSectionDescription] = useState(
    props.route.params?.section?.section_description ?? ""
  );
  const [loading, setLoding] = useState(false);
  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  // const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const [sectionZooId, setSectionZooId] = useState(
    props.route.params?.section?.section_zoo_id ?? ""
  );
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const currentTheme = useSelector((state) => state.darkMode.theme);
  const [sites, setSites] = useState([]);
  const [siteName, setsiteName] = useState(selectedSiteName);
  const [siteId, setsiteId] = useState(selectedSiteId);
  const [isSiteOpen, setisSiteOpen] = useState(false);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setLoding(true);
    getZooSite(sectionZooId)
      .then((res) => {
        // console.log("THIS IS THE SITES RESPONSE: ", res);
        let getdata = res.data.map((item) => {
          return {
            id: item.site_id,
            name: item.site_name,
          };
        });
        setSites(getdata);
        setLoding(false);
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
    // console.log("SECTION DETAILS: ", sectionName, siteId);

    if (sectionName.trim().length === 0) {
      setIsError({ sectionName: true });
      setErrorMessage({ sectionName: "Enter The Name" });
      return false;
    } else if (siteId.trim().length === 0) {
      setIsError({ siteId: true });
      setErrorMessage({ siteId: "Select site" });
      return false;
    }
    // else if (longitude.trim().length === 0) {
    //   setIsError({ longitude: true });
    //   setErrorMessage({ longitude: "Enter The longitude" });
    //   return false;
    // }
    // else if (latitude.trim().length == 0) {
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

  const updateSection = () => {
    // console.log("INSIDE UPDATE SECTION");
    // console.log("VALIDATION: ", validation());

    if (validation()) {
      let obj = {
        section_id: sectionId,
        section_name: sectionName,
        section_code: sectionCode,
        section_site_id: siteId,
        section_latitude: latitude,
        section_longitude: longitude,
        section_incharge: sectionInCharge,
        section_description: sectionDescription,
      };

      setLoding(true);

      editSection(obj)
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

  const sectionDelete = () => {
    let argument = {
      section_id: props.route.params?.section?.section_id,
    };
    setLoding(true);
    deleteSection(argument)
      .then((res) => {
        // console.log("RESPONSE FROM DELETE API CALL: ", res);
        setLoding(false);
        if (res.success) {
          alert(res.message);
          setTimeout(() => {
            navigation.navigate("ListSection");
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoding(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isSwitchOn
          ? currentTheme.colors.background
          : Colors.background,
      }}
    >
      <Loader visible={loading} />
      <CustomForm
        header={true}
        title={"Edit Section"}
        onPress={updateSection}
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
            <Text
              style={{
                fontSize: 18,
                color: isSwitchOn
                  ? Colors.textColorDark
                  : Colors.textColorDefault,
              }}
            >
              Location of the Section
            </Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={getLocation}>
              <MaterialIcons
                name="my-location"
                size={23}
                color={
                  isSwitchOn ? Colors.textColorDark : Colors.textColorDefault
                }
              />
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
        <TouchableOpacity
          onPress={sectionDelete}
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
            Delete Section
          </Text>
        </TouchableOpacity>
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
            style={{ margin: 0, justifyContent: "flex-end" }}
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
