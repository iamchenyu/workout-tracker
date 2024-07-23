import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useContext, useState } from "react";
import { gql } from "graphql-request";
import client from "../graphqlClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

const addSetMutation = gql`
  mutation MyMutation($newSet: NewSet!) {
    insertSet(
      document: $newSet
      collection: "sets"
      database: "workouts"
      dataSource: "Cluster0"
    ) {
      insertedId
    }
  }
`;

export default function NewSetInput({ exerciseName }) {
  const [reps, setReps] = useState(0);
  const [weights, setWeights] = useState(0);
  const [isZeroRep, setIsZeroRep] = useState(false);
  const { username } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (newSet) => client.request(addSetMutation, { newSet }),
    onSuccess: () => {
      // only validate the name when matches exerciseName
      queryClient.invalidateQueries({ queryKey: ["sets", exerciseName] }),
        // reset reps and weights and error messages
        setReps(0);
      setWeights(0);
      setIsZeroRep(false);
    },
  });

  const handleAddSet = () => {
    // validate reps
    if (reps <= 0) {
      setIsZeroRep(true);
      return;
    }
    // save reps and weights to db
    mutate({
      username,
      exercise: exerciseName,
      reps,
      weights,
    });
    // console.warn("Add Set!", exerciseName, reps, weights);
    // validate and reset the data in query validation function
  };

  if (isError) {
    console.log("Error: ", error);
  }

  return (
    <>
      {/* <Text style={{ fontSize: 16, paddingHorizontal: 10, marginVertical: 5 }}>
        Add Log
      </Text> */}
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            placeholder="Reps"
            value={reps}
            onChangeText={setReps}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Weights"
            value={weights}
            onChangeText={setWeights}
            style={styles.input}
            keyboardType="numeric"
          />
          <Button
            title={isPending ? "Adding..." : "Add"}
            onPress={handleAddSet}
          />
        </View>
        {isZeroRep ? (
          <Text style={{ color: "red" }}>
            Reps cannot be less than or equal to 0.
          </Text>
        ) : (
          ""
        )}
        {isError || isZeroRep ? (
          <Text style={{ color: "red" }}>Failed to add the set.</Text>
        ) : (
          ""
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "gainsboro",
    flex: 1,
  },
});
