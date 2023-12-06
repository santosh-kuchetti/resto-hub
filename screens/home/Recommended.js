import {
	ActivityIndicator,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Fonts } from "../../constants/Styles";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debouncedFetchData, fetchData } from "../../utils/gettingData";
import debounce from "lodash/debounce";

const Recommended = ({ navigation, searchValue, from }) => {
	const [productsData, setProductsData] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);

	useFocusEffect(
		useCallback(() => {
			const fetchProducts = async () => {
				try {
					let products;
					if (from == "search") {
						products = await debouncedFetchData();
					} else {
						products = await fetchData();
					}
					if (from == "search") {
						if (searchValue == "") {
							setProductsData([]);
							return;
						} else {
							let data = products?.data?.products.filter((item) =>
								item.title.toLowerCase().includes(searchValue.toLowerCase())
							);
							setProductsData(data || []);
							return;
						}
					} else {
						setProductsData(products?.data?.products || []);
					}
				} catch (error) {
					console.error("Error fetching products:", error);
				} finally {
					setLoading(false);
				}
			};
			fetchProducts();

			const fetchFavorites = async () => {
				try {
					const storedData = await AsyncStorage.getItem("favoritesData");
					const favoritesData = storedData ? JSON.parse(storedData) : [];
					setFavorites(favoritesData);
				} catch (error) {
					console.error("Error fetching favorites:", error);
				}
			};
			fetchFavorites();
		}, [from, searchValue])
	);

	const handleHeartClick = async (item) => {
		try {
			const isFavorite = favorites.some((favItem) => favItem.id === item.id);

			let updatedFavorites;
			if (isFavorite) {
				updatedFavorites = favorites.filter(
					(favItem) => favItem.id !== item.id
				);
			} else {
				updatedFavorites = [...favorites, item];
			}

			await AsyncStorage.setItem(
				"favoritesData",
				JSON.stringify(updatedFavorites)
			);
			setFavorites(updatedFavorites);
			setProductsData([...productsData]);
		} catch (error) {
			console.error("Error handling heart click:", error);
		}
	};

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<TouchableOpacity onPress={() => handleHeartClick(item)}>
				<Image
					source={
						favorites.some((favItem) => favItem.id === item.id)
							? require("../../assets/images/redHeart.png")
							: require("../../assets/images/Heart.png")
					}
					style={styles.favoriteImage}
				/>
			</TouchableOpacity>
			<Image
				source={{ uri: item?.thumbnail }}
				style={styles.itemImage}
			/>
			<View style={styles.details}>
				<Text style={{ ...Fonts.priceRecommand }}>{`$${item?.price}`}</Text>
				<Text style={{ ...Fonts.nameRecommand }}>{item?.title}</Text>
			</View>
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.add}
				onPress={() => navigation.push("ItemDetails", { itemData: item })}>
				<Image
					source={require("../../assets/images/addToCart.png")}
					style={{ height: 24, width: 24 }}
				/>
			</TouchableOpacity>
		</View>
	);
	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator
					size="large"
					color="#2A4BA0"
				/>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				marginTop: 20,
				marginHorizontal: 20,
			}}>
			{from !== "search" && (
				<Text style={{ ...Fonts.headingRecommand }}>Recommended</Text>
			)}
			<FlatList
				data={productsData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				numColumns={2}
				contentContainerStyle={styles.container}
			/>
		</View>
	);
};

export default Recommended;

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		paddingHorizontal: 8,
	},
	itemContainer: {
		width: 160,
		height: 194,
		backgroundColor: "#F8F9FB",
		marginRight: 15,
		marginTop: 22,
		borderRadius: 12,
	},
	itemImage: {
		position: "absolute",
		height: 68,
		width: 68,
		top: 20,
		left: 43,
	},
	favoriteImage: {
		position: "absolute",
		top: 13,
		left: 13,
		height: 14,
		width: 14,
	},
	details: {
		position: "absolute",
		top: 134,
		left: 17,
	},
	add: {
		position: "absolute",
		top: 134,
		right: 17,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	loadingContainer: {
		flex: 1,
		alignItems: "center",
	},
});
