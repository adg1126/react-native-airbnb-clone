import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	TextInput,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, {
	FadeIn,
	FadeOut,
	SlideInDown,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";

import { places } from "@/assets/data/places";

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
	const router = useRouter();
	const [openCard, setOpenCard] = useState(0);
	const [selectedPlace, setSelectedPlace] = useState(0);
	const today = new Date().toISOString().substring(0, 10);

	const onClearAll = () => {
		setSelectedPlace(0);
		setOpenCard(0);
	};

	return (
		<BlurView
			style={styles.container}
			intensity={70}
			tint='light'
		>
			{/* Where */}
			<View style={styles.card}>
				{openCard !== 0 && (
					<AnimatedTouchableOpacity
						style={styles.cardPreview}
						onPress={() => setOpenCard(0)}
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<Text style={styles.previewText}>Where</Text>
						<Text style={styles.previewDate}>I'm flexible</Text>
					</AnimatedTouchableOpacity>
				)}

				{openCard === 0 && (
					<>
						<Animated.Text
							entering={FadeIn}
							style={styles.cardHeader}
						>
							Where to?
						</Animated.Text>
						<Animated.View style={styles.cardBody}>
							<View style={styles.searchSection}>
								<Ionicons
									style={styles.searchIcon}
									name='search-outline'
									size={20}
								/>
								<TextInput
									style={styles.inputField}
									placeholder='Search destination'
									placeholderTextColor={Colors.grey}
								/>
							</View>
						</Animated.View>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{
								gap: 25,
								paddingLeft: 20,
								marginBottom: 30,
							}}
						>
							{places.map((p, i) => (
								<TouchableOpacity
									key={i}
									onPress={() => setSelectedPlace(i)}
								>
									<Image
										source={p.img}
										style={
											selectedPlace === i ? styles.placeSelected : styles.place
										}
									/>
									<Text
										style={{
											fontFamily: selectedPlace === i ? "mon-sb" : "mon",
											paddingTop: 6,
										}}
									>
										{p.title}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</>
				)}
			</View>

			{/* When */}
			<View style={styles.card}>
				{openCard !== 1 && (
					<AnimatedTouchableOpacity
						style={styles.cardPreview}
						onPress={() => setOpenCard(1)}
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<Text style={styles.previewText}>When</Text>
						<Text style={styles.previewDate}>Any week</Text>
					</AnimatedTouchableOpacity>
				)}

				{openCard === 1 && (
					<>
						<Animated.Text
							entering={FadeIn}
							style={styles.cardHeader}
						>
							When's your trip?
						</Animated.Text>
						<Animated.View style={styles.cardBody}>
							<DatePicker
								current={today}
								selected={today}
								mode={"Calendar"}
								option={{
									defaultFont: "mon",
									headerFont: "mon-sb",
									borderColor: "transparent",
									mainColor: Colors.primary,
								}}
							/>
						</Animated.View>
					</>
				)}
			</View>

			{/* Who */}
			<View style={styles.card}>
				{openCard !== 2 && (
					<AnimatedTouchableOpacity
						style={styles.cardPreview}
						onPress={() => setOpenCard(2)}
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<Text style={styles.previewText}>Who</Text>
						<Text style={styles.previewDate}>Add guests</Text>
					</AnimatedTouchableOpacity>
				)}

				{openCard === 2 && (
					<>
						<Animated.Text
							entering={FadeIn}
							style={styles.cardHeader}
						>
							Who's coming?
						</Animated.Text>
						<Animated.View style={styles.cardBody}></Animated.View>
					</>
				)}
			</View>

			{/* Footer */}
			<Animated.View
				style={defaultStyles.footer}
				entering={SlideInDown.delay(200)}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						onPress={onClearAll}
						style={{ justifyContent: "center" }}
					>
						<Text
							style={{
								fontSize: 18,
								fontFamily: "mon-sb",
								textDecorationLine: "underline",
							}}
						>
							Clear all
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => router.back()}
						style={[
							defaultStyles.btn,
							{
								paddingRight: 20,
								paddingLeft: 50,
							},
						]}
					>
						<Ionicons
							name='search-outline'
							size={24}
							color={"#fff"}
							style={defaultStyles.btnIcon}
						/>
						<Text style={defaultStyles.btnText}>Search</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</BlurView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 14,
		margin: 10,
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		gap: 20,
	},
	previewText: {
		fontFamily: "mon-sb",
		fontSize: 14,
		color: Colors.grey,
	},
	previewDate: {
		fontFamily: "mon-sb",
		fontSize: 14,
		color: Colors.dark,
	},
	cardPreview: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},
	cardHeader: {
		fontFamily: "mon-sb",
		fontSize: 24,
		padding: 20,
	},
	cardBody: {
		paddingHorizontal: 20,
	},
	searchSection: {
		height: 50,
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#ABABAB",
		borderRadius: 8,
		backgroundColor: "#fff",
		alignContent: "center",
		alignItems: "center",
		marginBottom: 4,
	},
	inputField: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	searchIcon: {
		padding: 10,
	},
	place: {
		width: 120,
		height: 120,
		borderRadius: 10,
	},
	placeSelected: {
		width: 120,
		height: 120,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: Colors.grey,
	},
});

export default Page;
