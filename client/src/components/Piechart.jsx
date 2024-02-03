import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const chartState = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <div id="chart" style={{backgroundColor: "white", height:300,
          width:400, border: "1px solid black", borderRadius:"1em"}}>
        <ReactApexChart options={chartState.options} series={chartState.series} type="pie" width={380} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
