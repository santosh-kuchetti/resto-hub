import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import Details from "./Details";
import Offers from "./Offers";
import Recommended from "./Recommended";

const Home = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<FlatList
				ListHeaderComponent={
					<>
						<Details navigation={navigation} />
						<Offers navigation={navigation} />
						<Recommended navigation={navigation} />
					</>
				}
				// contentContainerStyle={{
				// 	paddingBottom: Sizes.fixPadding * 8.0,
				// 	paddingTop:
				// 		StatusBar.currentHeight +
				// 		Sizes.fixPadding * (Platform.OS == "ios" ? 7.0 : 2.0),
				// }}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({});
