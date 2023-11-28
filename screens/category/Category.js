import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fonts } from "../../constants/Styles";

const Category = () => {
  return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ ...Fonts.empty }}>Categories</Text>
		</View>
	);
}

export default Category

const styles = StyleSheet.create({})