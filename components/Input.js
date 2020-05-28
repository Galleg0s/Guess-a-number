import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Colors from "../constants/colors";

const Input = ({ containerStyle, inputStyle, ...props }) => {
	return (
		<View style={{ ...styles.inputContainer, ...containerStyle }}>
			<TextInput style={{ ...inputStyle }} {...props} />
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.yellow,
		borderRadius: 4,
	},
});
