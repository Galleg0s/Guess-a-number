import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Colors from "../constants/colors";

const GameOverScreen = ({ rounds, number, onGameRestart }) => {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>The game is over!</Text>
			<Text style={styles.round}>Number of rounds: {rounds} </Text>
			<Text style={styles.number}>Your number: {number} </Text>
			<View style={styles.restartButton}>
				<Button title="Restart the game" onPress={onGameRestart} color={Colors.darkOrange} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 30,
		color: Colors.yellow,
		textAlign: "center",
	},
	round: {
		marginTop: 20,
		fontSize: 18,
		color: Colors.yellow,
		textAlign: "center",
	},
	number: {
		marginTop: 10,
		fontSize: 18,
		color: Colors.yellow,
		textAlign: "center",
	},
	restartButton: {
		marginTop: 30,
	},
});

export default GameOverScreen;
