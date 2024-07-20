import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function auth() {
  const [uiUsername, setUiUsername] = useState("");
  const { username, setUsername } = useContext(AuthContext);

  const handleSignin = () => {
    setUsername(uiUsername);
  };

  if (username) return <Redirect href={"/"} />;

  return (
    <View style={styles.page}>
      <Stack.Screen options={{ title: "Sign In" }}></Stack.Screen>
      <Text style={styles.label}>Username</Text>
      <TextInput
        value={uiUsername}
        onChangeText={setUiUsername}
        style={styles.input}
        placeholder="username"
      />
      <Button title="Sign in" onPress={handleSignin}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "white",
  },
  label: {
    fontWeight: 600,
    fontSize: 20,
    color: "dimgray",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "gainsboro",
  },
});
