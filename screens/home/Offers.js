import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { Fonts } from "../../constants/Styles";

const Offers = () => {
	const offersBannersList = [
		{
			id: "1",
			bannerImage: require("../../assets/images/Image-Icon.png"),
			color: "#F9B023",
			offer: 50,
		},
		{
			id: "2",
			bannerImage: require("../../assets/images/Image-Icon.png"),
			color: "#FFBC6E",
			offer: 20,
		},
	];

	const renderItem = ({ item }) => {
		return (
			// <View style={{flex:1, justifyContent: "center", alignItems: "center" }}>
			<View style={{ backgroundColor: item.color, ...styles.banner }}>
				<Image
					source={item.bannerImage}
					style={{ tintColor: "#fff" }}
				/>
				<View style={{}}>
					<Text style={{ ...Fonts.bannerMedium}}>Get</Text>
					<Text style={{ ...Fonts.bannerBold }}>{item.offer}% OFF</Text>
					<Text style={{ ...Fonts.bannerLight }}>On first 03 order</Text>
				</View>
			</View>
			// </View>
		);
	};
	return (
		<View style={{ marginTop: 20 }}>
			<FlatList
				data={offersBannersList}
				keyExtractor={(item) => `${item.id}`}
				renderItem={renderItem}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingLeft: 20,
					paddingTop: 10,
				}}
			/>
		</View>
	);
};

export default Offers;

const styles = StyleSheet.create({
	banner: {
		height: 123,
		width: 269,
		marginHorizontal: 20,
		borderRadius: 16,
		flexDirection: "row",
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 22,
	},
});
