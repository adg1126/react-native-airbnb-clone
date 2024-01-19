import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Page = () => {
	useWarmUpBrowser();

	return (
		<View style={styles.container}>
			<TextInput
				autoCapitalize='none'
				placeholder='email'
				style={[defaultStyles.inputField, { marginBottom: 30 }]}
			/>
			<TouchableOpacity style={defaultStyles.btn}>
				<Text style={defaultStyles.btnText}>Continue</Text>
			</TouchableOpacity>

			<View style={styles.separatorView}>
				<View
					style={{
						flex: 1,
						borderBottomColor: "#000",
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
				<Text style={styles.separator}>or</Text>
				<View
					style={{
						flex: 1,
						borderBottomColor: "#000",
						borderBottomWidth: StyleSheet.hairlineWidth,
					}}
				/>
			</View>

			<View style={{ gap: 20 }}>
				<TouchableOpacity style={styles.btnOutline}>
					<Ionicons
						name='call-outline'
						style={defaultStyles.btnIcon}
						size={24}
					/>
					<Text style={styles.btnOutlineText}>Continue with Phone</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnOutline}>
					<Ionicons
						name='logo-apple'
						style={defaultStyles.btnIcon}
						size={24}
					/>
					<Text style={styles.btnOutlineText}>Continue with Apple</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnOutline}>
					<Ionicons
						name='logo-google'
						style={defaultStyles.btnIcon}
						size={24}
					/>
					<Text style={styles.btnOutlineText}>Continue with Google</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnOutline}>
					<Ionicons
						name='logo-facebook'
						style={defaultStyles.btnIcon}
						size={24}
					/>
					<Text style={styles.btnOutlineText}>Continue with Facebook</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 26,
	},
	separatorView: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginVertical: 30,
	},
	separator: {
		fontFamily: "mon-sb",
		color: Colors.grey,
	},
	btnOutline: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: Colors.grey,
		height: 50,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingHorizontal: 10,
	},
	btnOutlineText: {
		color: "#000",
		fontSize: 16,
		fontFamily: "mon-sb",
	},
});

export default Page;
