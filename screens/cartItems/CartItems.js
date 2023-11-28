import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { Fonts } from "../../constants/Styles";
import Cart from "../home/Cart";
import CustomAddButton from "../../components/CustomAddButton";

const CartItems = ({ navigation, route }) => {
	const Cartdata = route?.params?.Cartdata;
	const [subTotal, setSubTotal] = useState();

	function header() {
		return (
			<View style={styles.header}>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => navigation.pop()}
					style={{ marginRight: 21 }}>
					<Image source={require("../../assets/images/back.png")} />
				</TouchableOpacity>
				<Text
					style={{
						...Fonts.regularHeading,
					}}>{`Shopping Cart (${Cartdata.length})`}</Text>
			</View>
		);
	}

	function details() {
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
									source={{ uri: item?.image }}
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
							<CustomAddButton
								itemData={item}
								from="cart"
								setSubTotal={setSubTotal}
							/>
						</View>
						<View
							style={{
								height: 1,
								backgroundColor: "#EBEBFB",
								marginHorizontal: 20,
								marginVertical: 20,
							}}></View>
					</View>
					{index === Cartdata.length - 1 && (
						<View style={{ alignItems: "flex-end", marginRight: 20 }}>
							<Text style={{ color: "#2A4BA0" }}>Edit</Text>
						</View>
					)}
				</>
			);
		};

		return (
			<FlatList
				data={Cartdata || []}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.container}
			/>
		);
	}

	function total() {
		if (Cartdata.length > 0) {
			return (
				<View style={styles.totalContainer}>
					<View style={{ top: 20 }}>
						<View style={styles.totalHeadings}>
							<Text style={{ ...Fonts.totalHeading }}>Subtotal</Text>
							<Text style={{ ...Fonts.regularName }}>${subTotal}</Text>
						</View>
						<View style={styles.totalHeadings}>
							<Text style={{ ...Fonts.totalHeading }}>Delivery</Text>
							<Text style={{ ...Fonts.regularName }}>$2</Text>
						</View>
						<View style={styles.totalHeadings}>
							<Text style={{ ...Fonts.totalHeading }}>Total</Text>
							<Text style={{ ...Fonts.regularName }}>${subTotal + 2}</Text>
						</View>
					</View>
					<TouchableOpacity
						style={styles.proceed}
						activeOpacity={0.8}>
						<Text style={{ ...Fonts.priceButton }}>Proceed To checkout</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1, alignItems: "center" }}>
					<Text style={{ ...Fonts.empty }}>Cart is empty</Text>
				</View>
			);
		}
	}
	return (
		<View style={{ flex: 1, backgroundColor: "#fff" }}>
			{header()}
			<View style={{ flex: 1 }}>{details()}</View>

			{total()}
		</View>
	);
};

export default CartItems;

const styles = StyleSheet.create({
	header: {
		marginTop: 52,
		marginBottom: 40,
		marginHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	totalContainer: {
		height: 230,
		backgroundColor: "#F8F9FB",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		marginHorizontal: 8,
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1,
	},
	totalHeadings: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 20,
		marginBottom: 13,
	},
	proceed: {
		height: 56,
		marginHorizontal: 16,
		backgroundColor: "#2A4BA0",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		top: 35,
	},
});
