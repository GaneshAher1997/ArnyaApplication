// Created by -->> Sharad Yaduvanshi  //
// date --->>  24/02/023   //
// this is scanner page ---> //

import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	BackHandler
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
// import Lottie from "lottie-react-native";
import { useIsFocused } from '@react-navigation/native';

const windowScreenWidth = Dimensions.get("screen").width;
const windowScreenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const QRCodeScanner = ({route}) => {

	const isFocused = useIsFocused();

	// const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(true);
	const [text, setText] = useState("Not started yet");
	const navigation = useNavigation();

	const askForCameraScanner = () => {
		(async () => {
			// const { status } = await BarCodeScanner.requestPermissionsAsync();	
			BarCodeScanner.requestPermissionsAsync()
				.then((result) => {
					if (result.status === "granted") { 
						setScanned(true);
					} else {
						Alert.alert("Please give the permission");
					}
				})
				.catch((error) => console.log(error));
			// setHasPermission(status === "granted");
			// console.log({status});
			// setScanned(true);
		})();
	};


	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
		return () => {
			backHandler.remove()
		}
	  }, [])

	useEffect(() => {
		askForCameraScanner();
	}, [isFocused]);



	const handleBarCodeScanner = ({ type, data }) => {
		setText(data);
		setScanned(false);
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
		console.log("type: " + type + "\ndata: " + data);
		// gotoBack();
		// navigation.navigate("BottomTabNav",{data});
	};

	const gotoBack = () => {
		setScanned(false);
		// navigation.push("Home");
		navigation.goBack();
		console.log("cancle");
	};


	// useEffect(() => {
	// 	const getBarCodeScannerPermissions = async () => { 
	// 	  const { status } = await BarCodeScanner.requestPermissionsAsync();
	// 	  setHasPermission(status === 'granted');
	// 	};
	// 	getBarCodeScannerPermissions();
	//   }, []);
	// if (hasPermission === null) {
	// 	return (
	// 		<View>
	// 			<Text>Requesting for camera permission</Text>
	// 		</View>
	// 	);
	// }

	// if (hasPermission === false) {
	// 	return (
	// 		<View>
	// 			<Text>No access to camera</Text>
	// 			<Button />
	// 			title={"Allow camera"} onPress={() => askForCameraScanner()}
	// 		</View>
	// 	);
	// }




	return (
		<View style={Styles.container}>
			<View>
				<Text style={{ fontSize: 36, color: "white", top: "60%" }}>
					Scanning...
				</Text>
			</View>
			<View
				style={{
					alignItems: "center",
					marginTop: "auto",
					marginBottom: "auto",
					width: windowWidth,
					height: "100%",
				}}
			>
				<View style={[Styles.container1]}>
					<View style={Styles.child1}></View>
					<View style={Styles.child2}></View>
				</View>

				<View style={Styles.qrCodeSacnBox}>
					<View style={Styles.line} />
					{scanned ?
						<BarCodeScanner
							onBarCodeScanned={handleBarCodeScanner}
							style={{ width: 450, height: 500 }}
						/>
						: null}
				</View>

				<View style={[Styles.container2]}>
					<View style={Styles.child3}></View>
					<View style={Styles.child4}></View>
				</View>
			</View>
			<TouchableOpacity style={Styles.cancelButtonText} onPress={() => navigation.push("Home")}>
				<Text
					style={{
						fontSize: 60,
						color: "white",
					}}
				>
					x
				</Text>
			</TouchableOpacity>
			
		</View>
	);
};

export default QRCodeScanner;

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		// borderWidth: 1,
		// borderColor: "red",
		alignItems: "center",
		backgroundColor: "#24595F",
		justifyContent: "space-around",
	},
	container1: {
		width: "80%",
		flex: 1 / 2,
		justifyContent: "space-between",
		flexDirection: "row",
		position: "absolute",
		alignItems: "center",
		top: "24%",
	},
	container2: {
		width: "80%",
		flex: 1 / 2,
		justifyContent: "space-between",
		flexDirection: "row",
		// position: "absolute",
		top: "63%",
		alignItems: "center",
	},
	line: {
		width: "100%",
		zIndex: 1,
		justifyContent: "center",
		flexDirection: "row",
		position: "absolute",
		alignItems: "center",
		borderTopWidth: 1.5,
		borderColor: "#99aaff",
	},
	child1: {
		width: 100,
		height: 100,
		borderLeftWidth: 2.5,
		borderTopWidth: 2.5,
		borderTopLeftRadius: 50,
		borderColor: "#6680FF",
	},
	child2: {
		width: 100,
		height: 100,
		borderTopWidth: 2.5,
		borderRightWidth: 2.5,
		borderTopRightRadius: 50,
		borderColor: "#6680FF",
	},
	child3: {
		width: 100,
		height: 100,
		borderBottomWidth: 2.5,
		borderLeftWidth: 2.5,
		borderBottomLeftRadius: 50,
		borderColor: "#6680FF",
	},
	child4: {
		width: 100,
		height: 100,
		borderBottomWidth: 2.5,
		borderRightWidth: 2.5,
		borderBottomRightRadius: 50,
		borderColor: "#6680FF",
	},

	qrCodeSacnBox: {
		width: Math.floor((windowWidth * 68) / 100),
		height: Math.floor((windowWidth * 68) / 100),
		// borderWidth: 1,
		borderColor: "white",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		borderRadius: 30,
		position: "absolute",
		zIndex: 1,
		top: "26.3%",
	},

	cancelButtonText: {
		width: 100,
		height: 100,
		fontSize: 75,
		fontWeight: "100",
		bottom: "10%",
		alignItems: "center",
		justifyContent: "center",
	},
});