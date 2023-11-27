import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fonts } from "../../constants/Styles";
const ItemDetails = ({ navigation, route }) => {
  const itemData = route?.params?.itemData;
  return (
    <View style={styles.detailsWrapper}>
      {header(navigation)}
      {title(itemData.title)}
    </View>
  );
};

function header(navigation) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Image source={require("../../assets/images/back.png")} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/bag.png")}
          style={{ tintColor: "#1E222B" }}
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

function title(title) {
  return (
    <View>
      <Text >{title}</Text>
    </View>
  );
}

export default ItemDetails;

const styles = StyleSheet.create({
  detailsWrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
});
