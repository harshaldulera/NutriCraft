import React from "react";
import ReactApexCharts from "react-apexcharts";
import Navbar from "../components/Navbar.jsx";
import BarChart from "../components/Charts/BarChart.jsx";

const Stats = () => {
  // Example data for the heatmap
  const heatmapSeries = [
    {
      name: "Daily Goal",
      data: generateHeatmapData(30, { min: 0, max: 1 }), // Assuming 30 days in a month
    },
  ];

  // Example data for the bar chart
  const barSeries = [
    {
      name: "Calorie Intake",
      data: [450, 700, 600, 800, 500, 650, 400], // Example weekly data
    },
    {
      name: "Calories Lost",
      data: [300, 400, 350, 450, 300, 400, 500], // Example weekly data
    },
  ];

  // Heatmap options
  const heatmapOptions = {
    chart: {
      type: "heatmap",
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 0,
              name: "Missed",
              color: "#ff4560",
            },
            {
              from: 1,
              to: 1,
              name: "Achieved",
              color: "#00e396",
            },
          ],
        },
      },
    },
    xaxis: {
      type: "category",
      categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
    title: {
      text: "Daily Calorie Goal Achievement",
    },
  };

  // Bar chart options
  const barOptions = {
    chart: {
      type: "bar",
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    title: {
      text: "Weekly Calorie Intake vs Calories Lost",
    },
  };

  // Function to generate heatmap data
  function generateHeatmapData(count, yrange) {
    return Array.from({ length: count }, (_, i) => ({
      x: `Day ${i + 1}`,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
    }));
  }

  return (
    <div>
      <Navbar />
      <h2>User Statistics</h2>
      <div className="heatmap">
        <ReactApexCharts
          options={heatmapOptions}
          series={heatmapSeries}
          type="heatmap"
          height={350}
        />
      </div>
      <div className="bar-chart">
        <BarChart />
      </div>
    </div>
  );
};

export default Stats;
