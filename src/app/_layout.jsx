import { Stack } from "expo-router";
export default function RootLayout() {
  // two ways to customize the screens
  // one is to do it in the layout file by specifying the screen name
  // another way is to do it directly in the screen file, e.g. [exerciseName].jsx
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Exercises" }} />
    </Stack>
  );
}
