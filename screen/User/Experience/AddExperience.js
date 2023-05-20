import React, { useState } from "react";
import { StyleSheet, Alert, View } from "react-native";
import CustomForm from "../../../components/CustomForm";
import InputBox from "../../../components/InputBox";
import DatePicker from "../../../components/DatePicker";
import {
	addExperience,
	editExperience,
} from "../../../services/ExperienceService";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../components/Loader";
import { Text } from "react-native-paper";
import { useRef } from "react";

const AddExperience = (props) => {
	// console.log('edit props======>', props);
	// const {user_id, total_work_experience, modified_at, join_date, institution_name, institution_location, industry, end_date, designation, created_at} = props.route.params.item;
	// console.log(props.route.params?.item.user_id)
	const user_id = props.route.params?.item.user_id
	const navigation = useNavigation();
	const [id, setId] = useState(props.route.params?.item.id ?? 0);
	const [instituteName, setInstituteName] = useState(
		props.route.params?.item.institution_name ?? ""
	);
	const [instituteLocation, setInstituteLocation] = useState(
		props.route.params?.item.institution_location ?? ""
	);
	const [joinDate, setJoinDate] = useState(
		props.route.params?.item.join_date ?? ""
	);
	const [endDate, setEndDate] = useState(
		props.route.params?.item.end_date ?? ""
	);
	const [indusTRY, setIndustry] = useState(
		props.route.params?.item.industry ?? ""
	);
	const [designaTION, setDesignation] = useState(
		props.route.params?.item.designation ?? ""
	);
	const [totalWorkExp, setTotalWorkExp] = useState(
		props.route.params?.item.total_work_experience ?? ""
	);

	const [errorMessage, setErrorMessage] = useState({});
	const [isError, setIsError] = useState({});

	const [isLoading, setIsLoading] = useState(false);

	// console.log('institute name', instituteName);

	const validation = () => {
		if (instituteName.trim().length === 0) {
			setIsError({ instituteName: true });
			setErrorMessage({ instituteName: "This field required" });
			return false;
		} else if (instituteLocation.trim().length === 0) {
			setIsError({ instituteLocation: true });
			setErrorMessage({ instituteLocation: "This field required" });
			return false;
		} else if (indusTRY.trim().length === 0) {
			setIsError({ indusTRY: true });
			setErrorMessage({ indusTRY: "This field required" });
			return false;
		} else if (designaTION.trim().length === 0) {
			setIsError({ designaTION: true });
			setErrorMessage({ designaTION: "This field required" });
			return false;
		} else if (totalWorkExp.trim().length === 0) {
			setIsError({ totalWorkExp: true });
			setErrorMessage({ totalWorkExp: "This field required" });
			return false;
		}
		return true;
	};

	const editOnSubmit = () => {
		if (validation()) {
			var obj = {
				institution_name: instituteName,
				institution_location: instituteLocation,
				industry: indusTRY,
				designation: designaTION,
				total_work_experience: totalWorkExp,
				join_date: joinDate,
				end_date: endDate,
				user_id: user_id
			};
			setIsLoading(true);
			editExperience(obj)
				.then((res) => {
					console.log("res data=======>", res);
				})
				.catch((err) => {
					console.log("error===>", err);
				})
				.finally(() => {
					setIsLoading(false);
					Alert.alert("Data update successfully");
					setTimeout(() => {
						navigation.goBack();
					},500)
				});
		}
	};

	const onSubmit = () => {
		if (validation()) {
			var obj = {
				institution_name: instituteName,
				institution_location: instituteLocation,
				industry: indusTRY,
				designation: designaTION,
				total_work_experience: totalWorkExp,
				join_date: joinDate,
				end_date: endDate,
				user_id: user_id
			};
			setIsLoading(true);
			addExperience(obj)
				.then((res) => {
					console.log("res data=======>", res, obj);
				})
				.catch((err) => {
					console.log("error===>", err, obj);
				})
				.finally(() => {
					setIsLoading(false);
					Alert.alert("Data save successfully");
					setTimeout(() => {
						navigation.goBack();
					},500)
				});
		}
	};

	const InstituteLocation = useRef(null);
	const IndustryName = useRef(null);
	const Designation = useRef(null);
	const WorkExperience = useRef(null);
	const JoinDate = useRef(null);
	const EndDate = useRef(null);

	const handleSubmitFocus = (refs) => {
		{/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
		if (refs.current) {
			refs.current.focus();
		}*/}
	};
	const dropdownoff = () => {

	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<CustomForm
					header={true}
					title={"Add Experience"}
					// onPress={id > 0 ? editOnSubmit : onSubmit}
					onPress={onSubmit}
				// marginBottom={50}
				>
					<InputBox
						inputLabel={"Institute Name"}
						placeholder={"Institute Name"}
						onChange={(val) => {
							setInstituteName(val);
						}}
						defaultValue={instituteName != null ? instituteName : null}
						value={instituteName}
						autoFocus={true}
						isError={isError.instituteName}
						errors={errorMessage.instituteName}
						onSubmitEditing={() => handleSubmitFocus(InstituteLocation)}
					/>
					<InputBox
						refs={InstituteLocation}
						inputLabel={"Institute Location"}
						placeholder={"Institute Location"}
						onChange={(val) => {
							setInstituteLocation(val);
						}}
						defaultValue={
							instituteLocation != null ? instituteLocation : null
						}
						value={instituteLocation}
						isError={isError.instituteLocation}
						errors={errorMessage.instituteLocation}
						onSubmitEditing={() => handleSubmitFocus(IndustryName)}
					/>
					<InputBox
						refs={IndustryName}
						inputLabel={"Industry Name"}
						placeholder={"Industry Name"}
						onChange={(val) => {
							setIndustry(val);
						}}
						defaultValue={indusTRY != null ? indusTRY : null}
						value={indusTRY}
						isError={isError.indusTRY}
						errors={errorMessage.indusTRY}
						onSubmitEditing={() => handleSubmitFocus(Designation)}
					/>
					<InputBox
						refs={Designation}
						inputLabel={"Designation"}
						placeholder={"Designation"}
						onChange={(val) => {
							setDesignation(val);
						}}
						defaultValue={designaTION != null ? designaTION : null}
						value={designaTION}
						isError={isError.designaTION}
						errors={errorMessage.designaTION}
						onSubmitEditing={() => handleSubmitFocus(WorkExperience)}
					/>
					<InputBox
						refs={WorkExperience}
						inputLabel={"Total work experience"}
						placeholder={"Total work experience"}
						onChange={(val) => {
							setTotalWorkExp(val);
						}}
						defaultValue={totalWorkExp != null ? totalWorkExp : null}
						value={totalWorkExp}
						isError={isError.totalWorkExp}
						errors={errorMessage.totalWorkExp}
					// onSubmitEditing={() => handleSubmitFocus(JoinDate)}
					/>
					<DatePicker
						refs={JoinDate}
						today={props.route.params?.item.join_date ?? joinDate}
						onChange={(item) => {
							let today = item.toJSON().slice(0, 10);
							setJoinDate(today);
							// handleSubmitFocus(EndDate);
						}}
						title="Join Date"
						// onSubmitEditing={() => handleSubmitFocus(EndDate)}
						onOpen={dropdownoff}
					/>

					<DatePicker
						refs={EndDate}
						today={props.route.params?.item.end_date ?? endDate}
						onChange={(item) => {
							let today = item.toJSON().slice(0, 10);
							setEndDate(today);
						}}
						onOpen={dropdownoff}
						title="End Date"
					/>
				</CustomForm>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingBottom: 8,
		paddingHorizontal: 8
	},
	Label: {
		// top: "3%",
		marginTop: 20,
		fontSize: 5,
		fontWeight: "200",
	},
})

export default AddExperience;