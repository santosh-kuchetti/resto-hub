import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, Text, View } from "react-native";
import Bottombar from "./screens/Bottombar";
import { useFonts } from "expo-font";

LogBox.ignoreAllLogs();

export default function App() {
	const [loaded] = useFonts({
		manropeBold: require("./assets/fonts/Manrope-Bold.ttf"),
		manropeExtraBold: require("./assets/fonts/Manrope-ExtraBold.ttf"),
		manropeExtraLight: require("./assets/fonts/Manrope-ExtraLight.ttf"),
		manropeLight: require("./assets/fonts/Manrope-Light.ttf"),
		manropeMedium: require("./assets/fonts/Manrope-Medium.ttf"),
		manropeRegular: require("./assets/fonts/Manrope-Regular.ttf"),
		manropeSemiBold: require("./assets/fonts/Manrope-SemiBold.ttf"),
  });
  if (!loaded) {
    return null
  }
	return (
		<View style={styles.container}>
			<StatusBar translucent={true} backgroundColor="transparent"/>
			<Bottombar />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
