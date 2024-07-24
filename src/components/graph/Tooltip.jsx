import { View } from "react-native";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { format } from "date-fns";

export default function Tooltip({ tooltip, set }) {
  return (
    <View>
      <Svg>
        <Rect
          x={tooltip.x - 50}
          y={tooltip.y + 10}
          width="120"
          height="60"
          fill="white"
          borderRadius="20"
          opacity="80%"
        />
        <TextSVG
          x={tooltip.x - 40}
          y={tooltip.y + 30}
          fill="black"
          fontSize="12"
          textAnchor="left"
        >
          Reps: {set.reps}
        </TextSVG>
        <TextSVG
          x={tooltip.x - 40}
          y={tooltip.y + 45}
          fill="black"
          fontSize="12"
          textAnchor="left"
        >
          Weights: {set.weights}lbs
        </TextSVG>
        <TextSVG
          x={tooltip.x - 40}
          y={tooltip.y + 61}
          fill="black"
          fontSize="12"
          textAnchor="left"
        >
          @ {format(new Date(set.createdAt), "MM/dd/yyyy")}
        </TextSVG>
      </Svg>
    </View>
  );
}
