import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Fonts } from "../../constants/Styles";
import Swiper from "react-native-swiper";
import CustomAddButton from "../../components/CustomAddButton";
import Cart from "../home/Cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const ItemDetails = ({ navigation, route }) => {
	const itemData = route?.params?.itemData;
	const [updated, setUpdated] = useState(null);
	const [favoritesData, setFavoritesData] = useState([]);
  const [isFavorite, setIsFavorite] = useState();
  
  const toggleFavorite = async () => {
		try {
			const storedData = await AsyncStorage.getItem("favoritesData");
			const existingFavorites = storedData ? JSON.parse(storedData) : [];
			const index = existingFavorites.findIndex(
				(favItem) => favItem.id === itemData.id
			);

			if (index !== -1) {
				existingFavorites.splice(index, 1);
			} else {
				existingFavorites.push(itemData);
			}
			await AsyncStorage.setItem(
				"favoritesData",
				JSON.stringify(existingFavorites)
			);
			setFavoritesData(existingFavorites);
			setIsFavorite(index === -1);
		} catch (error) {
			console.error("Error toggling favorite:", error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			const fetchFavorites = async () => {
				try {
					const storedData = await AsyncStorage.getItem("favoritesData");
					const favoritesData = storedData ? JSON.parse(storedData) : [];
					const isFavorite = favoritesData.some(
						(favItem) => favItem.id === itemData.id
          );
					setIsFavorite(isFavorite);
					setFavoritesData(favoritesData);
				} catch (error) {
					console.error("Error fetching favorites:", error);
				}
			};
			fetchFavorites();
		}, [itemData?.id])
	);

	function header(navigation) {
		return (
			<View style={styles.header}>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => navigation.pop()}>
					<Image source={require("../../assets/images/back.png")} />
				</TouchableOpacity>
				<Cart
					from="details"
					update={updated}
					navigation={navigation}
				/>
			</View>
		);
	}

	function title(title, brand) {
		return (
			<View style={styles.title}>
				<Text style={{ ...Fonts.headerTitle }}>{title}</Text>
				<Text style={{ ...Fonts.headerTitleBold }}>{brand}</Text>
				<View style={{ flexDirection: "row", marginTop: 14 }}>
					<Image source={require("../../assets/images/stars.png")} />
					<Text style={{ ...Fonts.nameRecommand, marginLeft: 10 }}>
						110 Reviews
					</Text>
				</View>
			</View>
		);
	}

	function carousel(imageUrls) {
		return (
			<View style={{ ...styles.wrapper, top: 281 }}>
				<Swiper
					dotStyle={{ opacity: 0 }}
					activeDotStyle={{ opacity: 0 }}>
					{imageUrls.map((url, index) => (
						<View
							key={index}
							style={styles.slide}>
							<Image
								style={styles.image}
								source={{ uri: url }}
							/>
							<View style={styles.heartContainer}>
								<TouchableOpacity
								onPress={toggleFavorite}
								>
									<Image
										source={
											isFavorite
												? require("../../assets/images/redHeart.png")
												: require("../../assets/images/Heart.png")
										}
										style={styles.heartIcon}
									/>
								</TouchableOpacity>
							</View>
							<View style={styles.dotContainer}>
								{imageUrls.map((data, i) => (
									<Image
										source={require("../../assets/images/slide1.png")}
										key={i}
										style={i === index ? styles.activeDotText : styles.dotText}
									/>
								))}
							</View>
						</View>
					))}
				</Swiper>
			</View>
		);
	}

	function discount(price, discountPercentage) {
		let discount = (discountPercentage / 100) * price;

		return (
			<View style={styles.discount}>
				<Text
					style={{
						...Fonts.HeadingMedium,
					}}>{`$${discount.toFixed(2)} OFF`}</Text>
			</View>
		);
	}

	function buttons(item) {
		return (
			<View style={styles.buttonContainer}>
				{/* <TouchableOpacity
				activeOpacity={0.6}
				style={styles.addButton}>
				<Text
					style={{
						...Fonts.priceButtonWithBorder,
					}}>
					Add To Cart
				</Text>
			</TouchableOpacity> */}
				<CustomAddButton
					itemData={item}
					from="details"
					setUpdated={setUpdated}
				/>
				<TouchableOpacity
					style={styles.buyButton}
					activeOpacity={0.8}>
					<Text
						style={{
							...Fonts.priceButton,
						}}>
						Buy Now
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	function details(description) {
		return (
			<View style={styles.detailsContainer}>
				<Text
					style={{
						...Fonts.regularHeading,
					}}>
					Details
				</Text>
				<Text
					style={{
						...Fonts.regularDescription,
					}}>
					{description}
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.detailsWrapper}>
			{header(navigation)}
			{title(itemData.title, itemData.brand)}
			{carousel(itemData.images)}
			{discount(itemData.price, itemData.discountPercentage)}
			{buttons(itemData)}
			{details(itemData.description)}
		</View>
	);
};

export default ItemDetails;

const styles = StyleSheet.create({
	detailsContainer: {
		position: "absolute",
		top: 654,
		marginHorizontal: 20,
	},
	buttonContainer: {
		position: "absolute",
		top: 568,
		marginHorizontal: 20,
		flexDirection: "row",
	},
	addButton: {
		height: 56,
		width: 143,
		marginRight: 20,
		borderColor: "#2A4BA0",
		borderWidth: 2,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	buyButton: {
		height: 56,
		width: 143,
		backgroundColor: "#2A4BA0",
		marginRight: 20,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	discount: {
		position: "absolute",
		height: 24,
		width: 84,
		backgroundColor: "#2A4BA0",
		marginHorizontal: 20,
		top: 514,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 4,
	},
	detailsWrapper: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	header: {
		marginTop: 52,
		marginHorizontal: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
	container: {
		position: "relative",
	},
	overlay: {
		position: "absolute",
		right: -13,
		top: -10,
	},
	cart: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	numberText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
		top: -24,
	},
	title: {
		position: "absolute",
		left: 20,
		top: 106,
	},
	wrapper: {
		position: "absolute",
		top: 281,
		left: 0,
		right: 0,
		height: 207,
	},
	slide: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		flex: 1,
		height: 207,
		width: "100%",
		resizeMode: "contain",
	},
	dotContainer: {
		flexDirection: "row",
		position: "absolute",
		bottom: 20,
		left: 20,
	},
	dot: {
		backgroundColor: "rgba(255,255,255,0.3)",
		width: 8,
		height: 8,
		borderRadius: 4,
		margin: 3,
	},
	activeDot: {
		backgroundColor: "#fff",
		width: 10,
		height: 10,
		borderRadius: 5,
		margin: 3,
	},
	dotText: {
		tintColor: "#F8F9FB",
		marginHorizontal: 5,
	},
	activeDotText: {
		tintColor: "#F9B023",
		marginHorizontal: 5,
	},
	heartContainer: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 20,
	},
	heartIcon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
	},
});
