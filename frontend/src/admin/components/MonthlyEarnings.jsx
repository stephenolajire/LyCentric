import React, { useState, useEffect, useRef } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";

const MonthlyEarnings = () => {
  const chartContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Data for monthly earnings
  const data = [
    { x: "Jan", y: 5000 },
    { x: "Feb", y: 7000 },
    { x: "Mar", y: 8000 },
    { x: "Apr", y: 10000 },
    { x: "May", y: 9000 },
    { x: "Jun", y: 12000 },
    { x: "Jul", y: 11000 },
    { x: "Aug", y: 15000 },
    { x: "Sep", y: 14000 },
    { x: "Oct", y: 16000 },
    { x: "Nov", y: 17000 },
    { x: "Dec", y: 18000 },
  ];

  // Update chart dimensions on container resize
  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const { clientWidth, clientHeight } = chartContainerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    // Initial dimensions
    updateDimensions();

    // Event listener for resizing
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{
        height: "100%",
        width: "100%",
        maxHeight: "260px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 0px 2px 3px #99999936",
        marginTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
          width={dimensions.width} // Dynamic width
          height={Math.min(dimensions.height, 260)} // Dynamic height (capped at 400px)
        >
          {/* X-axis */}
          <VictoryAxis
            tickValues={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            label="Months"
            style={{
              axisLabel: { padding: 40 },
              tickLabels: { fontSize: 12 },
            }}
          />
          {/* Y-axis */}
          <VictoryAxis
            label="Earnings"
            dependentAxis
            tickValues={[5000, 8000, 11000, 14000, 17000, 20000]}
            tickFormat={(x) => `${x / 1000}k`}
            style={{
              axisLabel: { padding: 40 },
              tickLabels: { fontSize: 12 },
            }}
          />
          {/* Line graph */}
          <VictoryLine
            data={data}
            style={{
              data: { stroke: "#6a0dad83" },
              labels: { fontSize: 12, fill: "#6a0dad" },
            }}
            labels={({ datum }) => `$${datum.y}`}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>
      )}
    </div>
  );
};

export default MonthlyEarnings;
