import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import CustomForm from "../../../components/CustomForm";
import Loader from "../../../components/Loader";
import {
  EditSite,
  getZooSite,
  PostSite,
} from "../../../services/AddSiteService";
import NewDropdown from "../../../components/Dropdown";
import { View, useWindowDimensions } from "react-native";
import InputBox from "../../../components/InputBox";
import Category from "../../../components/DropDownBox";
import { useSelector } from "react-redux";
// import AppContext from '../../../context/AppContext'
import Modal from "react-native-modal";

const FullAccessitems = [
  {
    id: 0,
    name: "No",
  },
  {
    id: 1,
    name: "Yes",
  },
];

const activeitem = [
  {
    id: 0,
    name: "No",
  },
  {
    id: 1,
    name: "Yes",
  },
];

const CreateSite = (props) => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const [fullAccess, setFullAccess] = useState(
    props.route.params?.item.full_access ?? ""
  );
  
  const [fullAccessId, setFullAccessId] = useState(
    props.route.params?.item.full_access ?? ""
  );
  const [getSite, setSite] = useState([]);
  const [siteDropDown, setSiteDropDown] = useState(false);
  const [fullAccessDropDown, setFullAccessDropDown] = useState(false);
  const [ActiveDropDown, setActiveDropDown] = useState(false);
  const [data, setData] = useState("");
  const [id, setId] = useState(0);
  const [active, setActive] = useState(props.route.params?.item.active ?? "");
  const [activeId, setActiveId] = useState(
    props.route.params?.item.active ?? ""
  );
  const [loading, setLoding] = useState("");
  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const zooID = useSelector((state) => state.UserAuth.zoo_id);
  const user_id = useSelector((state) => state.UserAuth.userDetails.user_id);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);

  const catPressed = (item) => {
    // item.map((value)=>{setData(value.name)})
    setData(item.map((u) => u.name).join(", "));
    setId(item.map((id) => id.id).join(","));
    setSiteDropDown(!siteDropDown);
    // setActiveDropDown(true);
  };

  useEffect(() => {
    setLoding(true);
    getZooSite(zooID).then((res) => {
      let getdata = res.data.map((item) => {
        return {
          id: item.site_id,
          name: item.site_name,
        };
      });
      setSite(getdata);
      setLoding(false);
      // setFullAccessDropDown(true);
    });
  }, []);

  const validation = () => {
    if (fullAccess.length === 0) {
      setIsError({ fullAccess: true });
      setErrorMessage({ fullAccess: "Select Full Access Options" });
      return false;
    } else if (data.length === 0) {
      setIsError({ data: true });
      setErrorMessage({ data: "Select Site Options" });
      return false;
    } else if (active.length === 0) {
      setIsError({ active: true });
      setErrorMessage({ active: "Select Active Options" });
      return false;
    }
    return true;
  };

  const PostSiteData = () => {
    if (validation()) {
      let obj = {
        full_access: fullAccessId,
        site_id: id,
        active: activeId,
        user_id: user_id,
      };
      setLoding(true);
      PostSite(obj)
        .then((res) => {
          setLoding(false);
          if (res.success) {
            navigation.goBack();
            alert(res.message);
          } else alert("Something Went Wrong !");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const EditOnSubmit = () => {
  //   if (validation()) {
  //     let obj = {
  //       id: id,
  //       full_access: fullAccess,
  //       site_id: id,
  //       active: active,
  //     }
  //     setLoding(true);
  //     EditSite(obj).then((res) => {
  //       setLoding(false);
  //       // console.log("hello this is response edit--->>>>", res)
  //       if (res.success) {
  //         navigation.goBack();
  //         alert(res.message);
  //       } else (
  //         alert("Something Went Wrong !")
  //       )
  //     }).catch((err) => {
  //       console.log(err, "Validation Edit error");
  //     });
  //   }
  // }

  // const getFullAccessData = (item) => {
  //   const accessdata = item.id
  //   setFullAccess(accessdata)
  // }

  // const getActiveData = (item) => {
  //   const activeData = item.id
  //   setActive(activeData)
  // }

  const getFullAccessData = (item) => {
    item.map((value) => {
      setFullAccess(value.name);
    });
    item.map((value) => {
      setFullAccessId(value.id);
    });
    setFullAccessDropDown(!fullAccessDropDown);
    {
      /*Closing all auto complete for favor of IOS modal By Biswanath Nath 24.04.2023
  setSiteDropDown(true); */
    }
  };
  const getActiveData = (item) => {
    item.map((value) => {
      setActive(value.name);
    });
    item.map((value) => {
      setActiveId(value.id);
    });
    setActiveDropDown(!ActiveDropDown);
  };

  const SetfullAccess = (data) => {
    setFullAccessDropDown(data);
    setSiteDropDown(false);
    setActiveDropDown(false);
  };

  const SetDropDown = (data) => {
    setSiteDropDown(data);
    setFullAccessDropDown(false);
    setActiveDropDown(false);
  };

  const Setactivedown = (data) => {
    setActiveDropDown(data); 
    setFullAccessDropDown(false);
    setSiteDropDown(false);
  };
  return (
    <View style={{ flex: 1, backgroundColor: isSwitchOn ? "#1F415B" : "#DAE7DF" }}>
      <Loader visible={loading} />
      <CustomForm header={true} title={"Add Site"} onPress={PostSiteData}>
        <InputBox
          editable={false}
          inputLabel="FullAccess "
          value={fullAccess}
          placeholder="Select FullAccess"
          rightElement={fullAccessDropDown ? "chevron-up" : "chevron-down"}
          DropDown={SetfullAccess}
          errors={errorMessage.fullAccess}
          isError={isError.fullAccess}
        />

        <View style={{ marginTop: 20 }}>
          <InputBox
            editable={false}
            inputLabel="Site Name"
            value={data}
            placeholder="Select Site Name"
            rightElement={siteDropDown ? "chevron-up" : "chevron-down"}
            DropDown={SetDropDown}
            errors={errorMessage.data}
            isError={isError.data}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <InputBox
            editable={false}
            inputLabel="Active"
            value={active}
            placeholder="Select Active"
            rightElement={ActiveDropDown ? "chevron-up" : "chevron-down"}
            DropDown={Setactivedown}
            errors={errorMessage.active}
            isError={isError.active}
          />
        </View>
      </CustomForm>

      {siteDropDown ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={siteDropDown}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={() => setSiteDropDown(!setSiteDropDown)}
          >
            <Category
              categoryData={getSite}
              onCatPress={catPressed}
              heading={"Choose Site"}
              isMulti={false}
              onClose={() => setSiteDropDown(!setSiteDropDown)}
            />
          </Modal>
        </View>
      ) : null}

      {fullAccessDropDown ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={fullAccessDropDown}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={() => setFullAccessDropDown(!fullAccessDropDown)}
          >
            <Category
              categoryData={FullAccessitems}
              onCatPress={getFullAccessData}
              heading={"Choose Full Access"}
              isMulti={false}
              onClose={() => setFullAccessDropDown(!fullAccessDropDown)}
            />
          </Modal>
        </View>
      ) : null}

      {ActiveDropDown ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={ActiveDropDown}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={() => setActiveDropDown(!ActiveDropDown)}
          >
            <Category
              categoryData={activeitem}
              onCatPress={getActiveData}
              heading={"Choose Active"}
              isMulti={false}
              onClose={() => setActiveDropDown(!ActiveDropDown)}
            />
          </Modal>
        </View>
      ) : null}
    </View>
  );
};
export default CreateSite;
