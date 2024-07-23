import { StyleSheet, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import ExerciseHeader from "./ExerciseHeader";

export default function ExerciseListItem({ exercise }) {
  return (
    // `asChild` prop will forward all props to the first child of the Link component. The child component must support the onPress and onClick props (that's why we need to change View component to Pressable component), href and role will also be passed down.
    // the path will be shown on the web as e.g. /Rickshaw%20Carry
    // it will match [exerciseName].jsx file in app folder
    <Link href={`/${exercise.name}`} asChild>
      <Pressable style={styles.exerciseContainer}>
        <ExerciseHeader exercise={exercise} />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    marginHorizontal: 2,

    // shadow effect
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
});
