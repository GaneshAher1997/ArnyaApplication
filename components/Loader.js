import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Modal } from "react-native";

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.6)",
	},
	modalBody: {
		alignItems: "center",
	},
	loadingText: {
		lineHeight: 50,
		color: "tomato",
	},
});

const loaderColor = [
	'red',
	'tomato',
	'orange',
	'yellow',
	'teal',
	'green',
	'cyan ',
	'royalblue',
	'blue',
	'purple',
	'pink',
	'red'
]

const Loader = (props) => {

	const [value, setValue] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setValue((v) => (v === 10 ? 0 : v + 1));
		}, 1000);
	}, []);


	return (
		<Modal
			animationType="fade"
			transparent={true}
			statusBarTranslucent={true}
			visible={props.visible}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalBody}>
					<ActivityIndicator size="large" color={loaderColor[value]} />
				</View>
			</View>
		</Modal>
	)
};

export default Loader;
