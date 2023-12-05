import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { Image } from "react-native";
import { Fonts } from "../../constants/Styles";

const FavouriteItem = ({
	item,
	index,
	cartData,
	setCartData,
	handleDataChange,
}) => {
	const swipeRef = useRef();

	const renderRight = () => {
		return (
			<TouchableOpacity
				style={{
					height: 50,
					width: 50,
					backgroundColor: "red",
					justifyContent: "center",
					alignItems: "center",
				}}
				onPress={() => {
                    handleDataChange(item?.id);
					swipeRef.current.close();
				}}>
				<Image
					source={require("../../assets/images/delete.png")}
					style={{ tintColor: "#fff" }}
				/>
			</TouchableOpacity>
		);
	};

	const handleOpen = (index) => {
		let temp = cartData;
		let mapData = temp.map((item, ind) => {
			if (ind == index) {
				item.open = true;
			} else {
				item.open = false;
			}
			return item;
		});
		let tempData = [...mapData];
		setCartData(tempData);
	};

	useEffect(() => {
		if (item.open == false) {
			swipeRef.current.close();
		}
	});

	return (
		<Swipeable
			ref={swipeRef}
			renderRightActions={renderRight}
			onSwipeableOpen={() => handleOpen(index)}>
			<>
				<View style={{ height: 60, backgroundColor: "#fff" }}>
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
		</Swipeable>
	);
};

export default FavouriteItem;

const styles = StyleSheet.create({});
