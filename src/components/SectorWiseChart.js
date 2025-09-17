import React from 'react';
import Chart from 'react-apexcharts';

const SectorWiseChart = () => {
  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'Outfit',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit',
        fontWeight: 500,
        colors: ['#fff'],
      },
    },
    xaxis: {
      categories: ['Trading', 'Manufacturing', 'Healthcare', 'Construction', 'Agriculture'],
      title: {
        text: 'Number of Applications',
        style: {
          fontSize: '12px',
          fontFamily: 'Outfit',
        },
      },
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Outfit',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Sectors',
        style: {
          fontSize: '12px',
          fontFamily: 'Outfit',
        },
      },
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Outfit',
        },
      },
    },
    colors: ['#6A0DAD', '#7A3DD0', '#5D65CB', '#27D1C8', '#59E6D4'],
    grid: {
      borderColor: 'transparent',
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: false } },
    },
    tooltip: {
      enabled: true,
    },
  };

  const series = [
    {
      name: 'Applications',
      data: [25, 21, 9, 18, 13],
    },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 500 }}>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default SectorWiseChart;
