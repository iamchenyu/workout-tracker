import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ExerciseListItem from "../components/ExerciseListItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import { Redirect, Stack } from "expo-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDebounce } from "@uidotdev/usehooks";

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExercisesScreen() {
  const { username } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Queries
  const { data, isLoading, error, fetchNextPage, isFetchNextPage } =
    useInfiniteQuery({
      queryKey: ["exercises", debouncedSearchTerm],
      initialPageParam: 0,
      queryFn: () =>
        client.request(exercisesQuery, { name: debouncedSearchTerm }),
      getNextPageParam: (lastPage, pages) => pages.length * 10,
    });

  if (error) {
    console.log("Error when fetching data:", error);
  }

  const exercises = data?.pages.flatMap((page) => page.exercises);
  console.log(exercises);

  const handleLoadMore = () => {
    if (isFetchNextPage) {
      return;
    }

    fetchNextPage();
  };

  if (!username) return <Redirect href={"/auth"} />;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Stack.Screen
            options={{
              headerSearchBarOptions: {
                placeholder: "search...",
                onChangeText: (e) => setSearchTerm(e.nativeEvent.text),
                hideWhenScrolling: false,
              },
            }}
          />
          {/* <Text style={styles.title}>Workout Tracker for {username}</Text> */}
          <FlatList
            data={exercises}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <ExerciseListItem item={item} />}
            contentContainerStyle={{ gap: 10 }}
            onEndReachedThreshold={1}
            onEndReached={handleLoadMore}
            contentInsetAdjustmentBehavior="automatic"
            style={{ padding: 10 }}
          />
          {/* <Button title="Load More" onPress={fetchNextPage}></Button> */}
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
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
    marginBottom: 5,
  },
});
