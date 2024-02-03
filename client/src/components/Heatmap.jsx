import React, { useState, useEffect } from 'react';
import ReactApexCharts from 'react-apexcharts';

const Heatmap = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const blocksPerLine = 10;
  const lines = 3;
  const calorieTarget = 2000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newMonth = new Date().getMonth();
      if (newMonth !== currentMonth) {
        setCurrentMonth(newMonth);
      }
    }, 1000 * 60 * 60 * 24); // Check every day

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [currentMonth]);

  const series = Array.from({ length: lines }, (_, i) => ({
    name: `Line ${i + 1}`,
    data: generateData(blocksPerLine, { min: 1500, max: 2500 }, calorieTarget, currentMonth),
  }));

  const options = {
    chart: {
      type: "heatmap",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#00E396"],
    title: {
      text: "Calorie Intake Tracker",
    },
    xaxis: {
      type: "category",
      categories: Array.from({ length: blocksPerLine }, (_, i) => `Block ${i + 1}`),
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: -1,
              to: 0,
              color: "#FF4560",
              name: "target not met",
            },
            {
              from: 1,
              to: 2,
              color: "#00E396",
              name: "target met",
            },
          ],
        },
      },
    },
  };

  function generateData(count, yrange, target, month) {
    const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();
    
    return Array.from({ length: count }, (_, i) => {
      const calorieIntake =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      
      // Calculate the block index based on the number of days in the month
      const blockIndex = Math.floor((i * daysInMonth) / count) + 1;
      
      return {
        x: `Block ${blockIndex}`,
        y: calorieIntake >= target ? 1 : -1,
      };
    });
  }
  
  return (
    <div className="chart">
      <ReactApexCharts
        options={options}
        series={series}
        type="heatmap"
        height={200}
      />
    </div>
  );
};

export default Heatmap;