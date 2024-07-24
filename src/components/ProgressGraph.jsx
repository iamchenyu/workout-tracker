import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useState } from "react";
import Tooltip from "./graph/Tooltip";

export default function ProgressGraph({ sets }) {
  const [chartParentWidth, setChartParentWidth] = useState(0);
  const [tooltip, setTooltip] = useState({
    x: 0,
    y: 0,
    visible: false,
    set: {},
  });
  const dataPoints = sets.reverse().map((set) => set.ttlWeights);
  const handlePointClick = ({ x, y, index }) => {
    const isSamePoint = x === tooltip.x && y === tooltip.y;
    return isSamePoint
      ? setTooltip((prevState) => ({
          ...prevState,
          visible: !prevState.visible,
        }))
      : setTooltip({
          x,
          y,
          visible: true,
          set: sets[index],
        });
  };

  return (
    <View
      style={styles.container}
      // get the dimension of the parent container and update the state
      // the chart will use the state value as its width
      onLayout={({ nativeEvent }) =>
        setChartParentWidth(nativeEvent.layout.width)
      }
    >
      {sets.length === 0 ? (
        <Text>No Workout History</Text>
      ) : (
        <LineChart
          data={{
            //   labels: sets.map((set) => set.createdAt),
            datasets: [
              {
                data: dataPoints,
              },
            ],
            legend: ["Reps * Weights"], // optional
          }}
          withVerticalLabels={false}
          onDataPointClick={handlePointClick}
          decorator={() =>
            tooltip.visible ? (
              <Tooltip tooltip={tooltip} set={tooltip.set} />
            ) : null
          }
          width={chartParentWidth - 5} // make the chart responsive
          height={220}
          // yAxisLabel="$"
          yAxisSuffix="lb"
          // yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#74d3ae",
            backgroundGradientTo: "#74d3ae",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              margin: 5,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#74d3ae",
            },
          }}
          bezier
          style={{
            margin: 5,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 5,
    gap: 5,
    alignItems: "center",
  },
  graph: {
    width: "100%",
    height: 200,
  },
});
