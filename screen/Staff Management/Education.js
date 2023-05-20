//Create by: Gaurav Shukla
//Create on :21/02/2023

import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import CustomFormWithoutKeyboardScroll from '../../components/CustomFormWithoutKeyboardScroll';
import InputBox from '../../components/InputBox';
import { createEducationType } from '../../services/CreateEducationTypeService';
import { useNavigation } from "@react-navigation/native";
import Loader from '../../components/Loader';
import { useSelector } from "react-redux";

const Education = () => {
    const navigation = useNavigation();
    const [educationType, setEducationType] = useState("")
    const [isLoading, setLoding] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        educationType: null,

    });

    const [isError, setIsError] = useState({
        educationType: false,
    });

    const clientID = useSelector(state => state.UserAuth.client_id)

    const CreateTypeEdu = () => {

        setIsError({});
        setErrorMessage({});
        if (educationType.trim().length === 0) {
            setIsError({ educationType: true })
            setErrorMessage({ educationType: "Enter Education Type" })
            return false;
        }
        else {
            setLoding(true);
            let obj = {
                type_name: educationType,
                client_id: clientID
            }
            createEducationType(obj)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoding(false);
                    navigation.goBack();
                    Alert.alert("Education type is added successfully")
                    // console.log("ok Ashu =>>>>>>=====");
                });;
            setEducationType("")
            setErrorMessage("")
        }

    }

    return (
        <>
            <Loader visible={isLoading} />
            <CustomFormWithoutKeyboardScroll header={true} title={"Add Education Type"} onPress={CreateTypeEdu}>
                <InputBox
                    inputLabel={"Enter Education Type"}
                    placeholder={"Education Type"}
                    autoFocus={false}
                    onChange={(value) => setEducationType(value)}
                    value={educationType}
                    errors={errorMessage.educationType}
                    isError={isError.educationType}
                />
            </CustomFormWithoutKeyboardScroll>
        </>
    )
}
export default Education;