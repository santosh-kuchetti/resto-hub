import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Fonts } from "../../constants/Styles";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavouriteItem from "./FavouriteItem";

const Favourites = () => {
	const [cartData, setCartData] = useState([]);
	const [datachange, setDataChange] = useState(null);

	useFocusEffect(
		useCallback(() => {
			const fetchFavorites = async () => {
				try {
					const storedData = await AsyncStorage.getItem("favoritesData");
					if (storedData !== null) {
						let data = JSON.parse(storedData);
						let dataAdded = data.map((item) => {
							item["open"] = false;
							return item;
						});
						setCartData(dataAdded);
					}
				} catch (error) {
					console.error("Error fetching favorites:", error);
				}
			};
			fetchFavorites();
		}, [datachange])
	);

	function header() {
		return (
			<View style={styles.header}>
				<Text
					style={{
						...Fonts.regularHeading,
					}}>
					Favourites
				</Text>
			</View>
		);
	}

	const handleDataChange = async (id) => {
		const storedData = await AsyncStorage.getItem("favoritesData");
		if (storedData !== null) {
			let index = storedData.indexOf(id);
			if (index !== -1) {
				let data = JSON.parse(storedData);
				let modifiedData = data.filter((item) => item.id !== id);
				await AsyncStorage.setItem(
					"favoritesData",
					JSON.stringify(modifiedData)
				);
			}
		}
		setDataChange(Math.random());
	};

	function favourites() {
		return cartData.length ? (
			<FlatList
				data={cartData || []}
				keyExtractor={(item) => item.id}
				renderItem={({ item, index }) => (
					<FavouriteItem
						item={item}
						index={index}
						cartData={cartData}
						setCartData={setCartData}
						handleDataChange={handleDataChange}
					/>
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.container}
			/>
		) : (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text style={{ ...Fonts.empty }}>Favourites not added</Text>
			</View>
		);
	}
	return (
		<View style={{ flex: 1, backgroundColor: "#fff" }}>
			{header()}
			{favourites()}
		</View>
	);
};

export default Favourites;

const styles = StyleSheet.create({
	header: {
		marginTop: 52,
		marginBottom: 40,
		marginHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
	},
});
