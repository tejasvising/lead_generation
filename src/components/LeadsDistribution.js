import React, { useState, useEffect, useMemo } from "react";
import Chart from "react-apexcharts";
import {
  Modal,
  Box,
  Card,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";

import "@fontsource/outfit";
import "@fontsource/outfit/400.css";
import "../App.css"; // Assuming this path is correct in the user's environment

import CloseIcon from "@mui/icons-material/Close";
import { Agriculture } from "@mui/icons-material"; // Not used in the provided snippet, but kept as it was there.
//import EWSPopupHigh from "../../Popups/EWSPopupHigh"; // Commented out as in original
//import EWSPopupLow from "../../Popups/EWSPopupLow"; // Commented out as in original
//import EWSPopupMedium from "../../Popups/EWSPopupMedium"; // Commented out as in original

const API_URL = process.env.REACT_APP_API_BASE_URL; // Assuming this is correctly configured

const EWSClassificationChart = () => {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [donutData, setDonutData] = useState({
    overallCount: 0,
    overallExposure: 0,
    countHigh: 0,
    countLow: 0,
    countMedium: 0,
    exposureLow: 0,
    exposureMedium: 0,
    exposureHigh: 0,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedSection(null);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    minWidth: 400,
    width: "90%",
    outline: "none",
  };

  // Fetch data for the donut chart from the API
   // Empty dependency array means this effect runs once on mount

  // Categories for the "Deal Size" donut chart
 const dealSizeGraphData = {
  categories: ['50', '100', '150', '200'],
  series: [
    {
      name: 'No. of Applications',
      data: [19, 10, 30, 22],
    },
  ],
  totalBorrowers: 81,
};


  // Data for both tabs (Deal Size and Sector Wise)
  const tabData = [
    {
      title: "Deals",
      categories: ['50', '100', '150', '200'],
      colors: ['#552586', '#6A359C', '#804FB3', '#B589D6'],
      // percentages: [
      //   ((donutData.exposureHigh / donutData.overallExposure) * 100).toFixed(2),
      //   ((donutData.exposureMedium / donutData.overallExposure) * 100).toFixed(2),
      //   ((donutData.exposureLow / donutData.overallExposure) * 100).toFixed(2),
      // ],
    //  totalExposure: donutData.overallExposure + "Cr.",
     // totalBorrowers: donutData.overallCount,
     // categories: categories,
    },
    {
      title: "Sectors",
      totalExposure: "980 Cr.", // Hardcoded as per original, could be dynamic if API available
      totalBorrowers: 28, // Hardcoded as per original, could be dynamic if API available
      categories: [
        { label: "Trading", count: 25, color: "#7400B8" },
        { label: "Manufacturing", count: 21, color: "#6930C3" },
        { label: "Healthcare", count: 9, color: "#5E60CE" },
        { label: "Construction", count: 18, color: "#56CFE1" },
        { label: "Agriculture", count: 13, color: "#5AEDC9" },
      ],
    },
  ];

   const activeData = tabValue === 0
  ? { totalBorrowers: dealSizeGraphData.totalBorrowers }
  : tabData[tabValue];

 

  // Series data for the "Sector Wise" bar chart, derived from tabData
  const sectorWiseSeries = useMemo(() => {
    return [{
      name: 'Applications',
      data: tabData[1].categories.map(c => c.count),
    }];
  }, [tabData]); // Recompute if tabData changes

  // Chart options for both donut and bar charts, memoized for performance
  const chartOptions = useMemo(() => {
  if (tabValue === 0) {
    return {
      chart: {
        type: 'bar',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          distributed: true, // 👈 THIS IS THE KEY
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: dealSizeGraphData.categories,
        title: {
          text: 'Deal Size (In Cr.)',
          style: { fontSize: '12px', fontFamily: 'Outfit' },
        },
      },
      yaxis: {
        title: {
          text: 'No. of Applications',
          style: { fontSize: '12px', fontFamily: 'Outfit' },
        },
      },
      colors: ['#552586', '#6A359C', '#804FB3', '#B589D6'], // One for each bar
      grid: {
        show: true,
        borderColor: '#f0f0f0',
        strokeDashArray: 7,
      },
    };
  
  } else {
    // Sector Wise bar chart
    return {
      chart: {
        type: 'bar',
        toolbar: { show: false },
        fontFamily: 'Outfit',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (_, { dataPointIndex }) {
          return tabData[1].categories[dataPointIndex].count;
        },
        style: {
          fontSize: '12px',
          fontFamily: 'Outfit',
          fontWeight: 500,
          colors: ['#fff'],
        },
        offsetX: -20,
      },
      xaxis: {
        categories: tabData[1].categories.map(c => c.label),
        title: {
          text: 'Number of Applications',
          style: { fontSize: '12px', fontFamily: 'Outfit' },
        },
        labels: {
          style: { fontSize: '12px', fontFamily: 'Outfit' },
        },
      },
      yaxis: {
        title: {
          text: 'Sectors',
          style: { fontSize: '12px', fontFamily: 'Outfit' },
        },
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Outfit',
            colors: ['#333'],
          },
        },
      },
      colors: tabData[1].categories.map(c => c.color),
      grid: {
        borderColor: 'transparent',
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: false } },
      },
      tooltip: { enabled: true },
    };
  }
}, [tabValue, tabData]);

  return (
    <Card
      sx={{
        margin:1,
        padding: 1,
        maxHeight: "285px",
        border: "solid 1px #e8e8e8",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
         // mb: "1%",
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
          Leads Distribution
        </Typography>
        <Select
          size="small"
          defaultValue="Monthly"
          sx={{
            fontSize: "12px",
            padding: 0,
            borderRadius: "12px",
            maxHeight: "26px",
            maxWidth: "100px",
          }}
        >
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Quarterly">Quarterly</MenuItem>
          <MenuItem value="Yearly">Yearly</MenuItem>
        </Select>
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        TabIndicatorProps={{ style: { backgroundColor: "#800080" } }}
        textColor="purple"
        sx={{
          minHeight: "32px",
          //marginBottom: 1,
          "& .MuiTab-root": {
            fontSize: "13px",
            minHeight: "32px",
            color: "#555",
          },
          "& .Mui-selected": {
            color: "#800080",
            fontWeight: 600,
          },
        }}
      >
        <Tab label="Deal Size" sx={{ textTransform: "none", fontFamily: 'Outfit' }} />
        <Tab label="Sector Wise" sx={{ textTransform: "none", fontFamily: 'Outfit' }} />
      </Tabs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{
          flex: 1, display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Chart
            options={chartOptions}
            series={tabValue === 0 ? dealSizeGraphData.series : sectorWiseSeries}
            type={tabValue === 0 ? "bar" : "bar"}
            height={tabValue === 0 ? 230 : 220}
            width={tabValue === 0 ? 330 : 350}
          />
        </Box>

      </Box>

      <Box
        sx={{
          mt: "4.1%",
          ml: "8%",
          fontSize: "14px",
          color: "#555",
        }}
      >
        Total Borrowers:<strong> {activeData.totalBorrowers}</strong>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          {/* {selectedSection === "High Risk" ? (
            <EWSPopupHigh />
          ) : selectedSection === "Medium" ? (
            <EWSPopupMedium />
          ) : selectedSection === "Low Risk" ? (
            <EWSPopupLow />
          ) : null} */}
        </Box>
      </Modal>
    </Card>
  );
};

export default EWSClassificationChart;