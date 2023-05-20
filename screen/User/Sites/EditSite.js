// Created By :Wasim Akram
// created at : 08/05/2023
// modified by Wasim Akram at 09/05/2023

import React, { useEffect, useState, useRef } from "react";
import CustomForm from "../../../components/CustomForm";
import InputBox from "../../../components/InputBox";
import Loader from "../../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import Colors from "../../../configs/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getStaffList } from "../../../services/staffManagement/addPersonalDetails";
import Category from "../../../components/DropDownBox";
import Modal from "react-native-modal";
import { deleteSite } from "../../../services/AddSiteService";
import { editSite } from "../../../services/AddSiteService";

const EditSite = (props) => {
  const navigation = useNavigation();
  const [siteId] = useState(props.route.params?.site.item.site_id ?? "");
  const [siteName, setSiteName] = useState(
    props.route.params?.site.item.site_name ?? ""
  );
  console.log("got Item Data in Edit Page", props.route.params?.site?.item);

  const [description, setDescription] = useState(
    props.route.params?.site.item.site_description ?? ""
  );
  const [number, setNumber] = useState(
    props.route.params?.site.item.site_incharge_number ?? ""
  );
  const [longitude, setLongitude] = useState(
    props.route.params?.site.item.site_longitude ?? ""
  );
  const [latitude, setLatitude] = useState(
    props.route.params?.site.item.site_latitude ?? ""
  );

  const [incharge, setIncharge] = useState("");
  // props.route.params?.site.item.site_incharge ?? ""
  const [inchargeId, setInchargeId] = useState("");
  // props.route.params?.site.item.site_incharge ?? ""
  const [userData, setuserData] = useState("");
  const [isInchargeMenuOpen, setisInchargeMenuOpen] = useState(false);

  const [isLoading, setLodaing] = useState(false);
  const zooID = useSelector((state) => state.UserAuth.zoo_id);

  const [errorMessage, setErrorMessage] = useState({});
  const [isError, setIsError] = useState({});
  const { height, width } = useWindowDimensions();

  const getLocation = async () => {
    setLodaing(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLodaing(false);
      console.log("Permission to access location was denied");
      return;
    }
    setLodaing(false);
    let location = await Location.getCurrentPositionAsync({});
    setLongitude(location.coords.longitude.toString());
    setLatitude(location.coords.latitude.toString());
  };
  const DeleteSiteData = () => {
    let requestObj = {
      site_id: siteId,
    };
    setLodaing(true);
    deleteSite(requestObj)
      .then((res) => {
        // setLoding(false);
        console.log("Site Already Deleted================++++++++++", res);
        if (res.success) {
          alert(res.message);
          setTimeout(() => {
            navigation.navigate("ListSite");
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLodaing(false);
      });
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

  const EditZooSiteData = () => {
    if (validation()) {
      let obj = {
        site_id: siteId,
        site_name: siteName,
        site_latitude: latitude,
        site_longitude: longitude,
        site_incharge: inchargeId,
        site_description: description,
      };
      setLodaing(true);
      editSite(obj)
        .then((res) => {
          console.log("Edit Data POST=======>", res);
          if (res.success) {
            navigation.navigate("ListSite");
            alert("Site data Updated Successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLodaing(false);
        });
    }
  };

  useEffect(() => {
    setLodaing(true);
    let postData = {
      zoo_id: zooID,
    };
    getStaffList(postData)
      .then((res) => {
        console.log({ res });
        let staff = res.data.map((item) => {
          return {
            id: item.user_id,
            name: item.user_first_name + " " + item.user_last_name,
          };
        });
        setuserData(staff);
      })
      .finally(() => {
        setLodaing(false);
      });
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    if (siteNameRef.current) {
      setTimeout(() => {
        siteNameRef.current.focus();
      }, 100);
    }*/
    }
  }, []);

  

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
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    handleSubmitFocus(inchargeNumRef, 1000);*/
    }
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
      <CustomForm header={true} title={"Edit Site"} onPress={EditZooSiteData}>
        <Loader visible={isLoading} />
        <InputBox
          inputLabel={"Site Name"}
          placeholder={"Enter Site Name"}
          onFocus={catInchargeClose}
          onChange={(val) => setSiteName(val)}
          value={siteName}
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
            <TouchableOpacity onPress={getLocation}>
              <MaterialIcons name="my-location" size={23} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: 13 }}>
          <InputBox
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
          />

          <InputBox
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
          />
        </View>

        <InputBox
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
        />
        <InputBox
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

        <TouchableOpacity
          // button added for delete the Site data.
          onPress={DeleteSiteData}
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
            Delete Site
          </Text>
        </TouchableOpacity>
      </CustomForm>

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

export default EditSite;
