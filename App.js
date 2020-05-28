import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "./components";
import { StartGameScreen, GameScreen, GameOverScreen } from "./screens";
import Colors from "./constants/colors";

const App = () => {
	const [guessedNumber, setGuessedNumber] = useState(null);
	let [rounds, setRounds] = useState(0);

	const handleStartButtonClick = selectedNumber => {
		setGuessedNumber(selectedNumber);
		setRounds(0);
	};

	const handleGameRestart = () => {
		setGuessedNumber(null);
		setRounds(0);
	};

	const handleGameOver = numOfRounds => setRounds(numOfRounds);
	let activeScreen = <StartGameScreen onStartButtonClick={handleStartButtonClick} />;

	if (guessedNumber && rounds <= 0) {
		activeScreen = <GameScreen selectedNumber={guessedNumber} onGameOver={handleGameOver} />;
	} else if (rounds > 0) {
		activeScreen = <GameOverScreen rounds={rounds} number={guessedNumber} onGameRestart={handleGameRestart} />;
	}

	return (
		<View style={styles.container}>
			<Header title="Guess a number" />
			{activeScreen}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightGreen,
	},
});

export default App;
