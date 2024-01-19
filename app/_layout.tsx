import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		mon: require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
		"mon-sb": require("../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
		"mon-b": require("../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const router = useRouter();

	return (
		<Stack>
			<Stack.Screen
				name='(tabs)'
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='(modals)/login'
				options={{
					title: "Log ing or sign up",
					presentation: "modal",
					headerTitleStyle: {
						fontFamily: "mon-sb",
					},
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons
								name='close-outline'
								size={28}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name='(modals)/booking'
				options={{
					presentation: "transparentModal",
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons
								name='close-outline'
								size={28}
							/>
						</TouchableOpacity>
					),
					animation: "fade",
				}}
			/>
			<Stack.Screen
				name='listing/[id]'
				options={{ headerTitle: "" }}
			/>
		</Stack>
	);
}
