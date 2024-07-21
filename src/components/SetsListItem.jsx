import { View, Text } from "react-native";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export default function SetsListItem({ set }) {
  const timestamp = parseInt(set._id.toString().substr(0, 8), 16) * 1000;
  const createdAt = new Date(timestamp);
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
      {set.reps} X {set.weights || "No Weights"}{" "}
      <Text style={{ fontStyle: "italic", color: "gray" }}>
        @ {formatDistanceToNow(createdAt)} ago
      </Text>
    </Text>
  );
}
