import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [series, setSeries] = useState([44, 55, 67, 83]);
  const [options, setOptions] = useState({
    chart: {
      height: 250,
      type: 'pie',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return 249;
            }
          }
        }
      }
    },
    labels: ['Mobile', 'Laptops', 'Desktop', 'MacBook'],
  });

  return (
    <div>
      <div id="chart">
        <span className='fw-bold'>Device Usage</span>
        <ReactApexChart options={options} series={series} type="pie" height={250} />
      </div>
    </div>
  );
};

export default ApexChart;
