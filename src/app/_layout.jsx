import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "../context/AuthContext";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  // two ways to customize the screens
  // one is to do it in the layout file by specifying the screen name
  // another way is to do it directly in the screen file, e.g. check the [exerciseName].jsx
  return (
    <AuthContextProvider>
      {/* Provide the client to the root */}
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Exercises" }} />
        </Stack>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
