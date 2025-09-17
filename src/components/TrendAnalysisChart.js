import React, { useState } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  Card,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import "@fontsource/outfit";
import "@fontsource/outfit/400.css";
import '../App.css';

const TrendAnalysisChart = () => {
  const [timeRange, setTimeRange] = useState("Yearly");
  const [selectedYear, setSelectedYear] = useState("2023");

  const yearlySeries = [
    {
      name: "Conversion Rate %",
      data: [110, 209, 169, 159],
    },
    {
      name: "Rejection Rate %",
      data: [153, 136, 126, 126],
    },
    
  ];

  const quarterlyData = {
    "2023": [
      { name: "Conversion Rate %", data: [104, 153, 190, 209.09] },
      { name: "Rejection Rate %", data: [120, 125, 130, 136.11] },
      
    ],
    "2024": [
      { name: "Conversion Rate %", data: [190, 185, 155, 169.89] },
      { name: "Rejection Rate %", data: [140, 130, 165, 126.11] },
      
    ],
  };

  const chartOptions = {
    chart: { type: "line",toolbar: { show: false }, },
    stroke: { curve: "smooth", width: 2.1 },
    colors: ["#C993E6", "#46325D"],
    markers: { size: 0 },
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4"],
      title: {
        text: "Quarter Wise",//timeRange === 
        style: {
          fontSize: "12px",
          fontWeight: 600,
          color: "#3784B3",
        },
      },
    },
    yaxis: {
      title: {
        text: "Conversion Rate(%)",
        style: {
          fontSize: "12px",
          fontWeight: 600,
          color: "#3784B3",
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "13px",
      markers: { radius: 4 },
      itemMargin: { horizontal: 10, vertical: 8 },
    },
    grid: {
     borderColor: "transparent", 
     // strokeDashArray: 4,
     // xaxis: { lines: { show: true } },
     // yaxis: { lines: { show: true } },
    },
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    if (event.target.value === "Yearly") {
      setSelectedYear("");
    } else {
      setSelectedYear("2023");
    }
  };

  return (
    <Card
      sx={{
        margin:1,
        padding: 1,
        maxHeight: "281.92px",
        border: "solid 1px #e8e8e8",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.2,
        }}
      >
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
          Conversion Rate Analysis
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Select
            size="small"
            value={timeRange}
            onChange={handleTimeRangeChange}
            sx={{
              fontSize: "12px",
              borderRadius: "12px",
              maxHeight: "26px",
              maxWidth: "100px",
            }}
          >
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>

          {timeRange === "Quarterly" && (
            <Select
              size="small"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{
                fontSize: "12px",
                borderRadius: "12px",
                maxHeight: "26px",
                maxWidth: "100px",
              }}
            >
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          )}
        </Box>
      </Box>

      <Chart
        options={chartOptions}
        series={
          timeRange === "Yearly" ? yearlySeries : quarterlyData[selectedYear]
        }
        type="line"
        height={250}
      />
    </Card>
  );
};

export default TrendAnalysisChart;
