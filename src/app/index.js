import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import exercises from "../../assets/data/exercises.json";
import ExerciseListItem from "../components/ExerciseListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
    marginBottom: 5,
  },
});
