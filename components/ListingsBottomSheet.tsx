import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useRef } from "react";
import { Listing } from "@/interfaces/listing";
import BottomSheet from "@gorhom/bottom-sheet";
import Listings from "./Listings";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface Props {
	listings: Listing[];
	category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["10%", "100%"], []);

	const showMap = () => {
		bottomSheetRef.current?.collapse();
	};

	return (
		<BottomSheet
			index={1}
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			handleIndicatorStyle={{ backgroundColor: Colors.grey }}
			enablePanDownToClose={false}
			style={styles.sheetContainer}
		>
			<View style={{ flex: 1 }}>
				<Listings
					listings={listings}
					category={category}
				/>
				<View style={styles.absoluteBtn}>
					<TouchableOpacity
						onPress={showMap}
						style={styles.btn}
					>
						<Text
							style={{
								fontFamily: "mon-sb",
								color: "#fff",
							}}
						>
							Map
						</Text>
						<Ionicons
							name='map'
							size={20}
							color={"#fff"}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	sheetContainer: {
		backgroundColor: "#fff",
		elevation: 4,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 4,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},
	absoluteBtn: {
		position: "absolute",
		bottom: 30,
		width: "100%",
		alignItems: "center",
	},
	btn: {
		backgroundColor: Colors.dark,
		padding: 16,
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 30,
		gap: 8,
	},
});

export default ListingsBottomSheet;
