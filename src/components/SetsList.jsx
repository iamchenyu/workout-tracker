import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { Text, ActivityIndicator, FlatList, View } from "react-native";
import client from "../graphqlClient";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SetsListItem from "./SetsListItem";
import ProgressGraph from "../components/ProgressGraph";

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

export default function SetsList({ exerciseName }) {
  const { username } = useContext(AuthContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["sets", exerciseName], // no need to provide username here because we mainly work with a single user at one time. Unless we can easily toggle among different users
    queryFn: async () =>
      client.request(setsQuery, { exercise: exerciseName, username }),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Error in fetching data</Text>;
  }

  return (
    <View>
      {/* <Text style={{ fontSize: 16, paddingHorizontal: 10, marginVertical: 5 }}>
        Log History
      </Text> */}
      <ProgressGraph sets={data.sets.documents} />
      {data.sets.documents.map((set) => (
        <SetsListItem set={set} />
      ))}
    </View>
  );
}
