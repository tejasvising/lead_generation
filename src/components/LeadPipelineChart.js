import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography, Box } from '@mui/material';
import '@fontsource/outfit';

const LeadPipelineChart = () => {
  const chartOptions = {
    chart: {
      type: 'line',
      stacked: true,
      toolbar: { show: false },
      fontFamily: 'Outfit',
    },
    stroke: {
      width: [0, 0, 2],
      curve: 'straight',
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 4,
      },
    },
    colors: ['#7400B8', '#5E60CE', '#F68B28'],
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      fontSize: '12px',
      fontWeight: 500,
      markers: { radius: 4 },
    },
   
    xaxis: {
      categories: ['June', 'July', 'August', 'September'],
        
      title: {
        text: 'Month wise',
        style: {
          fontSize: '12px',
          fontWeight: 500,
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
        text: 'Deal Value (in Cr.)',
        style: {
          fontSize: '12px',
          fontWeight: 500,
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
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
    show: true,
    borderColor: 'transparent',
    xaxis: {
      lines: {
        show: false, // hide vertical lines
      },
    },
    yaxis: {
      lines: {
        show: false, // hide horizontal lines
      },
    },
  },
  };

  const chartSeries = [
    {
      name: 'Committed Leads',
      type: 'column',
      data: [10, 6, 8, 12],
    },
    {
      name: 'Likely to Close',
      type: 'column',
      data: [5, 6, 7, 9],
    },
    {
      name: 'Target',
      type: 'line',
      data: [7, 11, 15, 21],
    },
  ];

  return (
    <Card sx={{ margin:1, border:'solid 1px #e8e8e8', maxHeight:'290px'}}>
      <CardContent>
        <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                    margin: 0,
                      fontFamily: "'Outfit', sans-serif",
                  }}
                >
          Lead Pipeline Forecasting
        </Typography>
        <Box>
          <Chart
            options={chartOptions}
            series={chartSeries}
            height={250}
          //  width={350}
            type="line"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeadPipelineChart;
