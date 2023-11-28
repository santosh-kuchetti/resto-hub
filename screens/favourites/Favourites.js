import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Fonts } from "../../constants/Styles";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Favourites = () => {
	const [cartData, setCartData] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const fetchFavorites = async () => {
				try {
					const storedData = await AsyncStorage.getItem("favoritesData");
					if (storedData !== null) {
						let data = JSON.parse(storedData);
						setCartData(data);
					}
				} catch (error) {
					console.error("Error fetching favorites:", error);
				}
			};
			fetchFavorites();
		}, [])
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

	function favourites() {
		const renderItem = ({ item, index }) => {
			return (
				<>
					<View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginHorizontal: 20,
							}}>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Image
									source={{ uri: item?.thumbnail }}
									style={{ marginRight: 20, height: 30, width: 30 }}
								/>
								<View>
									<Text style={{ ...Fonts.regularName }}>{item.title}</Text>
									<Text
										style={{
											...Fonts.priceRecommand,
										}}>{`$${item.price}`}</Text>
								</View>
							</View>
						</View>
						<View
							style={{
								height: 1,
								backgroundColor: "#EBEBFB",
								marginHorizontal: 20,
								marginVertical: 20,
							}}></View>
					</View>
				</>
			);
		};
    return cartData.length ? (
			<FlatList
				data={cartData || []}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.container}
			/>
		) : (
			<View style={{ flex: 1, alignItems: "center",justifyContent:"center" }}>
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
