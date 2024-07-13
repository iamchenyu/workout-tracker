import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import exercises from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
import { useState } from "react";

export default function ExerciseDetailsScreen() {
  // useLocalSearchParams hook returns the URL parameters for the contextually selected route
  const params = useLocalSearchParams();
  const [isSeeMore, setIsSeeMore] = useState(false);
  const exercise = exercises.find((ex) => ex.name === params.exerciseName);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: "Exercise Details" }} />
      <View style={styles.panel}>
        <Text style={styles.exerciseName}>
          {exercise ? exercise.name : "Exercise Not Found"}
        </Text>
        <Text style={styles.exerciseSubtitle}>
          {exercise.muscle.toUpperCase()} | {exercise.equipment.toUpperCase()}
        </Text>
      </View>
      <View style={styles.panel}>
        <Text style={styles.exerciseIst} numberOfLines={isSeeMore ? 0 : 3}>
          {exercise.instructions}
        </Text>
        <Text onPress={() => setIsSeeMore(!isSeeMore)} style={styles.seeMore}>
          {isSeeMore ? "See Less" : "See More"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  panel: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 500,
  },
  exerciseSubtitle: {
    color: "dimgray",
  },
  exerciseIst: {
    fontSize: 16,
    lineHeight: 20,
  },
  seeMore: {
    alignSelf: "center",
    paddingTop: 10,
    fontWeight: 600,
    color: "gray",
  },
});
