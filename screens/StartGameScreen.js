import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Button,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	useWindowDimensions,
} from "react-native";
import Colors from "../constants/colors";
import { Typography } from "../components";
import { Input } from "../components";

const StartGameScreen = ({ onStartButtonClick }) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedValue] = useState(null);
	const windowWidth = useWindowDimensions().width;
	const windowHeight = useWindowDimensions().height;

	const handleTextChange = value => {
		setEnteredValue(value.replace(/[^0-9]/g, ""));
	};

	const handleConfirmButtonClick = enteredValue => {
		const choosenNumber = parseInt(enteredValue);
		const isValidNumber = isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99;

		if (isValidNumber) {
			Alert.alert("Invalid number!", "Number has to be a number between 1 and 99", [
				{
					text: "OK",
					onPress: handleResetButtonClick,
				},
			]);
			return;
		}

		setConfirmed(true);
		setSelectedValue(parseInt(enteredValue));
		setEnteredValue("");
		Keyboard.dismiss();
	};

	const handleResetButtonClick = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<Typography style={styles.title}>Enter a number</Typography>
				<Input
					onChangeText={handleTextChange}
					value={enteredValue}
					maxLength={2}
					placeholder="between 1 to 99"
					keyboardType="number-pad"
					textAlign="center"
					blurOnSubmit
					containerStyle={styles.inputContainer}
					inputStyle={styles.input}
				/>
				<View style={styles.buttonsContainer}>
					<View style={{ width: windowWidth / 4 }}>
						<Button
							onPress={handleConfirmButtonClick.bind(this, enteredValue)}
							title="Confirm"
							color={Colors.orange}
						/>
					</View>

					<View style={{ width: windowWidth / 4 }}>
						<Button onPress={handleResetButtonClick} title="Reset" color={Colors.darkOrange} />
					</View>
				</View>

				{confirmed && (
					<View>
						<Typography style={styles.confirmedMessage}>
							<Text>Confirmed number is</Text> <Typography fontStyle="bold">{selectedNumber}</Typography>
						</Typography>
						<View style={styles.confirmedButton}>
							<Button
								onPress={() => onStartButtonClick(selectedNumber)}
								title="Start game!"
								color={Colors.yellow}
							/>
						</View>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
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
	},
	inputContainer: {
		marginTop: 20,
		width: "80%",
		maxWidth: 500,
		minWidth: 300,
		padding: 10,
		color: "red",
	},
	input: {
		color: Colors.yellow,
		fontSize: 20,
	},
	buttonsContainer: {
		width: "80%",
		maxWidth: 500,
		minWidth: 300,
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	confirmedMessage: {
		marginTop: 40,
		fontSize: 18,
		color: Colors.yellow,
	},
	confirmedButton: {
		marginTop: 10,
	},
});

export default StartGameScreen;
