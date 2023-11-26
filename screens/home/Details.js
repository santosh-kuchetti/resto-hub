import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fonts } from "../../constants/Styles";
import { Image } from "react-native";

const Details = () => {
	return (
		<View style={styles.detailsWrapper}>
			{header()}
			{search()}
			{DelivaryDetails()}
		</View>
	);
};

function header() {
	return (
		<View style={styles.header}>
			<Text style={{ ...Fonts.Heading1 }}>Hey, Rahul</Text>
			<View style={styles.container}>
				<Image
					source={require("../../assets/images/bag.png")}
					style={styles.image}
				/>
				<View style={styles.overlay}>
					<View style={styles.cart}>
						<Image source={require("../../assets/images/Ellipse.png")} />
						<Text style={styles.numberText}>3</Text>
					</View>
				</View>
			</View>
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
				<Text style={{ ...Fonts.HeadingLight }}>Search Products or store</Text>
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
					<Text style={{ ...Fonts.HeadingMedium, marginRight: 10 }}>1 Hour</Text>
					<Image source={require("../../assets/images/arrowIocn.png")} />
				</View>
			</View>
		</>
	);
}
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
		width: 24, // Adjust the width as needed
		height: 24, // Adjust the height as needed
		marginRight: 12, // Adjust the margin as needed
	},
	deliveryheader: {
		top: 55,
		marginHorizontal: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		marginBottom: 5,
	},
});
