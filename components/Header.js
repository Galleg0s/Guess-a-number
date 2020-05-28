import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

const Header = ({ title }) => {
	return (
		<View style={styles.header}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 90,
		paddingVertical: 20,
		backgroundColor: Colors.darkGreen,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 25,
		color: Colors.yellow,
		textTransform: "uppercase",
	},
});

export default Header;
