import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Header } from "./components";
import { StartGameScreen, GameScreen, GameOverScreen } from "./screens";
import Colors from "./constants/colors";

import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
	return Font.loadAsync({
		roboto: require("./assets/fonts/roboto.ttf"),
		"roboto-bold": require("./assets/fonts/robotobold.ttf"),
	});
};

const App = () => {
	const [loadedData, setLoadedData] = useState(false);
	const [guessedNumber, setGuessedNumber] = useState(null);
	let [rounds, setRounds] = useState(0);

	if (!loadedData) {
		return <AppLoading startAsync={fetchFonts} onFinish={setLoadedData.bind(this, true)} />;
	}

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
		<SafeAreaView style={styles.container}>
			<Header title="Guess a number" />
			{activeScreen}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightGreen,
	},
});

export default App;
