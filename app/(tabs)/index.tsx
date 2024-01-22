import { View, Text } from "react-native";
import React, { useState, useMemo } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

import listingsData from "@/assets/data/airbnb-listings.json";
import ListingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsMap from "@/components/ListingsMap";

const Page = () => {
	const [category, setCategory] = useState("Tiny homes");
	const items = useMemo(() => listingsData as any, []);

	const onCategoryChange = (category: string) => {
		setCategory(category);
	};

	return (
		<View style={{ flex: 1, marginTop: 140 }}>
			<Stack.Screen
				options={{
					header: () => <ExploreHeader onCategoryChange={onCategoryChange} />,
				}}
			/>
			{/* <Listings
				listings={items}
				category={category}
			/> */}
			<ListingsMap listings={ListingsDataGeo} />
		</View>
	);
};

export default Page;
