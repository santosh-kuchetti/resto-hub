import { StyleSheet, Text, View } from "react-native";
import React from "react";

import HomeIcon from "../assets/images/home.png";
import HomeIconOutlined from "../assets/images/home-outlined.png";
import CategoryIcon from "../assets/images/Category.png";
import CategoryIconOutlined from "../assets/images/Category-outlined.png";
import HeartIcon from "../assets/images/Heart.png";
import HeartIconOutlined from "../assets/images/Heart-outlined.png";
import MoreIcon from "../assets/images/more_vertical.png";
import ImageBack from "../assets/images/image-back.png";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./home/Home";
import Category from "./category/Category";
import Favourites from "./favourites/Favourites";
import More from "./more/More";
import CustomTabBarButton from "../components/CustomTabBarButton";
const Tab = createBottomTabNavigator();
const Bottombar = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					// tabBarShowLabel: false,
                    tabBarLabel: ({ focused }) => (focused ? null : <Text>{route.name}</Text>),
					headerShown: false,
					tabBarStyle: styles.tabBarStyle,
					tabBarActiveTintColor: "#F9B023",
					tabBarInactiveTintColor: "#3E4554",
					tabBarIcon: ({ focused }) => {
						let imageName;
						if (route.name == "Home") {
							imageName = focused ? HomeIcon : HomeIconOutlined;
						} else if (route.name == "Category") {
							imageName = focused ? CategoryIcon : CategoryIconOutlined;
						} else if (route.name == "Favourites") {
							imageName = focused ? HeartIconOutlined : HeartIcon;
						} else if (route.name == "More") {
							imageName = MoreIcon;
						}
						return (
							<Image
								source={imageName}
								style={{
									tintColor: focused ? "#F9B023" : "#3E4554",
								}}
							/>
						);
					},
				})}>
				<Tab.Screen
					name="Home"
					component={Home}
					options={{
						tabBarButton: (props) => <CustomTabBarButton {...props} />,
					}}
				/>
				<Tab.Screen
					name="Category"
					component={Category}
					options={{
						tabBarButton: (props) => <CustomTabBarButton {...props} />,
					}}
				/>
				<Tab.Screen
					name="Favourites"
					component={Favourites}
					options={{
						tabBarButton: (props) => <CustomTabBarButton {...props} />,
					}}
				/>
				<Tab.Screen
					name="More"
					component={More}
					options={{
						tabBarButton: (props) => <CustomTabBarButton {...props} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default Bottombar;

const styles = StyleSheet.create({
	tabBarStyle: {
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0, 0)",
		borderTopWidth: 0,
	},
});
