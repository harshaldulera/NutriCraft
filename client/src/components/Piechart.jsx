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
      labels: ['Calories', 'Protein', 'Carbs', 'Sugar', 'Fats'],
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
      <div className="bg-white shadow rounded-lg p-4 mb-6"  style={{ height: 300 }}>
        <ReactApexChart options={chartState.options} series={chartState.series} type="pie" width={400} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
