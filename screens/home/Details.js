import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Fonts } from "../../constants/Styles";
import { Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cart from "./Cart";

const Details = ({ navigation }) => {

	function header() {
		const [count, setCount] = useState(0);
		const [Cartdata, setCartData] = useState([]);
		useFocusEffect(
			useCallback(() => {
				const retrieveCartData = async () => {
					try {
						const value = await AsyncStorage.getItem("cartData");
						if (value !== null) {
							let tempcartData = JSON.parse(value);

							if (tempcartData.length) {
								let totalCount = tempcartData.reduce(
									(acc, item) => acc + item.count,
									0
								);
								setCount(totalCount);
								setCartData(tempcartData);
							} else {
								setCount(0);
								setCartData([]);
							}
						} else {
							setCount(0);
							setCartData([]);
							console.log("Value does not exist in AsyncStorage.");
						}
					} catch (error) {
						console.error("Error retrieving data:", error);
					}
				};
				retrieveCartData();
			}, [])
		);
		return (
			<View style={styles.header}>
				<Text style={{ ...Fonts.Heading1 }}>Hey, Rahul</Text>
				<Cart navigation={navigation} />
			</View>
		);
	}

	function search() {
		return (
			<View style={styles.searchContainer}>
				<View style={styles.innerContainer}>
					<Image
						source={require("../../assets/images/search.png")}
						style={styles.searchIcon}
					/>
					<Text style={{ ...Fonts.HeadingLight }}>
						Search Products or store
					</Text>
				</View>
			</View>
		);
	}

	function DelivaryDetails() {
		return (
			<>
				<View style={styles.deliveryheader}>
					<Text style={{ ...Fonts.HeadingMediumGray }}>DELIVERY TO</Text>
					<Text style={{ ...Fonts.HeadingMediumGray }}>WITHIN</Text>
				</View>
				<View style={styles.deliveryheader}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={{ ...Fonts.HeadingMedium, marginRight: 10 }}>
							Green Way 3000, Sylhet
						</Text>
						<Image source={require("../../assets/images/arrowIocn.png")} />
					</View>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={{ ...Fonts.HeadingMedium, marginRight: 10 }}>
							1 Hour
						</Text>
						<Image source={require("../../assets/images/arrowIocn.png")} />
					</View>
				</View>
			</>
		);
	}

	return (
		<View style={styles.detailsWrapper}>
			{header()}
			{search()}
			{DelivaryDetails()}
		</View>
	);
};

export default Details;

const styles = StyleSheet.create({
	detailsWrapper: {
		height: 252,
		backgroundColor: "#2A4BA0",
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
		right: -18,
		top: -15,
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
		top: -26,
	},
	searchContainer: {
		height: 56,
		top: 35,
		marginHorizontal: 20,
		backgroundColor: "#153075",
		borderRadius: 28,
	},
	innerContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "start",
		marginLeft: 28,
	},
	searchIcon: {
		width: 24,
		height: 24,
		marginRight: 12,
	},
	deliveryheader: {
		top: 55,
		marginHorizontal: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		marginBottom: 5,
	},
});
