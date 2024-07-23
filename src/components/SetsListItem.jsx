import { View, Text } from "react-native";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export default function SetsListItem({ set }) {
  return (
    <Text
      key={set._id}
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      {set.reps} reps X {set.weights ? `${set.weights} lb` : "No Weights"}{" "}
      <Text style={{ fontStyle: "italic", color: "gray" }}>
        @ {formatDistanceToNow(set.createdAt)} ago
      </Text>
    </Text>
  );
}
