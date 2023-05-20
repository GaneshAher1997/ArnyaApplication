import React, { useState, useRef } from "react";
import CustomFormWithoutKeyboardScroll from "../../components/CustomFormWithoutKeyboardScroll";
import InputBox from "../../components/InputBox";
import { createDepartment } from "../../services/DepartmentServices";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useSelector} from "react-redux";

const EmpDepartment = () => {
	const navigation = useNavigation();
	const [deptName, setDeptName] = useState("");
	const [deptCode, setDeptCode] = useState("");
	const [isLoading, setLoding] = useState(false);
	const clientID = useSelector(state => state.UserAuth.client_id)

	const [errorMessage, setErrorMessage] = useState({
		deptName: null,
		deptCode: null,
	});
	const [isError, setIsError] = useState({
		deptName: false,
		deptCode: false,
	});

	const checkDepartmentName = (str) => {
		let res = str.match(/^[A-Za-z/ /]+$/) ? false : true;
		// console.log(res);
		return res;
	};

	const validation = () => {
		if (deptName.trim().length === 0) {
			setIsError({ deptName: true });
			setErrorMessage({ deptName: "Department name is required" });
			return false;
		} else if (checkDepartmentName(deptName)) {
			setIsError({ deptName: true });
			setErrorMessage({
				deptName: "department name can contains only alphabets",
			});
			return false;
		} else if (deptCode.trim().length === 0) {
			setIsError({ deptCode: true });
			setErrorMessage({ deptCode: "Department code is required" });
			return false;
		}
		return true;
	};

	const saveDepartmentData = () => {
		if (validation()) {
			let obj = {
				dept_name: deptName,
				dept_code: deptCode,
				client_id : clientID
			};
			console.log("hello savbshsd", obj);
			setLoding(true);
			createDepartment(obj)
				.then((res) => {
					console.log(
						"<<<<-----hello show me the response from API --->>>>",
						res
					);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setLoding(false);
					navigation.goBack();
					Alert.alert("Your data added successfully");
				});
			setDeptCode("");
			setDeptName("");
			setIsError("");
			setErrorMessage("");
		}
	};
	const deptRef = useRef(null);
	const deptcodeRef = useRef(null)
	const handleSubmitFocus = (refs) => {
		if (refs.current) {
		  refs.current.focus();
		}
	  };

	return (
		<>
			{isLoading ? (
				<Loader loaderSize="lg" />
			) : (
				<CustomFormWithoutKeyboardScroll
					header={true}
					title={"Employee Deprtment"}
					onPress={saveDepartmentData}
				>
					<InputBox
						inputLabel={"Department Name"}
						placeholder={"Enter Department Name"}
						autoFocus={false}
						onChange={(val) => setDeptName(val)}
						value={deptName}
						// onSubmitEditing={()=>handleSubmitFocus(deptcodeRef)}
						errors={errorMessage.deptName}
						isError={isError.deptName}
						//keyboardType={"alpha"}
					/>
					<InputBox
					  refs={deptcodeRef}
						inputLabel={"Department Code"}
						placeholder={"Enter Department Code"}
						onChange={(val) => setDeptCode(val)}
						value={deptCode}
						errors={errorMessage.deptCode}
						isError={isError.deptCode}
						//keyboardType={"alpha"}
					/>
				</CustomFormWithoutKeyboardScroll>
			)}
		</>
	);
};

export default EmpDepartment;
