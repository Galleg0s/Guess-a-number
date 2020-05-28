import React from "react";
import { Text } from "react-native";
import DefaultStyles from "../constants/default-styles";

const Typography = ({ style, fontStyle = "regular", children }) => {
	return <Text style={{ ...style, ...DefaultStyles[fontStyle] }}>{children}</Text>;
};

export default Typography;
