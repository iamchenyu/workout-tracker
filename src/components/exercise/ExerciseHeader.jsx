import { Text, StyleSheet } from "react-native";

export default function ExerciseHeader({ exercise }) {
  return (
    <>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.exerciseSubtitle}>
        {exercise.muscle.toUpperCase()} | {exercise.equipment.toUpperCase()}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  exerciseName: {
    fontSize: 20,
    fontWeight: 500,
  },
  exerciseSubtitle: {
    color: "dimgray",
  },
});
