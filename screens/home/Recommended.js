import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Fonts } from "../../constants/Styles";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const Recommended = ({navigation}) => {
  const [productsData, setProductsData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchProducts = async () => {
        const products = await axios.get("https://dummyjson.com/products");
        setProductsData(products?.data?.products || []);
      };
      fetchProducts();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Image
          source={require("../../assets/images/Heart.png")}
          style={styles.favoriteImage}
        />
      </TouchableOpacity>
      <Image source={{ uri: item?.thumbnail }} style={styles.itemImage} />
      <View style={styles.details}>
        <Text style={{ ...Fonts.priceRecommand }}>{`$${item?.price}`}</Text>
        <Text style={{ ...Fonts.nameRecommand }}>{item?.title}</Text>
      </View>
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.push("ItemDetails",{itemData:item})}
      >
        <Image
          source={require("../../assets/images/addToCart.png")}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20,
      }}
    >
      <Text style={{ ...Fonts.headingRecommand }}>Recommended</Text>
      <FlatList
        data={productsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  itemContainer: {
    width: 160,
    height: 194,
    backgroundColor: "#F8F9FB",
    marginRight: 15,
    marginTop: 22,
    borderRadius: 12,
  },
  itemImage: {
    position: "absolute",
    height: 68,
    width: 68,
    top: 20,
    left: 43,
  },
  favoriteImage: {
    position: "absolute",
    top: 13,
    left: 13,
    height: 14,
    width: 14,
  },
  details: {
    position: "absolute",
    top: 134,
    left: 17,
  },
  add: {
    position: "absolute",
    top: 134,
    right: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
