import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "../context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/***************************************************************
In Expo Router, you can use the Root Layout (app/_layout.tsx) to add providers which can be accessed by any route in the app.
***************************************************************/

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  // two ways to customize the screens
  // one is to do it in the layout file by specifying the screen name, like the example shown below
  // another way is to do it directly in the screen file, e.g. check the [exerciseName].jsx
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        {/* Provide the client to the root */}
        <QueryClientProvider client={queryClient}>
          {/* options here apply to all screens */}
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#74d3ae",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            {/* options here only apply to index screen */}
            {/* option 3 to customize the single screen option */}
            {/* option 1 and 2 are specified in [exerciseName].jsx file */}
            <Stack.Screen name="index" options={{ title: "Exercises" }} />
          </Stack>
        </QueryClientProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
