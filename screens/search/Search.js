import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Fonts } from "../../constants/Styles";
import { TextInput } from "react-native";
import Recommended from "../home/Recommended";

const Search = ({ navigation }) => {
    const[searchValue,setSearchValue] = useState('')
	function header() {
		return (
			<View style={styles.header}>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => navigation.pop()}>
					<Image source={require("../../assets/images/back.png")} />
				</TouchableOpacity>
				<View style={styles.searchContainer}>
					<View style={styles.innerContainer}>
						<Image
							source={require("../../assets/images/search.png")}
							style={styles.searchIcon}
						/>
						<TextInput
							style={styles.input}
							placeholder="Search Products or store"
                            placeholderTextColor="#8891A5"
                            value={searchValue}
                            onChangeText={val=>setSearchValue(val)}
						/>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.wrapper}>
			{header()}
			<Recommended navigation={navigation} from='search' searchValue={searchValue}/>
		</View>
	);
};

export default Search;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	header: {
		marginTop: 52,
		marginHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	innerContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "start",
		marginLeft: 28,
		...Fonts.HeadingLight,
	},
	searchIcon: {
		width: 24,
		height: 24,
		marginRight: 12,
	},
	searchContainer: {
		flex: 1,
		height: 56,
		backgroundColor: "#153075",
		borderRadius: 28,
	},
	input: {
		flex: 1,
		...Fonts.HeadingLight,
		color: "white",
	},
});
