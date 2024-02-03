import React from "react";
import ReactApexCharts from "react-apexcharts";
import Navbar from "../components/Navbar.jsx";
// import BarChart from "../components/Charts/BarChart.jsx";
import Heatmap from "../components/Heatmap.jsx";
import Barchart from "../components/Barchart.jsx";
import Piechart from '../components/Piechart'

const Stats = () => {
  return (
    <div>
      <Navbar />
      <h2>User Statistics</h2>
      <div style={{ paddingTop: "5%" }}>
        <Heatmap />
        <Piechart />
        <Barchart />
      </div>
    </div>
  );
};

export default Stats;
