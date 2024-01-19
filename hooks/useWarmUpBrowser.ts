import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

// Warms up the browser on android when using Clerk auth
export const useWarmUpBrowser = () => {
	useEffect(() => {
		void WebBrowser.warmUpAsync();
		return () => {
			void WebBrowser.coolDownAsync();
		};
	}, []);
};
