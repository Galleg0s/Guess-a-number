import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Colors from "../constants/colors";
import { Typography } from "../components";

const GameOverScreen = ({ rounds, number, onGameRestart }) => {
	return (
		<>
			<Image style={styles.image} source={require("../assets/success.png")} resizeMode="cover" />
			<View style={styles.screen}>
				<Typography style={{ ...styles.text, ...styles.title }}>The game is over!</Typography>
				<Typography style={{ ...styles.text, ...styles.round }}>
					Your phone needed
					<Typography fontStyle="bold"> {rounds} </Typography> rounds to guess the number
					<Typography fontStyle="bold"> {number}</Typography>
				</Typography>
				<View style={styles.restartButton}>
					<Button title="Restart the game" onPress={onGameRestart} color={Colors.darkOrange} />
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: Colors.darkGreen,
		textAlign: "center",
	},
	title: {
		fontSize: 30,
	},
	round: {
		marginTop: 20,
		fontSize: 18,
	},
	number: {
		marginTop: 10,
		fontSize: 18,
	},
	restartButton: {
		marginTop: 30,
	},
	image: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
});

export default GameOverScreen;
