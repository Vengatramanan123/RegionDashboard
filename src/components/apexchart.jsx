import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [series, setSeries] = useState([{
    name: "Monthly Sales",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Sales Percentage Chart',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], 
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
