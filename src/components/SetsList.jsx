import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import {
  Text,
  ActivityIndicator,
  FlatList,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import client from "../graphqlClient";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SetsListItem from "./SetsListItem";
import ProgressGraph from "../components/ProgressGraph";
import Loading from "./Loading";
import NewSetInput from "../components/NewSetInput";
import ExerciseHeader from "../components/exercise/ExerciseHeader";

const setsQuery = gql`
  query sets($exercise: String!, $username: String!) {
    sets(exercise: $exercise, username: $username) {
      documents {
        _id
        exercise
        reps
        weights
      }
    }
  }
`;

export default function SetsList({ exercise, isSeeMore, setIsSeeMore }) {
  const { username } = useContext(AuthContext);
  const exerciseName = exercise.name;
  const { data, isLoading, error } = useQuery({
    queryKey: ["sets", exerciseName], // no need to provide username here because we mainly work with a single user at one time. Unless we can easily toggle among different users
    queryFn: async () =>
      client.request(setsQuery, { exercise: exerciseName, username }),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <Text>Error in fetching data</Text>;
  }

  const sets = data.sets.documents;
  sets.forEach((set) => {
    const timestamp = parseInt(set._id.toString().substr(0, 8), 16) * 1000;
    const createdAt = new Date(timestamp);
    set["createdAt"] = createdAt;
    set["ttlWeights"] = set.reps * set.weights;
  });
  sets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <FlatList
      data={sets}
      keyExtractor={(item) => item._id}
      renderItem={(item) => <SetsListItem set={item.item} />}
      nestedScrollEnabled
      ListHeaderComponent={
        <View style={{ gap: 10 }}>
          <View style={styles.panel}>
            <ExerciseHeader exercise={exercise} />
          </View>
          <View style={styles.panel}>
            <Text style={styles.exerciseIst} numberOfLines={isSeeMore ? 0 : 3}>
              {exercise.instructions}
            </Text>
            <Text
              onPress={() => setIsSeeMore(!isSeeMore)}
              style={styles.seeMore}
            >
              {isSeeMore ? "See Less" : "See More"}
            </Text>
          </View>
          <NewSetInput exerciseName={exercise.name} />
          <ProgressGraph sets={data.sets.documents} />
        </View>
      }
    />
  );
  //  {data.sets.documents.map((set) => (
  //               <SetsListItem key={set._id} set={set} />
  //             ))}
}

const styles = StyleSheet.create({
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
    paddingTop: 10,
    fontWeight: 600,
    color: "gray",
  },
});
