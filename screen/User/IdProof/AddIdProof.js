import { useEffect, useRef, useState } from "react";
import CustomForm from "../../../components/CustomForm";
// import * as Location from 'expo-location';
// import { CreateZoneService } from "../../services/CreateZoneService";
import Loader from "../../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { AddIdProofService, getIdProofsForm } from "../../../services/IdProofService";
import DocumentUpload from "../../../components/DocumentUpload";

import InputBox from "../../../components/InputBox";
import Category from "../../../components/DropDownBox";
import Modal from "react-native-modal";



export default function AddIdProof(props) {
	const navigation = useNavigation();
	const { height, width } = useWindowDimensions();
	const [idProofType, setIdProofType] = useState("");
	const [user_id, setuser_id] = useState(props.route.params?.item?.user_id ?? 0)
	const [idProofNumber, setIdProofNumber] = useState(props.route.params?.item?.idProofNumber ?? "")
	const [inputValue, setInputValue] = useState(props.route.params?.item?.inputValue ?? null);
	const [uploadFile, setUploadFile] = useState(props.route.params?.item?.uploadFile ?? [])


	const [idMoreNumber, setIdMoreNumber] = useState(props.route.params?.item?.idMoreNumber ?? "")
	const [IdProofForm, setIdProofForm] = useState(props.route.params?.item?.IdProofForm ?? [])
	const [moreUpload, setMoreUpload] = useState(props.route.params?.item?.moreUpload ?? []);
	const [idProofDropDown, setIdProofDropDown] = useState("");
	const [idName, setIdName] = useState("");
	const [id, setId] = useState("")
	const [loading, setLoding] = useState(true);
	const [isError, setIsError] = useState({
		idProofType: false,
		idProofNumber: false,
		document: false,
		idMoreNumber: false
	});
	const [errorMessage, setErrorMessage] = useState({
		idProofType: null,
		idProofNumber: null,
		document: null,
		idMoreNumber: null
	});


	const catPressed = (item) => {
		// console.log("************",item)
		item.map((value) => { setIdName(value.name) })
		setIdProofDropDown(!idProofDropDown);
		{/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
		idproofnumRef.current.focus();*/}
	}

	const catClose = () => {
		setIdProofDropDown(!idProofDropDown)
	}


	const SetDropDown = (data) => {
		setIdProofDropDown(!idProofDropDown)
	}

	useEffect(() => {
		setLoding(true);
		getIdProofsForm().then((res) => {
			setIdProofForm(res.data)
		}).catch((err) => {
			console.log('error', err);
		}).finally(() => {
			setLoding(false)
			{/*Closing all auto focus for favor of IOS modal By Biswanath Nath 24.04.2023
			setTimeout(() => {
				dlnumberRef.current.focus();
			}, 100);*/}
		})
	}, [])


	const validate = () => {
		// var passw=  /^[A-Za-z]\w{7,14}$/;
		if (idProofNumber.trim().length == 0) {
			setIsError({ idProofNumber: true })
			setErrorMessage({ idProofNumber: "Please enter Id Proof Number1" })
			return false
		} else if (uploadFile.length == 0) {
			setIsError({ uploadFile: true })
			setErrorMessage({ uploadFile: "Please  upload the File" })
			return false
		} else if (idName.length == 0) {
			setIsError({ idName: true })
			setErrorMessage({ idName: "Please select valid data" })
			return false
		} else if (idMoreNumber.trim().length == 0) {
			console.log("not ok");
			setIsError({ idMoreNumber: true })
			setErrorMessage({ idMoreNumber: "This field is required" })
			return false
		} else if (moreUpload.length == 0) {
			setIsError({ moreUpload: true })
			setErrorMessage({ moreUpload: "Please  upload the File" })
			return false
		}
		return true
	}


	const onSubmit = () => {
		// console.log(uploadFile[0].type,"*********")
		setIsError({});
		setErrorMessage({});
		if (validate()) {
			setLoding(true)
			let obj = {
				id_type: required_id_proof[0].id,
				user_id: user_id,
				id_value: idProofNumber,
				id_doc: `data:${uploadFile[0].type};base64,${uploadFile[0].fileBase64}`,
			}

			let raw = {
				id_type: id,
				user_id: user_id,
				id_value: idMoreNumber,
				id_doc: `data:${moreUpload[0].type};base64,${moreUpload[0].fileBase64}`,
			}
			AddIdProofService(obj).then((res) => {
				AddIdProofService(raw).then((res) => {
					if (res.success) {
						alert(res.message)
					}
				}).catch((err) => {
					console.log('err====>', err);
				})
			})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setLoding(false);
					navigation.goBack();
					alert("Added Id Proof Is Added Successfully")
				})
			setIdProofType("")
			setIdProofNumber("")
			setErrorMessage("")
			setIdName("")
		}
	}

	const { id_proofs, required_id_proof } = IdProofForm;

	let others_id_proofs = id_proofs?.map((item) => {
		return {
			id: item.id,
			name: item.id_name
		}
	})
	const idProofRef = useRef(null);
	const idproofnumRef = useRef(null);
	const dlnumberRef = useRef(null)
	const handleSubmitFocus = (refs) => {
		if (refs.current) {
			refs.current.focus();
		}
	};

	// const checkNumber = (number) => {
	// 	setIsError({ idProofNumber: false });
	// 	const pattern = /^[A-Za-z]\w{7,14}$/;
	// 	let result = pattern.test(number);
	// 	if (!result) {
	// 		setIsError({ idProofNumber: true });
	// 		setErrorMessage({ idProofNumber: "Only number accepted" });
	// 	}
	// 	return result;
	// }

	// const checkIDNumber = (number) => {
	// 	setIsError({ idMoreNumber: false });
	// 	const pattern = /^[A-Za-z]\w{7,14}$/;
	// 	let result = pattern.test(number);
	// 	if (!result) {
	// 		setIsError({ idMoreNumber: true });
	// 		setErrorMessage({ idMoreNumber: "Only number accepted" });
	// 	}
	// 	return result;
	// }
	const dropdownOff = () => {
		setIdProofDropDown(false)

	}

	//    useEffect(() => {
	// 	setTimeout(() => {
	// 		dlnumberRef.current.focus();
	// 		 }, 0);
	// 	   },[]);

	return (
		<>
			{loading ? <Loader /> :
				<CustomForm header={true} title="Add Id Proof" noIcon={true} onPress={onSubmit} >
					<View style={styles.fieldSection}>
						{/* <Text>{required_id_proof[0].id_name}</Text> */}
						{/* <TextInput 
                inputLabel={required_id_proof[0].id_name}
                placeholder={required_id_proof[0].id_name}
                value={required_id_proof[0].id_name}
                editable={false}
              /> */}

						<InputBox
							inputLabel={required_id_proof[0].id_name + " Number"}
							placeholder={"Enter " + required_id_proof[0].id_name + " Number"}
							refs={dlnumberRef}
							errors={errorMessage.idProofNumber}
							isError={isError.idProofNumber}
							onFocus={dropdownOff}
							onChange={(value) => setIdProofNumber(value)}
							// onChange={value => {
							// 	checkNumber(value)
							// 		? setIdProofNumber(value)
							// 		: setIdProofNumber('')
							// }}

							// onSubmitEditing={() => handleSubmitFocus(idProofRef)}
							defaultValue={idProofNumber != null ? idProofNumber : null}
							value={idProofNumber}
							// keyboardType="numeric"
							pattern="[0-9]*"
							maxLength={16}
						/>
						<View>
							<DocumentUpload
								uploadable={true}
								type={"document"}

								items={uploadFile}
								onChange={(value) => {
									// console.log({value});
									setUploadFile(value)
								}}

							/>
							{
								isError.uploadFile
									? (
										<Text style={styles.errortext}>
											{errorMessage.uploadFile}
										</Text>
									)
									: null
							}
						</View>

					</View>

					<View style={styles.fieldSection}>
						<InputBox
							refs={idProofRef}
							editable={false}
							inputLabel="Id Proof Type"
							value={idName}
							placeholder="Enter Id Proof Type"
							rightElement={idProofDropDown ? "chevron-up" : "chevron-down"}
							// DropDown={()=>{setIdProofDropDown(!idProofDropDown)}}
							// onChange={(value) => setId(value)}
							DropDown={SetDropDown}
							onFocus={SetDropDown}
							onSubmitEditing={() => handleSubmitFocus(idproofnumRef)}
							errors={errorMessage.idName}
							isError={isError.idName}
						/>
						<InputBox
							refs={idproofnumRef}
							inputLabel={"Id Proof Number"}
							placeholder={"Enter Id Number"}
							value={idMoreNumber}
							onFocus={dropdownOff}
							errors={errorMessage.idMoreNumber}
							isError={isError.idMoreNumber}
							onChange={(value) => setIdMoreNumber(value)}
							// onChange={value => {
							// 	checkIDNumber(value)
							// 		? setIdMoreNumber(value)
							// 		: setIdMoreNumber('')
							// }}
							// keyboardType="numeric"
							// maxLength={8}
						/>
						<View>
							<DocumentUpload
								uploadable={true}
								type={"document"}
								items={moreUpload}
								onChange={(value) => {
									// console.log({value});
									setMoreUpload(value)
								}}
							/>
							{
								isError.moreUpload
									? (
										<Text style={styles.errortext}>
											{errorMessage.moreUpload}
										</Text>
									)
									: null
							}
						</View>

					</View>
				</CustomForm>}
			{idProofDropDown ?
				<View >
					<Modal
						animationType="slide"
						transparent={true}
						deviceWidth={width}
						visible={idProofDropDown}
						style={{ margin: 0, justifyContent: 'flex-end' }}
						onBackdropPress={catClose}>
						<Category
							categoryData={others_id_proofs}
							onCatPress={catPressed}
							heading={"Choose Id Proof Type"}
							onClose={catClose}
						/>
					</Modal>
				</View>
				: null}
		</>
	);
}

const styles = StyleSheet.create({
	Label: {
		marginTop: 20,
		fontSize: 5,
		fontWeight: "200",
	},
	errortext: {
		color: "red"

	},
	fieldSection: {
		borderWidth: 0.5,
		paddingHorizontal: 5,
		borderRadius: 10,
		borderColor: '#ddd',
		marginVertical: 10
	},
	errortext: {
		color: "red"

	}
})