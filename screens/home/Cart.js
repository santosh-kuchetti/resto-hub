import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = ({ from, update, navigation }) => {
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
		}, [update])
	);

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigation.push("Cart", { Cartdata: Cartdata })}>
			<Image
				source={require("../../assets/images/bag.png")}
				style={{ tintColor: from == "details" && "#1E222B" }}
			/>

			<View style={styles.overlay}>
				<View style={styles.cart}>
					<Image
						source={require("../../assets/images/Ellipse.png")}
						style={{ height: 30, width: 30 }}
					/>
					<Text style={styles.numberText}>{count}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Cart;

const styles = StyleSheet.create({
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
	details: {
		tintColor: "#1E222B",
	},
});
