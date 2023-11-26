import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import Details from "./Details";
import Offers from "./Offers";

const Home = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<Details />
			<Offers />
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({});
