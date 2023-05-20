import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { idproof } from "../../services/ClientService";
import InputBox from "../../components/InputBox";
import CustomFormWithoutKeyboardScroll from "../../components/CustomFormWithoutKeyboardScroll";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../components/Loader";
import { Checkbox } from "react-native-paper";
import NewDropdown from "../../components/Dropdown";
import { useSelector } from "react-redux";
import CheckBox from "../../components/CheckBox";

let documentType = "";

const ClientIdForm = () => {
  const navigation = useNavigation();

  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isError, setIsError] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setLoding] = useState(false);
  const clientID = useSelector((state) => state.UserAuth.client_id);

  // console.log("ischecked", isChecked);

  const getDocumentTypeData = (item) => {
    documentType = item.val;
    setInputValue(documentType);
    console.log("staff status sval----", documentType);
  };

  const onSubmit = () => {
    setIsError({});
    setErrorMessage({});
    if (inputValue.trim().length === 0) {
      setIsError({ inputValue: true });
      setErrorMessage({ inputValue: "This field is required" });
      return false;
    }
    setLoding(true);
    var obj = {
      id_name: inputValue,
      client_id: clientID,
      required: Number(isChecked),
    };
    idproof(obj)
      .then((response) => {
        console.log("response -->", response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoding(false);
        navigation.goBack();
        console.log("ok===========");
        alert("Create ID proof successfuly");
      });
  };

  return (
    <>
      <Loader visible={isLoading} />
      <CustomFormWithoutKeyboardScroll
        header={true}
        title={"Id Proof Type"}
        onPress={onSubmit}
      >
        <InputBox
          inputLabel={"Enter Id Proof Type"}
          placeholder={"Id Proof"}
          autoFocus={false}
          onChange={(value) => setInputValue(value)}
          value={inputValue}
          errors={errorMessage.inputValue}
          isError={isError.inputValue}
        />
        <View style={{}}>
          <CheckBox
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            title={"Is it required?"}
          />
        </View>
      </CustomFormWithoutKeyboardScroll>
    </>
  );
};

export default ClientIdForm;

const styles = StyleSheet.create({
  Label: {
    marginTop: 20,
    fontSize: 5,
    fontWeight: "200",
  },
  errortext: {
    color: "red",
  },
});
