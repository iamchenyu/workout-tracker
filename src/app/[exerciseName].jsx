import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import NewSetInput from "../components/NewSetInput";
import SetsList from "../components/SetsList";

const exerciseQuery = gql`
  query exercises($name: String) {
    exercises(name: $name) {
      name
      muscle
      equipment
      instructions
      type
    }
  }
`;

export default function ExerciseDetailsScreen() {
  // useLocalSearchParams hook returns the URL parameters for the contextually selected route
  const params = useLocalSearchParams();
  const [isSeeMore, setIsSeeMore] = useState(false);
  const exerciseName = params.exerciseName;
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", exerciseName], // cache
    queryFn: async () => client.request(exerciseQuery, { name: exerciseName }),
  });

  const exercise = data?.exercises[0];

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Error in fetching data</Text>;
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: "Exercise Details" }} />
        {exercise ? (
          <>
            <View style={styles.panel}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseSubtitle}>
                {exercise.muscle.toUpperCase()} |{" "}
                {exercise.equipment.toUpperCase()}
              </Text>
            </View>
            <View style={styles.panel}>
              <Text
                style={styles.exerciseIst}
                numberOfLines={isSeeMore ? 0 : 3}
              >
                {exercise.instructions}
              </Text>
              <Text
                onPress={() => setIsSeeMore(!isSeeMore)}
                style={styles.seeMore}
              >
                {isSeeMore ? "See Less" : "See More"}
              </Text>
            </View>
          </>
        ) : (
          <Text>Exercise Not Found</Text>
        )}
        <NewSetInput exerciseName={exercise.name} />
        <SetsList exerciseName={exercise.name} />
      </ScrollView>
    </>
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
