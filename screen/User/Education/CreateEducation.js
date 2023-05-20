import React, { useEffect, useState, useRef } from "react";
import {
  addEducation,
  editEducation,
  getListEducation,
} from "../../../services/EducationService";
import InputBox from "../../../components/InputBox";
import CustomForm from "../../../components/CustomForm";
import { useNavigation } from "@react-navigation/native";
import {
  getEducationType,
  getSection,
} from "../../../services/staffManagement/getEducationType";
import NewDropdown from "../../../components/Dropdown";
import Category from "../../../components/DropDownBox";
import Loader from "../../../components/Loader";
import { View, useWindowDimensions } from "react-native";
import Modal from "react-native-modal";

const CreateEducation = (props) => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  const [user_id, setuser_id] = useState(
    props.route.params?.item?.user_id ?? 0
  );

  const [id, setId] = useState(
    props.route.params?.item?.item?.education_id ?? 0
  );
  const [eduValue, setEduValue] = useState(
    props.route.params?.item.item?.education_type ?? ""
  );
  const [institutionValue, setInstitutionValue] = useState(
    props.route.params?.item.item?.institution_name ?? ""
  );
  const [passoutValue, setPassoutValue] = useState(
    props.route.params?.item.item?.year_of_passout ?? ""
  );
  const [courseValue, setCourseValue] = useState(
    props.route.params?.item.item?.course ?? ""
  );
  const [marksValue, setMarksValue] = useState(
    props.route.params?.item.item?.marks ?? ""
  );
  const [isLoading, setIsLoding] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [isError, setIsError] = useState({});
  const [data, setData] = useState("");
  const [dataEducationType, setdataEducationType] = useState([]);
  const [educationDown, setEducationDown] = useState(false);
  // const [siteDropDown, setSiteDropDown] = useState()

  const validation = () => {
    setIsError({});
    setErrorMessage({});
    if (eduValue.length === 0) {
      setIsError({ eduValue: true });
      setErrorMessage({ eduValue: "Enter Education Type*" });
      return false;
    } else if (institutionValue.trim().length === 0) {
      setIsError({ institutionValue: true });
      setErrorMessage({ institutionValue: "Enter Institution Name*" });
      return false;
    } else if (passoutValue.trim().length === 0) {
      setIsError({ passoutValue: true });
      setErrorMessage({ passoutValue: "Enter Passout Year*" });
      return false;
    } else if (passoutValue.trim().length < 4) {
      setIsError({ passoutValue: true });
      setErrorMessage({ passoutValue: "Enter atleast 4 digits" });
      return false;
    } else if (courseValue.trim().length === 0) {
      setIsError({ courseValue: true });
      setErrorMessage({ courseValue: "Enter Course Name*" });
      return false;
    } else if (marksValue.trim().length === 0) {
      setIsError({ marksValue: true });
      setErrorMessage({ marksValue: "Enter marks here*" });
      return false;
    }
    return true;
  };

  const catPressed = (item) => {
    setData(item.map((u) => u.name).join(", "));
    setEduValue(item.map((u) => u.id).join(","));
    setEducationDown(false);
    {/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    instituteRef.current.focus();*/}
  };

  const catClose = (item) => {
    setEducationDown(!educationDown);
  };

  useEffect(() => {
    setIsLoding(true);
    getEducationType()
      .then((res) => {
        console.log(res);
        let eduType = res.map((item) => {
          return {
            id: item.id,
            name: item.type_name,
          };
        });
        setdataEducationType(eduType);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoding(false);
        handleSubmitFocus(educationRef);
      });
  }, []);

  const addEducationdata = () => {
    if (validation()) {
      var obj = {
        education_type: eduValue,
        institution_name: institutionValue,
        year_of_passout: passoutValue,
        course: courseValue,
        marks: marksValue,
        user_id: user_id,
      };
      setIsLoding(true);
      // console.log("obj data========>", obj);
      addEducation(obj)
        .then((res) => {
          console.log("response==========+>", res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoding(false);
          navigation.goBack();
          console.log("ok===========");
          alert("Add Education successfuly");
        });
    }
  };

  const editEducationData = () => {
    if (validation()) {
      var obj = {
        education_type: eduValue,
        institution_name: institutionValue,
        year_of_passout: passoutValue,
        course: courseValue,
        marks: marksValue,
        user_id: user_id,
        id: id,
      };
      setIsLoding(true);
      console.log("obj data========>", obj);
      editEducation(obj)
        .then((res) => {
          console.log("response==========+>", res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoding(false);
          // navigation.goBack();
          console.log("ok===========");
          alert("User Education update successfuly");
        });
    }
  };

  // const getEducationTypeData = (item) => {
  //   const dataEducation = item.id
  //   setEduValue(dataEducation)
  //   // console.log("Data is Movable*********", eduValue);
  // }
  const SetDropDown = (data) => {
    setEducationDown(!educationDown);
  };

  const educationRef = useRef(null);
  const instituteRef = useRef(null);
  const passoutRef = useRef(null);
  const courseRef = useRef(null);
  const marksRef = useRef(null);

  const handleSubmitFocus = (refs) => {
    {
      /*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
    if (refs.current) {
      refs.current.focus();
    }*/
    }
  };

  const dropdownOff = () => {
    setEducationDown(false);
  };

  // useEffect(() => {
  //    setTimeout(() => {
  //       educationRef.current.focus();
  //     }, 0);
  //   },[]);

  const checkNumber = (number) => {
    setIsError({ passoutValue: false });
    const pattern = /^[1-9][0-9]*$/;
    let result = pattern.test(number);
    if (!result) {
      setIsError({ passoutValue: true });
      setErrorMessage({ passoutValue: "Only number accepted" });
    }
    return result;
  };

  const checkMarks = (number) => {
    setIsError({ marksValue: false });
    const pattern = /^[1-9][0-9]*$/;
    let result = pattern.test(number);
    if (!result) {
      setIsError({ marksValue: true });
      setErrorMessage({ marksValue: "Only number accepted" });
    }
    return result;
  };

  return (
    <>
      <CustomForm
        header={true}
        title={"Add Education"}
        onPress={id > 0 ? editEducationData : addEducationdata}
        marginBottom={50}
      >
        <Loader visible={isLoading} />

        {/* <NewDropdown
              title="Education Type"
              data={dataEducationType}
              afterPressDropdown={getEducationTypeData}
              errors={errorMessage.eduValue}
              isError={isError.eduValue}
            /> */}

        <InputBox
          editable={false}
          inputLabel="Education Type"
          value={data}
          refs={educationRef}
          // autoFocus={true}
          placeholder="Select Section Name"
          rightElement={educationDown ? "chevron-up" : "chevron-down"}
          DropDown={SetDropDown}
          onFocus={SetDropDown}
          errors={errorMessage.eduValue}
          isError={isError.eduValue}
        />

        <InputBox
          inputLabel={"Enter institution name"}
          placeholder={"Enter institution name"}
          refs={instituteRef}
          onChange={(val) => {
            setInstitutionValue(val);
          }}
          onFocus={dropdownOff}
          value={institutionValue}
          defaultValue={institutionValue != null ? institutionValue : null}
          onSubmitEditing={() => handleSubmitFocus(passoutRef)}
          isError={isError.institutionValue}
          errors={errorMessage.institutionValue}
          keyboardType={"default"}
        />
        <InputBox
          inputLabel={"Enter year of passout"}
          placeholder={"Enter year of passout"}
          refs={passoutRef}
          // onChange={(val) => setPassoutValue(val)}
          onChange={(val) => {
            checkNumber(val) ? setPassoutValue(val) : setPassoutValue("");
          }}
          onFocus={dropdownOff}
          value={passoutValue}
          defaultValue={passoutValue != null ? passoutValue : null}
          isError={isError.passoutValue}
          errors={errorMessage.passoutValue}
          onSubmitEditing={() => handleSubmitFocus(courseRef)}
          keyboardType={"numeric"}
          maxLength={4}
        />
        <InputBox
          inputLabel={"Enter course name"}
          placeholder={"Enter course name"}
          refs={courseRef}
          onChange={(val) => setCourseValue(val)}
          onFocus={dropdownOff}
          value={courseValue}
          defaultValue={courseValue != null ? courseValue : null}
          isError={isError.courseValue}
          errors={errorMessage.courseValue}
          onSubmitEditing={() => handleSubmitFocus(marksRef)}
          keyboardType={"default"}
        />
        <InputBox
          inputLabel={"Enter your marks"}
          placeholder={"Enter marks in %"}
          refs={marksRef}
          // onChange={(val) => setMarksValue(val)}
          onChange={(val) => {
            checkMarks(val) ? setMarksValue(val) : setMarksValue("");
          }}
          onFocus={dropdownOff}
          value={marksValue}
          defaultValue={marksValue != null ? marksValue : null}
          isError={isError.marksValue}
          errors={errorMessage.marksValue}
          keyboardType={"numeric"}
          maxLength={3}
        />
      </CustomForm>

      {educationDown ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            deviceWidth={width}
            visible={educationDown}
            style={{ margin: 0, justifyContent: "flex-end" }}
            onBackdropPress={catClose}
          >
            <Category
              categoryData={dataEducationType}
              onCatPress={catPressed}
              heading={"Choose Education Type"}
              onClose={catClose}
              isMulti={false}
            />
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default CreateEducation;
