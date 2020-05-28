import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import Colors from "../constants/colors";

const generateValueBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	const randomValue = Math.floor(Math.random() * (max - min)) + min;

	if (randomValue === exclude) {
		return generateValueBetween(min, max, exclude);
	} else {
		return randomValue;
	}
};

const GameScreen = ({ selectedNumber, onGameOver }) => {
	const [currentGuess, setCurrentGuess] = useState(generateValueBetween(1, 100, selectedNumber));
	let [rounds, setRounds] = useState(0);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		if (currentGuess === selectedNumber) {
			onGameOver(rounds);
		}
	}, [currentGuess, selectedNumber, onGameOver]);

	const nextGuessHandler = direction => {
		if (
			(direction === "Lower" && currentGuess < selectedNumber) ||
			(direction === "Greater" && currentGuess > selectedNumber)
		) {
			Alert.alert("Don't lie", "You know that this is wrong...", [
				{
					text: "Sorry!",
					style: "cancel",
				},
			]);
			return;
		} else if (direction === "Lower") {
			currentHigh.current = currentGuess;
		} else if (direction === "Greater") {
			currentLow.current = currentGuess;
		}

		const nextNumber = generateValueBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setRounds(rounds => rounds + 1);
	};

	return (
		<View style={styles.screen}>
			<View>
				<Text style={styles.title}>Opponent guess:</Text>
				<Text style={styles.number}>{currentGuess}</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<Button title="Lower" color={Colors.orange} onPress={nextGuessHandler.bind(this, "Lower")} />
				<Button title="Greater" color={Colors.darkOrange} onPress={nextGuessHandler.bind(this, "Greater")} />
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
		fontSize: 22,
		color: Colors.yellow,
		textAlign: "center",
	},
	number: {
		marginTop: 20,
		fontSize: 20,
		color: Colors.yellow,
		textAlign: "center",
		padding: 10,
		borderWidth: 1,
		borderColor: Colors.yellow,
		borderRadius: 4,
	},
	buttonsContainer: {
		width: "80%",
		maxWidth: 300,
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-around",
	},
});

export default GameScreen;
