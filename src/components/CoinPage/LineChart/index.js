/* eslint-disable no-unused-vars */
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Don't remove this

function LineChart({ chartData, multiAxis }) {
  const options = {
    plugins: {
      legend: {
        display: !!multiAxis, // ensures it's boolean
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      crypto1: {
        position: "left",
      },
      ...(multiAxis && {
        crypto2: {
          position: "right",
        },
      }),
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
