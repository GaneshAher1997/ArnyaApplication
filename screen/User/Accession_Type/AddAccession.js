import React, { useState } from "react";
import CustomForm from "../../../components/CustomForm";
import InputBox from "../../../components/InputBox";
import Loader from "../../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { Alert} from "react-native";
import { createAccessionType } from "../../../services/AccessionService";
import NewDropdown from "../../../components/Dropdown";

const items = [
    {
        category_id: 1,
        category_name: "FullAccess",
        category_type: 1,
        isExpanded: true,
        subcategory: [
            {
                id: 0,
                val: "No",
            },
            {
                id: 1,
                val: "Yes",
            },

        ],
    },
]


const AddAccession = () => {
	const navigation = useNavigation();
	const [accessionType, setAccessionType] = useState("");
	const [accessionKey, setAccessionKey] = useState("");
	const [comment, setComment] = useState("");
	const [isLoading, setLoding] = useState(false);
	

	const [errorMessage, setErrorMessage] = useState({
		accessionType: null,
		accessionKey: null,
		comment: null,
	});
	const [isError, setIsError] = useState({
		accessionType: false,
		accessionKey: false,
		comment: false,
	});

	// const checkDepartmentName = (str) => {
	// 	let res = str.match(/^[A-Za-z/ /]+$/) ? false : true;
	// 	// console.log(res);
	// 	return res;
	// };

	const validation = () => {
		if (accessionType === "") {
			setIsError({ accessionType: true });
			setErrorMessage({ accessionType: "Accession type is required" });
			return false;
		}
		else if (accessionKey.trim().length === 0) {
			setIsError({ accessionKey: true });
			setErrorMessage({ accessionKey: "Accession key is required" });
			return false;
		}
		else if (comment.trim().length === 0) {
			setIsError({ comment: true });
			setErrorMessage({ comment: "Comment is required" });
			return false;
		}
		return true;
	};

	const saveAccessionType = () => {
		if (validation()) {
			let obj = {
				accession_id: 1,
				accession_key: accessionKey,
				accession_type: accessionType,
				comment: comment,
			};
			console.log("hello savbshsd", obj);
			setLoding(true);
			createAccessionType(obj)
				.then((res) => {
					console.log(
						"<<<<-----hello show me the response that accesion data added or not ??? --->>>>",
						res
					);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setLoding(false);
					navigation.goBack();
					Alert.alert("Accession Type added successfully");
				});
			setAccessionKey("");
			setAccessionType("");
			setComment("");
			setIsError("");
			setErrorMessage("");
		}
	};

	const getFullAccessData = (item) => {
        const accessdata = item.id
        setAccessionType(accessdata)
        // console.log("************", accessionType);
    }

	return (
		<>
			{isLoading ? (
				<Loader loaderSize="lg" />
			) : (
				<CustomForm
					header={true}
					title={"Accession Type"}
					onPress={saveAccessionType}
				>
                <NewDropdown
                    title="Accession Type"
                    data={items}
                    afterPressDropdown={getFullAccessData}
                    errors={errorMessage.accessionType}
                    isError={isError.accessionType}
                />					

					<InputBox
						inputLabel={"Accession Key"}
						placeholder={"Enter Accession Key"}
						onChange={(val) => setAccessionKey(val)}
						value={accessionKey}
						errors={errorMessage.accessionKey}
						isError={isError.accessionKey}
						keyboardType={"alpha"}
					/>
					<InputBox
						inputLabel={"Comment"}
						placeholder={"Enter Comment"}
						onChange={(val) => setComment(val)}
						value={comment}
						errors={errorMessage.comment}
						isError={isError.comment}
						keyboardType={"alpha"}
					/>
				</CustomForm>
			)}
		</>
	);
};

export default AddAccession;


{/* <FormControl.Label
						_text={{ fontWeight: "400" }}
						style={styles.Label}
					>
						Accession Type
					</FormControl.Label>
					<Select
						selectedValue={accessionType}
						minWidth="200"
						accessibilityLabel="Select Accession type"
						placeholder="Select Accession type"
						mt={1}
						onValueChange={(itemValue) => setAccessionType(itemValue)}
					>
						<Select.Item label="Yes" value={1} />
						<Select.Item label="No" value={0} />
					</Select>
					{isError.accessionType ? (
						<Text style={{ color: "red", fontSize: 12 }}>
							{errorMessage.accessionType}
						</Text>
					) : null} */}