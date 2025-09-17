import {React,useState,useEffect} from "react";
import Chart from "react-apexcharts";
import { Modal,Box,Card, Typography, Select, MenuItem ,IconButton} from "@mui/material";

import "@fontsource/outfit"; // Defaults to weight 400
import "@fontsource/outfit/400.css"; 
import '../App.css'
//import ActionableTable from "../Actionable/ActionableTable";
import CloseIcon from "@mui/icons-material/Close";
import EWSPopupHigh from "./Popups/EWSPopupHigh";
import EWSPopupLow from "./Popups/EWSPopupLow";
import EWSPopupMedium from "./Popups/EWSPopupMedium";
const API_URL=process.env.REACT_APP_API_BASE_URL;
const user_ID=process.env.REACT_APP_USERNAME;
const EWSClassificationChart = () => {
  const [donutData,setDonutData]=useState({
    overallCount:0,
    overallExposure:0,
    countHigh:0,
    countLow:0,
    countMedium:0,
    exposureLow:0,
    exposureMedium:0,
    exposureHigh:0,
  })
  const chartSeries = [117, 93, 101]; // in Cr
  const percentages = [((donutData.exposureHigh/donutData.overallExposure)*100).toFixed(2), ((donutData.exposureMedium/donutData.overallExposure)*100).toFixed(2), ((donutData.exposureLow/donutData.overallExposure)*100).toFixed(2)];
  const [open, setOpen] = useState(false);
  const [activeData, setActiveData] = useState(null);
  const categories = [
    { label: "Hot Leads", count: 53, color: "#F72585" },
    { label: "Warm Leads", count: 10, color: "#7209B7" },
    { label: "Cold Leads", count: 26, color: "#9667E0" },
  ];
  
useEffect(() => {
    const fetchData = async () => {
        try {
            const responseHigh = await fetch(`${API_URL}/donutReport/${window.parent.userName}/high`); //${window.parent.userName}
            if (!responseHigh.ok) {
                throw new Error('Failed to fetch data');
            }
            const dataHigh = await responseHigh.json();
            var exposureHigh=0;
            for(let i=0;i<dataHigh.length;i++){
              exposureHigh+=Number(dataHigh[i].exposure);
            }
            const responseMedium = await fetch(`${API_URL}/donutReport/${window.parent.userName}/medium`); //${window.parent.userName}
            if (!responseMedium.ok) {
                throw new Error('Failed to fetch data');
            }
            const dataMedium = await responseMedium.json();
            var exposureMedium=0;
            for(let i=0;i<dataMedium.length;i++){
              exposureMedium+=Number(dataMedium[i].exposure);
            }
            const responseLow = await fetch(`${API_URL}/donutReport/${window.parent.userName}/low`); //${window.parent.userName}
            if (!responseLow.ok) {
                throw new Error('Failed to fetch data');
            }
            const dataLow = await responseLow.json();
            var exposureLow=0;
            for(let i=0;i<dataLow.length;i++){
              exposureLow+=Number(dataLow[i].exposure);
            }
            setDonutData({
               overallCount:dataLow.length+dataMedium.length+dataHigh.length,
    overallExposure:Number(((exposureHigh+exposureLow+exposureMedium)/10000000).toFixed(2)),
    countHigh:dataHigh.length,
    countLow:dataLow.length,
    countMedium:dataMedium.length,
    exposureLow:Number((exposureLow / 10000000).toFixed(2)),
    exposureMedium:Number((exposureMedium / 10000000).toFixed(2)),
    exposureHigh:Number((exposureHigh / 10000000).toFixed(2)),
            })
           // setData(data);
        } catch (error) {
            console.error('Error:', error);
          //  setData([]);
        }
    };
  
    fetchData();
  }, []);

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
    width:'90%',
    outline:'none'
  };
  const handleClick = (entry) => {
    setActiveData(entry);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const chartOptions = {
    chart: { type: "donut",
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const index = config.dataPointIndex;
          if (index !== -1) {
            const selectedLabel = categories[index].label;
            setSelectedSection(selectedLabel);
            setOpen(true);
          }
        },
      },
     },
    labels: categories.map((c) => c.label),
    colors: categories.map((c) => c.color),
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            
            total: {
              show: true,
              label: "Total Exposure",
              fontSize: "14px",
              
              formatter: () => //donutData.overallExposure+
              "311 Cr.",
              
            },
             value: {
          show: true,
          formatter: function (val) {
            return `${val} Cr.`;  // 👈 This adds the "Cr." suffix
          },
        },
          },
        },
      },
    },
    stroke: { width: 0 },
    tooltip: {
      y: {
        formatter: (val, opts) => {
          return `${val} Cr. (${percentages[opts.seriesIndex]}%)`;
        },
      },
    },
  };

  const [selectedSection, setSelectedSection] = useState(null);

    const handleSelect = ({ chartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length > 0) {
            // Get the selected section label
            const selectedLabel = categories[selection[0].row + 1][0];
            console.log(selectedLabel);
            setSelectedSection(selectedLabel);
        }
    };
  return (
    <Card
      sx={{
        margin:1,
        padding:1,
        maxHeight:'285px',
        minHeight:'285px',
        border:'solid 1px #e8e8e8',
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "4%",
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
          Lead Propensity (Profiling)
        </Typography>
        {/* <Select
          size="small"
          defaultValue="Monthly"
          sx={{ fontSize: "12px", padding: 0,borderRadius:'12px',maxHeight:'26px',maxWidth:'100px' }}
        >
          <MenuItem sx={{ fontSize: "12px", padding: 0.1,maxHeight:'26px',maxWidth:'100px' }} value="Monthly">Monthly</MenuItem>
          <MenuItem sx={{ fontSize: "12px", padding: 0.1,maxHeight:'26px',maxWidth:'100px' }} value="Quarterly">Quarterly</MenuItem>
          <MenuItem sx={{ fontSize: "12px", padding: 0.1,maxHeight:'26px',maxWidth:'100px' }} value="Yearly">Yearly</MenuItem>
        </Select> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            height={170}
            width={180}
            //onClick={handleClick}
           // chartEvents={[{ eventName: 'select', callback: handleSelect }]}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            ml: 2,
            fontSize: "13px",
            color: "#444",
          }}
        >
          {categories.map((cat, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: "22px",
              }}
            >
              <Box
                sx={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "3px",
                  backgroundColor: cat.color,
                  mr: "8px",
                }}
              />
              <span>
                {cat.label} ({cat.count}): <strong>{chartSeries[index]}cr 
                </strong>
              </span>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          mt: "4.1%",
          ml:'8%',
          fontSize: "14px",
          color: "#555",
          
        }}
      >
       Total Leads:<strong> 89 {/* {donutData.overallCount} */}
          </strong> 
      </Box>

      <Modal open={open} onClose={handleClose}>

        <Box sx={modalStyle}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
         {selectedSection==='Hot Leads' ?(<EWSPopupHigh/>):
         selectedSection==='Warm Leads'?(<EWSPopupMedium/>):
        selectedSection==='Cold Leads'?(<EWSPopupLow/>):null}
        </Box>
      </Modal>
    </Card>
  );
};

export default EWSClassificationChart;
