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
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { CLERK_PUBLISHABLE_KEY } from "@env";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ModalHeaderText from "@/components/ModalHeaderText";
import Colors from "@/constants/Colors";

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch {
			return null;
		}
	},

	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch {
			return;
		}
	},
};

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

	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY!}
			tokenCache={tokenCache}
		>
			<RootLayoutNav />
		</ClerkProvider>
	);
}

function RootLayoutNav() {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.push("/(modals)/login");
		}
	}, [isLoaded]);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
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
							headerTransparent: true,
							headerTitle: () => <ModalHeaderText />,
							headerLeft: () => (
								<TouchableOpacity
									style={{
										backgroundColor: "#fff",
										borderColor: Colors.grey,
										borderRadius: 20,
										borderWidth: 1,
										padding: 4,
									}}
									onPress={() => router.back()}
								>
									<Ionicons
										name='close-outline'
										size={22}
									/>
								</TouchableOpacity>
							),
							animation: "fade",
						}}
					/>
					<Stack.Screen
						name='listing/[id]'
						options={{
							headerTitle: "",
							headerTransparent: true,
						}}
					/>
				</Stack>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
