import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import SetsList from "../components/SetsList";
import Loading from "../components/Loading";

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
  // e.g.: {"exerciseName": "Rickshaw Carry"}
  // "exerciseName" is defined as the file name
  // "Rickshaw Carry" is defined as the path name in ExerciseListItem.jsx
  const params = useLocalSearchParams();
  const exerciseName = params.exerciseName;
  const [isSeeMore, setIsSeeMore] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises", exerciseName], // cache
    queryFn: async () => client.request(exerciseQuery, { name: exerciseName }),
  });

  // option 1 to customize the single screen option
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: exerciseName,
    });
  }, [navigation]);

  const exercise = data?.exercises[0];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <View style={styles.container}>
      {/* if we want to use ScrollView， we cannot use nested FlatList  */}
      {/* <ScrollView contentContainerStyle={styles.container}> */}
      {/* option 2 to customize the single screen option */}
      <Stack.Screen
      // options={{
      //   title: "Exercise Details",
      // }}
      />
      {error ? (
        <Text>Error in fetching data</Text>
      ) : exercise ? (
        <SetsList
          exercise={exercise}
          isSeeMore={isSeeMore}
          setIsSeeMore={setIsSeeMore}
        />
      ) : (
        <Text>Exercise Not Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    flex: 1,
  },
});
