import { View, Text, StyleSheet } from "react-native";
import React, { memo } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

interface Props {
	listings: any;
}

const INITIAL_REGION = {
	latitude: 52.52,
	longitude: 13.405,
	latitudeDelta: 9,
	longitudeDelta: 9,
};

const ListingsMap = memo(({ listings }: Props) => {
	const router = useRouter();

	const onMarketSelect = (listing: ListingGeo) => {
		router.push(`/listing/${listing.properties.id}`);
	};

	const cluster = (cluster: any) => {
		const { id, geometry, onPress, properties } = cluster;
		const points = properties.point_count;

		return (
			<Marker
				onPress={onPress}
				key={`cluster-${id}`}
				coordinate={{
					latitude: geometry.coordinates[1],
					longitude: geometry.coordinates[0],
				}}
			>
				<View style={styles.marker}>
					<Text
						style={{
							color: "#000",
							textAlign: "center",
							fontFamily: "mon-sb",
						}}
					>
						{points}
					</Text>
				</View>
			</Marker>
		);
	};

	return (
		<View style={defaultStyles.container}>
			<MapView
				style={StyleSheet.absoluteFill}
				provider={PROVIDER_GOOGLE}
				initialRegion={INITIAL_REGION}
				clusterColor='#fff'
				clusterTextColor='#000'
				clusterFontFamily='mon-sb'
				renderCluster={cluster}
			>
				{listings.features.map((listing: ListingGeo, i: number) => (
					<Marker
						onPress={() => onMarketSelect(listing)}
						key={i}
						coordinate={{
							latitude: +listing.properties.latitude,
							longitude: +listing.properties.longitude,
						}}
					>
						<View style={styles.marker}>
							<Text style={styles.markerText}>
								€ {listing.properties.price}
							</Text>
						</View>
					</Marker>
				))}
			</MapView>
		</View>
	);
});

const styles = StyleSheet.create({
	marker: {
		backgroundColor: "#fff",
		padding: 8,
		elevation: 5,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 10,
		},
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	markerText: {
		fontSize: 14,
		fontFamily: "mon-sb",
	},
});

export default ListingsMap;
