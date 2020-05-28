import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import { Typography } from "../components";

const Header = ({ title }) => {
	return (
		<View style={styles.header}>
			<Typography style={styles.title}>{title}</Typography>
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
