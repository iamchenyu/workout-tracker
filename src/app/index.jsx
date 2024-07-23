import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList } from "react-native";
import ExerciseListItem from "../components/exercise/ExerciseListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import { Redirect, Stack } from "expo-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDebounce } from "@uidotdev/usehooks";
import Loading from "../components/Loading";

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
  console.log("exercises: ", exercises);

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
        <Loading />
      ) : (
        <>
          <Stack.Screen
            options={{
              headerSearchBarOptions: {
                placeholder: "search...",
                onChangeText: (e) => setSearchTerm(e.nativeEvent.text),
                hideWhenScrolling: false,
                autoCapitalize: "characters",
                barTintColor: "#fff",
                obscureBackground: true,
              },
            }}
          />
          <FlatList
            data={exercises}
            keyExtractor={(exercise, index) => exercise + index}
            renderItem={({ item }) => <ExerciseListItem exercise={item} />}
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
    flex: 1, // equally share the available space in a flex container
    justifyContent: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: 30,
    marginBottom: 5,
  },
});

// flex: 1 equals to:
// flexGrow: 1, the item will grow to fill up the remaining space proportionally along with other items that have a flex-grow value.
// flexShrink: 1, the item will shrink proportionally along with other items that have a flex-shrink value.
// flexBasis: 0, the size of the item is determined solely by the flex-grow and flex-shrink properties and not by the item's content or intrinsic size.
