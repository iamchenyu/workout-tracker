import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";

export default function NewSetInput() {
  const [reps, setReps] = useState(0);
  const [weights, setWeights] = useState(0);

  const handleAddSet = () => {
    console.warn("Add Set!", reps, weights);
    // save reps and weights to db

    // reset reps and weights
    setReps(0);
    setWeights(0);
  };

  return (
    <View style={styles.container}>
      {/* <Text>Log Set</Text> */}
      <TextInput
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Weights"
        value={weights}
        onChangeText={setWeights}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Add" onPress={handleAddSet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 5,
    borderColor: "gainsboro",
  },
});
