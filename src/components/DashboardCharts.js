import React, { useState } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  
  Typography,
  Paper,
  Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "@fontsource/outfit"; // Defaults to weight 400
import "@fontsource/outfit/400.css"; 
import CloseIcon from "@mui/icons-material/Close";
import PyramidChart from './PyramidChart'
import '../App.css'
const BOX_WIDTH = 500;

const boxStyle = {
   width: `${BOX_WIDTH}px`,
  p: 1,
//  m:1,
 // borderRadius: 4,
 // boxShadow: 3,
  height: 300,
 // margin: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  position: "relative",
 
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const purple = "#A65EFF",
  deepPurple = "#5A18CC",
  orange = "#FFA500";

const getCombinedData = (type) => {
  switch (type) {
    case "RM Performance":
      return [
        { name: "Rohit Sen", leads: 10, dropped: 3, total:13,conversion: "77%" },
        { name: "Priya Nair", leads: 13, dropped: 4,total:17, conversion: "76%" },
        { name: "Srinivas N", leads: 15, dropped: 5, total:20,conversion: "75%" },
        { name: "Sushant Mukherjee", leads: 10, dropped: 4, total:14,conversion: "71%" },
        { name: "Rupam Joshi", leads: 21, dropped: 9, total:30,conversion: "70%" },
      ];
    case "Lead Source":
      return [
        { source: "RM Sourced", applications: 50 ,conversion:60},
        { source: "DSA", applications: 20,conversion:62 },
        { source: "Referrals", applications: 40,conversion:66 },
        { source: "Campaigns", applications: 25,conversion:25 },
        { source: "Partner", applications: 15,conversion:69 },
      ];
    case "Sectors":
      return [
        { sector: "Trading", dealSize: 10021,dropped:10912,total:20933,conversion:48 },
        { sector: "Services", dealSize: 6942,dropped:6833,total:13775 ,conversion:50 },
        { sector: "Manufacturing of Other Products", dealSize: 8253,dropped:5172,total:13425,conversion: 61 },
        { sector: "CRE", dealSize: 5417,dropped: 5245,total:10662,conversion:51 },
        { sector: "Heavy Engineering", dealSize: 6793,dropped: 3550,total:10343,conversion: 66},
      ];
    case "Region Wise":
      return [
        { region: "A & Above", leads: 256, converted: 188, conversion: "73%" ,dropped:68},
        { region: "BBB- to BBB+", leads: 112, converted: 44, conversion: "39%",dropped:68 },
        { region: "Below BBB-", leads: 27, converted: 2, conversion: "7%",dropped:25 },
        { region: "Not Rated", leads: 5, converted: 2, conversion: "40%",dropped:3 },
      ];
    default:
      return [];
  }
};

export default function DashboardCharts() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleDrill = (type) => {
    setModalType(type);
    setOpen(true);
  };

const rmPerf = {
  options: {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: "Outfit",
    },
    xaxis: {
      categories: ["Rohit Sen", "Priya Nair", "Srinivas N", "Sushant", "Rupam Joshi"],
      labels: {
        style: { fontFamily: "Outfit" },
      },
      title: {
        text: 'RM Name',
      },
    },
    stroke: {
      width: [0, 0, 3],
      curve: "smooth",
    },
    yaxis: [
      {
        seriesName:'Leads Converted',
        title: {
          text: "Leads",
          style: { fontFamily: "Outfit" },
        },
        labels: {
          style: { fontFamily: "Outfit" },
        },
        min: 0,
        max: 30, // Added this to accommodate both bars
      },
      {
      seriesName: 'Leads Converted',
      show: false
    },
      {
        opposite: true,
        seriesName:'Conversion Rate',
        title: {
          text: "Conversion Rate (%)",
          style: { fontFamily: "Outfit" },
        },
        labels: {
          style: { fontFamily: "Outfit" },
        },
        min: 0,
        max: 100
      },
    ],
    colors: ["#592E83", "#9984D4", "#FFAE03"],
    grid: {
      show: true,
      strokeDashArray: 4,
      xaxis: {
        lines: { show: false },
      },
      yaxis: {
        lines: { show: false },
      },
    },
    legend: {
      show: false,
    }
  },
  series: [
    {
      name: "Leads Converted",
      type: "column",
      data: [10, 13, 15, 10, 21],
    },
    {
      name: "Leads Dropped",
      type: "column",
      data: [3, 4, 5, 4, 9],
    },
    {
      name: "Conversion Rate",
      type: "line",
      data: [77, 76, 75, 71, 70],
    },
  ],
};

 





const leadSrc = {
  options: {
    chart: {
      type: "bar",
      height: 250, // 🔥 Increased height to create more space between bars
     // width:100,
      toolbar: {
        show: false,
      },
    },
    colors: ["#482E77", "#631DB0", "#883BD5", "#A062DD", "#CFB1EE"],
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: "80%", // 🔥 Kept same — bar thickness unchanged
        // No direct barGap, but height increase adds spacing
      },
    },
    dataLabels: {
      enabled: false, // Already removed
    },
    xaxis: {
      categories: ["Bank RM", "Customer Referral", "Digital Campaigns", "Corporate Portal", "DSA"],
      title: {
        text: "Count of Leads",
      },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily:'Outfit'
        },
      },
    },
    yaxis: {
      title: {
        text: "Source",
      },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily:'Outfit'
        },
        // Optional: Add padding to increase visual spacing
        offsetY: 5, // Slight shift to help spacing
      },
    },
    grid: {
      borderColor: "transparent",
      strokeDashArray: 0,
    },
    legend: {
      show: false,
    },
  },
  series: [{ name: "Applications", data: [120, 74, 56, 32, 32] }],
};

  const sectors = {
    options: {
      chart: { id: "sectors", toolbar: { show: false }, type: "bar" },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          barHeight: '80%',
          isFunnel: true,
          distributed: true
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ": " + val;
        },
      },
      xaxis: {
        categories: [
          "Trading",
          "Services",
          "Manufacturing",
          "CRE",
          "Heavy Engineering",
        ],
         offsetX: 0,  
      },
     
      colors: ["#3C0663", "#5A108F", "#6818A5", "#8B2FC9", "#BD68EE"],
      legend: {
        show: false,
      },
    },
    series: [
      {
        name: "Deal Size",
        data: [20933, 13775, 13425, 10662, 10343],
      },
    ],
  };

  const region = {
  options: {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: "Outfit",
    },
    
    xaxis: {
      categories: ["A & Above", "BBB- to BBB+", "Below BBB-", "Not Rated"],
      labels: {
        style: { fontFamily: "Outfit" },
      },
      title: {
        text: 'Rating Wise',
      },
    },
    stroke: {
      width: [0, 0, 3],
      curve: "smooth",
    },
    yaxis: [
      {
        seriesName:'Converted',
        title: {
          text: "Industry",
          style: { fontFamily: "Outfit" },
        },
        labels: {
          style: { fontFamily: "Outfit" },
        },
      },
      {
        seriesName:'Converted',
        show:false
      },
      {
        opposite: true,
        seriesName:'Conversion Rate(%)',
        title: {
          text: "Conversion Rate (%)",
          style: { fontFamily: "Outfit" },
        },
        labels: {
          style: { fontFamily: "Outfit" },
        },
      },
    ],
    colors: ["#592E83", "#9984D4", "#FFAE03"],
    grid: {
      show: true,
      strokeDashArray: 4,
      xaxis: {
        lines: { show: false },
      },
      yaxis: {
        lines: { show: true },
      },
    },
    legend: {
 show:false,
},

responsive: [
  {
    breakpoint: 480,
    options: {
      legend: {
        fontSize: '9px',
        itemMargin: { horizontal: 4 },
      },
    },
  },
],


  },
  series: [
    { name: "Converted", type: "column", data: [188, 44, 2, 2] },
    { name: "Dropped", type: "column", data: [68, 68, 25, 3] },
    { name: "Conversion Rate(%)", type: "line", data: [73, 39, 7, 40] },
  ],
};



  const renderTable = () => {
    const data = getCombinedData(modalType);
    switch (modalType) {
      case "RM Performance":
        return (
          <Table>
  <TableHead>
    <TableRow
      sx={{
        fontFamily: 'Outfit',
        fontSize: '14px',
        backgroundColor: '#F9F2FD',
        fontWeight: 600,
      }}
    >
      {['Name', 'Leads Converted', 'Leads Dropped', 'Total Leads', 'Conversion Rate(%)'].map((header, idx) => (
        <TableCell
          key={idx}
          sx={{ fontFamily: 'Outfit', padding: '6px 12px' }} // reduced padding
        >
          {header}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((r, i) => (
      <TableRow
        key={i}
        sx={{
          backgroundColor: i % 2 === 0 ? '#ffffff' : '#FAF8FB',
          fontFamily: 'Outfit',
          fontSize: '10px',
        }}
      >
        <TableCell sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.name}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>
          {r.leads}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>
          {r.dropped}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>
          {r.total}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>
          {r.conversion}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

        );
      case "Lead Source":
        return (
          <Table>
  <TableHead>
    <TableRow
      sx={{
        fontFamily: 'Outfit',
        fontSize: '14px',
        backgroundColor: '#F9F2FD',
        fontWeight: 600,
      }}
    >
      <TableCell sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Source</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Count of Leads</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Conversion Rate(%)</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((r, i) => (
      <TableRow
        key={i}
        sx={{
          backgroundColor: i % 2 === 0 ? '#ffffff' : '#FAF8FB',
          fontFamily: 'Outfit',
          fontSize: '10px',
        }}
      >
        <TableCell sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.source}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.applications}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.conversion}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
        );
      case "Sectors":
        return (
          <Table>
  <TableHead>
    <TableRow
      sx={{
        fontFamily: 'Outfit',
        fontSize: '14px',
        backgroundColor: '#F9F2FD',
        fontWeight: 600,
      }}
    >
      <TableCell sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Industry</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Converted</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Dropped</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Total</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Conversion Rate(%)</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((r, i) => (
      <TableRow
        key={i}
        sx={{
          backgroundColor: i % 2 === 0 ? '#ffffff' : '#FAF8FB',
          fontFamily: 'Outfit',
          fontSize: '10px',
        }}
      >
        <TableCell sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.sector}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.dealSize}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.dropped}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.total}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.conversion}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
        );
      case "Region Wise":
        return (
          <Table>
  <TableHead>
    <TableRow
      sx={{
        fontFamily: 'Outfit',
        fontSize: '14px',
        backgroundColor: '#F9F2FD',
        fontWeight: 600,
      }}
    >
      <TableCell sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Industry</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Converted</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Dropped</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Total</TableCell>
      <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '6px 12px' }}>Conversion Rate (%)</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((r, i) => (
      <TableRow
        key={i}
        sx={{
          backgroundColor: i % 2 === 0 ? '#ffffff' : '#FAF8FB',
          fontFamily: 'Outfit',
          fontSize: '10px',
        }}
      >
        <TableCell sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.region}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.converted}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.dropped}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.leads}</TableCell>
        <TableCell align="center" sx={{ fontFamily: 'Outfit', padding: '4px 12px' }}>{r.conversion}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
        );
      default:
        return null;
    }
  };

  return (
     <Box
      sx={{
      
        // no extra left margin here; MainLayout should handle sidebar offset
        p:1,
        display: "grid",
        gridTemplateColumns: `repeat(2, ${BOX_WIDTH}px)`,
        columnGap: 3,
        rowGap: 2,
        justifyContent: "space-between",   // center the two‑column grid
        backgroundColor:'#F5F5F5',
        height:'100%'
      }}
    >
        {[
          { title: "Top 5 RM Performance", config: rmPerf, type: "RM Performance", chartType: "line" },
          { title: "Top 5 Lead Source (By Count)", config: leadSrc, type: "Lead Source", chartType: "bar" },
          { title: "Top 5 Sectors by Total Deal Size", config: sectors, type: "Sectors", chartType: "bar" },
          { title: "Conversion by Rating", config: region, type: "Region Wise", chartType: "line" },
        ].map((item, i) => (
          
            <Paper sx={boxStyle}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontSize: "16px",
                            fontWeight: "bold",
                            color: "#333",
                            mb: 1,
                            fontFamily: "'Outfit', sans-serif",}}>{item.title}</Typography>
                <IconButton onClick={() => handleDrill(item.type)} sx={{ color: purple }}>
                  <VisibilityIcon />
                </IconButton>
              </Box>
              {/* {item.type=='Sectors'<PyramidChart/>?  <Chart
            options={item.config.options}
            series={item.config.series}
            type={item.chartType}
            height={250}
           
          /> } */}
             <Chart
            options={item.config.options}
            series={item.config.series}
            type={item.chartType}
            height={215}
           
          /> 
          {item.type=='RM Performance' &&(
         <Box display="flex" justifyContent="center" alignItems="center"  gap={2}>
  <Box display="flex" alignItems="center">
    <Box
      sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#592E83', mr: 1 }}
    />
    <Typography fontSize="12px">Leads Converted</Typography>
  </Box>

  <Box display="flex" alignItems="center">
    <Box
      sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#9984D4', mr: 1 }}
    />
    <Typography fontSize="12px">Leads Dropped</Typography>
  </Box>

  <Box display="flex" alignItems="center">
    <Box
      sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FFAE03', mr: 1 }}
    />
    <Typography fontSize="12px">Conversion Rate</Typography>
  </Box>
</Box>)}
{item.type=='Region Wise' &&(
        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
  <Box display="flex" alignItems="center">
    <Box
      sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#592E83', mr: 1 }}
    />
    <Typography fontSize="12px">Converted</Typography>
  </Box>

  <Box display="flex" alignItems="center">
    <Box
      sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#9984D4', mr: 1 }}
    />
    <Typography fontSize="12px">Dropped</Typography>
  </Box>

  <Box display="flex" alignItems="center">
    <Box
      sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FFAE03', mr: 1 }}
    />
    <Typography fontSize="12px">Conversion Rate(%)</Typography>
  </Box>
</Box>)}
            </Paper>
         
        ))}
        

     

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
           <Box sx={{ display: "flex", justifyContent: "flex-end", }}> 
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ fontSize: "16px",
                            fontWeight: "bold",
                            color: "#333",
                            mb: 1,
                            fontFamily: "'Outfit', sans-serif",}} gutterBottom>
            {modalType}
          </Typography>
         
          {renderTable()}
          {/* <Box mt={2} textAlign="right">
            <IconButton onClick={() => setOpen(false)}>❌</IconButton>
          </Box> */}
        </Box>
      </Modal>
    </Box>
  );
}