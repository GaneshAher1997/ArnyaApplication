
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import CustomFormWithoutKeyboardScroll from "../../components/CustomFormWithoutKeyboardScroll";
import Loader from "../../components/Loader";
import InputBox from "../../components/InputBox";
import { createDesignation } from "../../services/staffManagement/DesignationService";
import { useRef } from "react";


const CreateDesignation = () => {
	const navigation = useNavigation()
	const [designationName, setDesignation] = useState("");
	const [designationCode, setDesignationCode] = useState("");
	const [loading, setLoding] = useState(false)
	const [errorMessage, setErrorMessage] = useState({});
	const [isError, setIsError] = useState({});
  
	const saveDesignationData = () => {
		setIsError({});
		setErrorMessage({}); 
		if (designationName.trim().length === 0) {    
			setIsError({ designationName: true });
			setErrorMessage({ designationName: "Designation name is required" });
			return false;
		} else if (designationCode.trim().length === 0) {
			setIsError({ designationCode: true });
			setErrorMessage({ designationCode: "Designation code is required" });
			return false;
		} else {
			let obj = {
				designation_name: designationName,
				designation_code: designationCode,
			};
			console.log("hello obj", obj);
			setLoding(true)
			createDesignation(obj)
				.then((res) => {       
				}).finally(() => {
					setLoding(false);
					alert("Designation added successfully") 
					navigation.goBack();
				})
				.catch((err) => {
					console.log(err);
				})
		}
	};
	 const input2Ref = useRef(null);
     const input3Ref = useRef(null);
     const handleSubmitEditing = (refs) => {
    if (refs.current) {
      refs.current.focus();
    }
  };

	return (
		<>
		{ loading?<Loader/>: <CustomFormWithoutKeyboardScroll
			header={true}
			title={"Designation"}
			onPress={saveDesignationData}
		>
			<InputBox
				inputLabel={"Name"}
				placeholder={"Enter Designation Name"}
				onChange={(val) => setDesignation(val)}
				value={designationName}
				errors={errorMessage.designationName}
				isError={isError.designationName}
				keybordType={"default"}
				textTransform="uppercase"
				autoFocus={false}
                // onSubmitEditing={() => handleSubmitEditing(input2Ref)}

			/>
			<InputBox
			    refs={input2Ref}
				inputLabel={"Designation Code"}
				placeholder={"Enter Designation  "}
				onChange={(val) => setDesignationCode(val)}
				value={designationCode}
				errors={errorMessage.designationCode}
				isError={isError.designationCode}
				// onSubmitEditing={() => handleSubmitEditing(input3Ref)}
			/>
		</CustomFormWithoutKeyboardScroll>
}
</>
	);
};

export default CreateDesignation;
