import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fonts } from "../../constants/Styles";

const More = () => {
  return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ ...Fonts.empty }}>More</Text>
		</View>
	);
}

export default More

const styles = StyleSheet.create({})