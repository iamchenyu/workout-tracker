import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ExerciseListItem from "../components/ExerciseListItem";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../graphqlClient";

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String, $offset: Int) {
    exercises(muscle: $muscle, name: $name, offset: $offset) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExercisesScreen() {
  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => client.request(exercisesQuery),
  });

  if (error) {
    console.log("Error when fetching data:", error);
  } else {
    console.log("Success when fetching data:", data);
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.title}>Workout Tracker</Text>
          <FlatList
            data={data?.exercises}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <ExerciseListItem item={item} />}
            contentContainerStyle={{ gap: 10 }}
          />
          <StatusBar style="auto" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
    marginBottom: 5,
  },
});
