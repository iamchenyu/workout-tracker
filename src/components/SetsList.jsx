import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { Text, ActivityIndicator, FlatList, View } from "react-native";
import client from "../graphqlClient";

const setsQuery = gql`
  query exercises {
    sets {
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["sets"],
    queryFn: async () => client.request(setsQuery),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Error in fetching data</Text>;
  }

  const exercises = data.sets.documents.filter(
    (set) => set.exercise === exerciseName
  );

  return (
    <View>
      <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>Log History</Text>
      {exercises.map((set) => (
        <Text
          key={set._id}
          style={{
            backgroundColor: "white",
            marginVertical: 10,
            padding: 10,
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {set.reps} X {set.weights || "No Weights"}
        </Text>
      ))}
    </View>
  );
}
