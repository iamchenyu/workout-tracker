import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { Text, ActivityIndicator, FlatList, View } from "react-native";
import client from "../graphqlClient";

const setsQuery = gql`
  query exercises {
    sets {
      documents {
        _id
        name
        reps
        weights
      }
    }
  }
`;

export default function SetsList() {
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

  return (
    <View>
      {data.sets.documents.map((set) => (
        <Text
          style={{
            backgroundColor: "white",
            marginVertical: 10,
            padding: 10,
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          {set.reps} X {set.weights}
        </Text>
      ))}
    </View>
  );
}
