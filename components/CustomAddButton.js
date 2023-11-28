import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Fonts } from "../constants/Styles";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomAddButton = ({ itemData, from, setUpdated, setSubTotal }) => {
	const [count, setCount] = useState(0);
	const [Cartdata, setCartData] = useState([]);
	const [dataUpdated, setDataUpdated] = useState(null);
	const handleAdd = async () => {
		const value = await AsyncStorage.getItem("cartData");

		if (value !== null) {
			let tempcartData = JSON.parse(value);
			if (tempcartData.length) {
				let index = tempcartData.findIndex((item) => item.id == itemData.id);
				if (index !== -1) {
					tempcartData[index].count += 1;
					await AsyncStorage.setItem("cartData", JSON.stringify(tempcartData));
					setDataUpdated(Math.random());
					setUpdated(Math.random());
				} else {
					let doopArr = {
						id: itemData.id,
						title: itemData.title,
						price: itemData.price,
						image: itemData.thumbnail,
						count: 1,
					};
					tempcartData.push(doopArr);
					await AsyncStorage.setItem("cartData", JSON.stringify(tempcartData));
					setDataUpdated(Math.random());
					setUpdated(Math.random());
				}
			} else {
				let data = {
					id: itemData.id,
					title: itemData.title,
					price: itemData.price,
					image: itemData.thumbnail,
					count: 1,
				};
				await AsyncStorage.setItem("cartData", JSON.stringify([data]));
				setDataUpdated(Math.random());
				setUpdated(Math.random());
			}
		} else {
			let data = {
				id: itemData.id,
				title: itemData.title,
				price: itemData.price,
				image: itemData.thumbnail,
				count: 1,
			};
			await AsyncStorage.setItem("cartData", JSON.stringify([data]));
			setDataUpdated(Math.random());
			setUpdated(Math.random());
		}
	};

	const handleRemove = async () => {
		const value = await AsyncStorage.getItem("cartData");

		if (value !== null) {
			let tempcartData = JSON.parse(value);

			if (tempcartData.length) {
				let index = tempcartData.findIndex((item) => item.id === itemData.id);
				if (index !== -1) {
					tempcartData[index].count -= 1;
					if (tempcartData[index].count === 0) {
						tempcartData.splice(index, 1);
					}

					await AsyncStorage.setItem("cartData", JSON.stringify(tempcartData));
					setDataUpdated(Math.random());
					setUpdated(Math.random());
				}
			}
		}
	};

	useFocusEffect(
		useCallback(() => {
			const retrieveCartData = async () => {
				try {
					const value = await AsyncStorage.getItem("cartData");
					if (value !== null) {
						let tempcartData = JSON.parse(value);
						if (from !== "details") {
							let tempSubTotal = tempcartData.reduce(
								(acc, item) => acc + item.count * item.price,
								0
							);
							setSubTotal(tempSubTotal);
						}
						if (tempcartData.length) {
							let index = tempcartData.findIndex(
								(item) => item.id == itemData.id
							);
							if (index !== -1) {
								let data = tempcartData[index];
								setCartData([data]);
								setCount(data.count);
							} else {
								setCartData([]);
							}
						} else {
							setCartData([]);
						}
					} else {
						console.log("Value does not exist in AsyncStorage.");
					}
				} catch (error) {
					console.error("Error retrieving data:", error);
				}
			};
			retrieveCartData();
		}, [dataUpdated])
	);
	return Cartdata.length > 0 ? (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				...(from === "details" ? styles.detailsSection : {}),
			}}>
			<TouchableOpacity onPress={() => handleRemove()}>
				<Image source={require("../assets/images/remove.png")} />
			</TouchableOpacity>
			<Text style={{ marginHorizontal: 8, ...Fonts.regularName }}>{count}</Text>
			<TouchableOpacity onPress={() => handleAdd()}>
				<Image source={require("../assets/images/add.png")} />
			</TouchableOpacity>
		</View>
	) : (
		<TouchableOpacity
			activeOpacity={0.6}
			style={from === "details" ? styles.addButtonDetail : styles.addButtonCart}
			onPress={() => handleAdd()}>
			<Text
				style={{
					...Fonts.priceButtonWithBorder,
				}}>
				Add To Cart
			</Text>
		</TouchableOpacity>
	);
};

export default CustomAddButton;

const styles = StyleSheet.create({
	addButtonDetail: {
		height: 56,
		width: 143,
		marginRight: 20,
		borderColor: "#2A4BA0",
		borderWidth: 2,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	addButtonCart: {
		height: 50,
		width: 100,
		borderColor: "#2A4BA0",
		borderWidth: 2,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
	},

	detailsSection: {
		height: 56,
		width: 143,
		marginRight: 20,
		borderColor: "#2A4BA0",
		borderWidth: 2,
		borderRadius: 20,
		justifyContent: "center",
	},
});
