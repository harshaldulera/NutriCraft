import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Barchart = () => {
  const [chartState] = useState({
    series: [
      {
        name: 'Calorie Intake',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: 'Calorie burnt',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
     
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: 'Calories',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    },
  });

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={350}
          width={1000}
         />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Barchart;
