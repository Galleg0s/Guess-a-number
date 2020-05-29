import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, Alert, ScrollView } from "react-native";
import Colors from "../constants/colors";
import { Typography } from "../components";

const renderGuess = (guess, numberOfRound) => {
	return (
		<View
			style={{
				marginTop: 20,
				padding: 10,
				backgroundColor: Colors.darkGreen,
				fontSize: 16,
				flexDirection: "row",
				justifyContent: "space-around",
				borderRadius: 4,
			}}
			key={guess}
		>
			<Typography style={{ color: Colors.yellow }}>
				Round: <Typography fontStyle="bold">{numberOfRound}</Typography>
			</Typography>
			<Typography style={{ color: Colors.yellow }}>
				Guess: <Typography fontStyle="bold">{guess}</Typography>
			</Typography>
		</View>
	);
};

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
	const firstGuess = generateValueBetween(1, 100, selectedNumber);
	const [currentGuess, setCurrentGuess] = useState(firstGuess);
	let [guesses, setGuesses] = useState([firstGuess]);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		if (currentGuess === selectedNumber) {
			onGameOver(guesses.length);
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
			currentLow.current = currentGuess + 1;
		}

		const nextNumber = generateValueBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setGuesses(previousGuesses => [nextNumber, ...previousGuesses]);
	};

	return (
		<View style={styles.screen}>
			<View style={{ width: "80%", maxWidth: 300 }}>
				<Text style={styles.title}>Opponent guess:</Text>
				<Text style={styles.number}>{currentGuess}</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<Button title="Lower" color={Colors.orange} onPress={nextGuessHandler.bind(this, "Lower")} />
				<Button title="Greater" color={Colors.darkOrange} onPress={nextGuessHandler.bind(this, "Greater")} />
			</View>
			<View style={styles.guessList}>
				<ScrollView centerContent>
					{guesses.map((guess, index) => renderGuess(guess, guesses.length - index))}
				</ScrollView>
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
	guessList: { flex: 1, width: "80%", marginTop: 30 },
});

export default GameScreen;
