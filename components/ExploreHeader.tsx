import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const categories = [
	{ name: "Tiny homes", icon: "home" },
	{ name: "Cabins", icon: "house-siding" },
	{ name: "Trending", icon: "local-fire-department" },
	{ name: "Play", icon: "videogame-asset" },
	{ name: "City", icon: "apartment" },
	{ name: "Beachfront", icon: "beach-access" },
	{ name: "Countryside", icon: "nature-people" },
];

interface Props {
	onCategoryChange: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChange }: Props) => {
	const categoryRef = useRef<Array<TouchableOpacity | null>>([]),
		scrollRef = useRef<ScrollView>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const selectCategory = (i: number) => {
		const selected = categoryRef.current[i];
		setActiveIndex(i);

		selected?.measure((x) => {
			scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
		});

		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		onCategoryChange(categories[i].name);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#fff",
			}}
		>
			<View style={styles.container}>
				<View style={styles.actionRow}>
					<Link
						href={"/(modals)/booking"}
						asChild
					>
						<TouchableOpacity style={styles.searchBtn}>
							<Ionicons
								name='search'
								size={24}
							/>
							<View>
								<Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
								<Text
									style={{
										fontFamily: "mon",
										color: Colors.grey,
									}}
								>
									Anywhere · Any week
								</Text>
							</View>
						</TouchableOpacity>
					</Link>
					<TouchableOpacity style={styles.filterBtn}>
						<Ionicons
							name='options-outline'
							size={24}
						/>
					</TouchableOpacity>
				</View>

				<ScrollView
					ref={scrollRef}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						alignItems: "center",
						gap: 30,
						paddingHorizontal: 16,
					}}
				>
					{categories.map((c, i) => (
						<TouchableOpacity
							key={i}
							ref={(el) => (categoryRef.current[i] = el)}
							style={
								activeIndex === i
									? styles.categoriesBtnActive
									: styles.categoriesBtn
							}
							onPress={() => selectCategory(i)}
						>
							<MaterialIcons
								name={c.icon as any}
								size={24}
								color={activeIndex === i ? "#000" : Colors.grey}
							/>
							<Text
								style={
									activeIndex === i
										? styles.categoryTextActive
										: styles.categoryText
								}
							>
								{c.name}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		height: 130,
	},
	actionRow: {
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 24,
		paddingBottom: 16,
		flexDirection: "row",
		gap: 10,
	},
	filterBtn: {
		padding: 10,
		borderWidth: 1,
		borderColor: Colors.grey,
		borderRadius: 24,
	},
	searchBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		borderColor: "#c2c2c2",
		borderWidth: StyleSheet.hairlineWidth,
		flex: 1,
		padding: 14,
		borderRadius: 30,
		backgroundColor: "#fff",

		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.12,
		shadowRadius: 8,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},
	categoryText: {
		fontSize: 14,
		fontFamily: "mon-sb",
		color: Colors.grey,
	},
	categoryTextActive: {
		fontSize: 14,
		fontFamily: "mon-sb",
		color: "#000",
	},
	categoriesBtn: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 8,
	},
	categoriesBtnActive: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 8,
		borderBottomColor: "#000",
		borderBottomWidth: 2,
	},
});

export default ExploreHeader;
