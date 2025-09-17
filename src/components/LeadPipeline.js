import React from "react";
import Chart from "react-apexcharts";
import { Modal,Box,Card, Typography, Select, MenuItem ,IconButton} from "@mui/material";

const RiskBorrowerChart = () => {
  const series = [
    {
      name: "Applications",
      data: [25,
        13,
        17,
        9
        
        ],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 900,
      width:300,
      toolbar: {
        show: false,
      },
    },
    grid: {
        show: true,
       // borderColor: 'transparent',
        strokeDashArray: 4,
        padding: {
        //  bottom: 35, // add padding at bottom to avoid overlap
        },
      },
    colors: ["#552586", "#6A359C", "#804FB3", "#B589D6"],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '45%',
      },
    },
    dataLabels: {
      enabled: false,
      position: 'top', // Show labels on top of bars
      style: {
        fontSize: "10px",  // smaller font
        fontWeight: 400,   // lighter weight
        colors: ["#000"],  // dark text for visibility
      },
      offsetY: -6, // Pull the label up a bit above the bar
    },
    
    xaxis: {
      categories: [
        "Converted",
        "On Hold",
        "In Progress",
        "Rejected",
       
      ],
      labels: {
        rotate: -90, // rotates labels for better readability
        style: {
          fontSize: "8.98px",
          whiteSpace: "nowrap",
        },
      },
      title: {
        text: "Status",
       // offsetY: 20,
      },
    },
    
    yaxis: {
      title: {
        text: "Applications",
      },
    },
    
    // title: {
    //   text: 'Top 5 "At Risk" Borrower',
    //   align: 'left',
    //   style: {
    //     fontSize: '16px',
    //     fontWeight: 600,
    //   },
    // },
    legend: {
      show: false,
    },
  };

  return (
    <Card
      sx={{
        margin:1,
        paddingLeft:1,
        paddingRight:1,
        paddingTop:1,
       // maxHeight:'262.92px',
        border:'solid 1px #e8e8e8',
      }}
    >
    <Box style={{ background: "#fff", //padding: "1rem",
     borderRadius: "8px" }}>
      {/* Replace this with your dropdown if needed */}
    
   
        <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                //  mb: "1%",
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
                  Leads in Pipeline
                </Typography>
                
              </Box>
     
      <Chart options={options} series={series} type="bar"  height={235}
     />
    </Box></Card>
  );
};

export default RiskBorrowerChart;
