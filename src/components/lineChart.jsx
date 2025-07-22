import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const EarningsChart = () => {
  const chartRef = useRef(null);

  const addData = () => {
    let data = [];
    let value = 0;

    for (let i = 0; i < 10; i++) {
      value += Math.floor((Math.random()-0.2) * 1000) + 1; // Increase by a random amount (1-10)
      data.push(value);
    }

    return data;
  };

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: Array.from({ length: 10 }, (_, i) => i === 0 ? "9/13" : `9/${i + 13}`),
        datasets: [
          {
            label: "$USDC",
            data: addData(),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
          },
        ],
      },
    });

    // Destroy the chart instance when the component is unmounted
    return () => {
      chartInstance.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default EarningsChart;
