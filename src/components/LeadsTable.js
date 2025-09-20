import {React,useState,useEffect} from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  InputBase,
  InputAdornment,
  Select,
  MenuItem,
  Chip,
  Button,
  IconButton,
  TablePagination,
  CircularProgress
} from "@mui/material";
import "@fontsource/outfit"; // Defaults to weight 400
import "@fontsource/outfit/400.css"; 
import '../App.css'
import SearchIcon from '@mui/icons-material/Search'
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';

import axios from 'axios';
const apiURL=process.env.REACT_APP_API_BASE_URL;

/*const data = [
  {
    branch: "Delhi",
    cif: "8NA2323A",
    dateOpened: "15/11/2024",
    borrower: "Delta Logistics Pvt Ltd.",
    pendency: "Self",
    openTriggers: 2,
    daysOpen: 2,
    exposure: "25 Cr.",
    priority: "High",
  },
  {
    branch: "Noida",
    cif: "8NA2456A",
    dateOpened: "12/10/2024",
    borrower: "Horizon Financial Services",
    pendency: "Credit",
    openTriggers: 1,
    daysOpen: 1,
    exposure: "17 Cr.",
    priority: "Medium",
  },
  {
    branch: "Gurgaon",
    cif: "8NA2356B",
    dateOpened: "22/10/2024",
    borrower: "Tech Investments Inc.",
    pendency: "Self",
    openTriggers: 3,
    daysOpen: 2,
    exposure: "12 Cr.",
    priority: "Low",
  },
  {
    branch: "Mumbai",
    cif: "8NA2132T",
    dateOpened: "01/01/2025",
    borrower: "Green Energy Solutions",
    pendency: "Self",
    openTriggers: 4,
    daysOpen: 2,
    exposure: "30 Cr.",
    priority: "Medium",
  },
  {
    branch: "Bangalore",
    cif: "8NA2233Y",
    dateOpened: "24/01/2025",
    borrower: "Skyline Developers",
    pendency: "Credit",
    openTriggers: 5,
    daysOpen: 3,
    exposure: "10 Cr.",
    priority: "Low",
  },
  {
    branch: "Chennai",
    cif: "8NA2322D",
    dateOpened: "13/02/2025",
    borrower: "Innovative Tech Co.",
    pendency: "Credit",
    openTriggers: 3,
    daysOpen: 1,
    exposure: "8 Cr.",
    priority: "High",
  },
  {
    branch: "Kolkata",
    cif: "8NA1242Q",
    dateOpened: "17/03/2025",
    borrower: "Creative Media Agency",
    pendency: "Approver",
    openTriggers: 2,
    daysOpen: 2,
    exposure: "9 Cr.",
    priority: "Low",
  },
  {
    branch: "Pune",
    cif: "8NA1260Q",
    dateOpened: "20/03/2025",
    borrower: "HealthWave Solutions",
    pendency: "Self",
    openTriggers: 1,
    daysOpen: 4,
    exposure: "5 Cr.",
    priority: "Low",
  },
  {
    branch: "Ahmedabad",
    cif: "8NA1242Q",
    dateOpened: "23/03/2025",
    borrower: "Eco Venture Ltd.",
    pendency: "Self",
    openTriggers: 5,
    daysOpen: 6,
    exposure: "6 Cr.",
    priority: "Medium",
  },
  {
    branch: "Hyderabad",
    cif: "8NA2233D",
    dateOpened: "13/07/2025",
    borrower: "Blue Northern Holdings",
    pendency: "Self",
    openTriggers: 4,
    daysOpen: 5,
    exposure: "5 Cr.",
    priority: "Low",
  },
  {
    branch: "Jaipur",
    cif: "8NA2245S",
    dateOpened: "10/02/2025",
    borrower: "Future Tech Enterprises",
    pendency: "Approver",
    openTriggers: 2,
    daysOpen: 3,
    exposure: "9 Cr.",
    priority: "High",
  },
  {
    branch: "Lucknow",
    cif: "8NA1243S",
    dateOpened: "10/03/2025",
    borrower: "Global Consultants",
    pendency: "Credit",
    openTriggers: 1,
    daysOpen: 2,
    exposure: "5 Cr.",
    priority: "Low",
  },
  {
    branch: "Surat",
    cif: "8NA1245S",
    dateOpened: "20/01/2025",
    borrower: "Digital Media Group",
    pendency: "Approver",
    openTriggers: 3,
    daysOpen: 2,
    exposure: "11 Cr.",
    priority: "Medium",
  },
  {
    branch: "Visakhapatnam",
    cif: "8NA2267T",
    dateOpened: "01/02/2025",
    borrower: "Bright Future Corp.",
    pendency: "Self",
    openTriggers: 2,
    daysOpen: 2,
    exposure: "6 Cr.",
    priority: "Low",
  },
  {
    branch: "Coimbatore",
    cif: "8NA2249B",
    dateOpened: "01/03/2025",
    borrower: "Smart Solutions Inc.",
    pendency: "Self",
    openTriggers: 3,
    daysOpen: 1,
    exposure: "4 Cr.",
    priority: "Low",
  },
  {
    branch: "Noatak",
    cif: "8NA2249P",
    dateOpened: "13/10/2020",
    borrower: "Tech Startups Hub",
    pendency: "Approver",
    openTriggers: 3,
    daysOpen: 2,
    exposure: "10 Cr.",
    priority: "Medium",
  }
];
*/


const getPriorityChipColor = (priority) => {
    switch (priority) {
        case "Red":
          return {
            backgroundColor: "#FEC3C4",
            color: "#000",
          };
        case "Amber":
          return {
            backgroundColor: "#FFE9A2",
            color: "#000",
          };
        case "Green":
          return {
            backgroundColor: "#C8F9C7",
            color: "#000",
          };
        default:
          return {
            backgroundColor: "#d9d9d9",
            color: "#000",
          };
      }
};



const TriggerWise = ({collapsed}) => {

const location = useLocation();
const navigate = useNavigate();
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(8);
const [daysFilter, setDaysFilter] = useState("Product");
const [pendencyFilter, setPendencyFilter] = useState("Source");
const [triggerFilter, setTriggerFilter] = useState("Open Triggers");
const [priorityFilter, setPriorityFilter] = useState("Sector");
const [wi,setWI] = useState('');
const [searchQuery, setSearchQuery] = useState("");
const [loading, setLoading] = useState(false);
const [data,setData]=useState([{
  "srNo": null,
  "borrowerName": "",
  "triggerName": null,
  "triggerId": null,
  "raisedBy": null,
  "raisedTo": null,
  "exposure": null,
  "month": null,
  "branch": null,
  "cifId": null,
  "dateOpened": "",
  "pendency": null,
  "daysOpened": null,
  "priority": null,
  "output": null,
  "dueDate": null,
  "frequency": null,
  "severity": null,
  "type": null,
  "category": null,
  "description": null,
  "source": null,
  "thresholdValue": null,
  "actualValue":null,
  "wi_Name": null
}]);

function formatDateToDDMMYYYY(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}
const filteredData = data.filter((row) => {
  const daysCondition =
    daysFilter === "All Time" ||
    (daysFilter === "More than 3 days" && row.daysOpened > 3) ||
    (daysFilter === "Less than 3 days" && row.daysOpened <= 3);

  const pendencyCondition =
    pendencyFilter === "All Triggers" || row.pendency === pendencyFilter;

  // const triggerCondition =
    
  //   (triggerFilter === "Open Triggers" && row.openTriggers > 0) ||
  //   (triggerFilter === "Close Triggers" && row.openTriggers === 0);

  const priorityCondition =
    priorityFilter === "Trigger Classification" || row.output === priorityFilter;

  return daysCondition && pendencyCondition && priorityCondition;
});

const priorityOrder = {
  Red: 3,   // Red
  Amber: 2, // Amber
  Green: 1     // Green
};

const capitalizeEachWord = (str) => {
  return str
    .split(' ')
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
};

const sortedData = filteredData.sort((a, b) => {
  const priorityComparison = (priorityOrder[b.output] || 0) - (priorityOrder[a.output] || 0);
  if (priorityComparison !== 0) {
    return priorityComparison;
  }
  return b.daysOpened - a.daysOpened; // Descending daysOpened
});


const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};
const handleViewDetails = (cifid) => {
  setWI('');
  const user = window.parent.username;  // //`${apiURL}/fetch-trigger-details/dev`
  const data = {
    cifId: cifid,
    attributes: '',
    queueId: '1465'
   
  };
  console.log("cifid"+cifid);
  
  axios
    .post(`${apiURL}/wicreate`,data)
    .then(res => setWI(res.data.wiName))
    .catch(err => console.error("Failed to load trigger-details:", err));
 //   navigate(`/customer-details-ibps/${wi}`);
 
 
 //window.open(`https://closdemo.newgensoftware.net/webdesktop/login/loginapp.app?WDDomHost=closdemo.newgensoftware.net&WDDomPrt=https:&CalledFrom=OPENWI&CabinetName=closqa&SessionId=${window.parent.sessionId}&UserName=shrishti&UserIndex=14&pid=${wi}&wid=1&OAPDomHost=closdemo.newgensoftware.net&OAPDomPrt=https:`);
};

const searchedData = filteredData.filter((row) => {
  const searchStr = searchQuery.toLowerCase();
  return (
    
    row.cifId?.toString().toLowerCase().includes(searchStr) ||
    row.daysOpened?.toString().toLowerCase().includes(searchStr) ||
    row.dateOpened?.toString().toLowerCase().includes(searchStr) ||
    row.severity?.toString().toLowerCase().includes(searchStr) ||
    row.type?.toString().toLowerCase().includes(searchStr) ||
    row.triggerName?.toString().toLowerCase().includes(searchStr) ||
    row.triggerId?.toString().toLowerCase().includes(searchStr) ||
    row.output?.toString().toLowerCase().includes(searchStr) ||
    row.borrowerName?.toString().toLowerCase().includes(searchStr) 
    

  );
});

useEffect(()=>{
    //console.log("triggerdata:"+triggerData);
   if(wi!=''){
    console.log("workitem no:"+wi);
    const url=`https://closdemo.newgensoftware.net/webdesktop/login/loginapp.app?WDDomHost=closdemo.newgensoftware.net&WDDomPrt=https:&CalledFrom=OPENWI&CabinetName=closqa&SessionId=${window.parent.sessionId}&UserName=${window.parent.userName}&UserIndex=${window.parent.userIndex}&pid=${wi}&wid=1&OAPDomHost=closdemo.newgensoftware.net&OAPDomPrt=https:`;
 console.log(url);
 //alert(url);
 setLoading(true);
 const timer = setTimeout(() => {
  window.open(url);
  setLoading(false);
}, 5000); // 5000ms = 5 seconds

// Clear the timer if the component unmounts or `wi` changes
return () => clearTimeout(timer);
   // window.open(`https://closdemo.newgensoftware.net/webdesktop/login/loginapp.app?WDDomHost=closdemo.newgensoftware.net&WDDomPrt=https:&CalledFrom=OPENWI&CabinetName=closqa&SessionId=${window.parent.sessionId}&UserName=${window.parent.userName}&UserIndex=${window.parent.userIndex}&pid=${wi}&wid=1&OAPDomHost=closdemo.newgensoftware.net&OAPDomPrt=https:`);
   }
  //  navigate(`/customer-details-ibps/${wi}`);
  },[wi])
useEffect(() => {
  if (location.state?.filter) {
    const prop=location.state.filter;
    if(prop=='More than 3 days' || prop=='Less than 3 days'){
      setDaysFilter(location.state.filter);
    }
    else if(prop==='More than 3 days checker'){
      setDaysFilter('More than 3 days');
    }
    // else if(prop=='Credit' || prop=='Approver'){
    //   setPendencyFilter(location.state.filter);
    // }
   // setPendencyFilter(location.state.filter);
  }
  else{
    setDaysFilter('Product')
    setPendencyFilter('Source')
    setPriorityFilter('Sector')
    setTriggerFilter('Open Triggers')
  }
}, [location.state]);

// useEffect(() => {
//   const fetchData = async () => {
//       try {
//         console.log("inside fetchdata apiURL"+apiURL)
//         const response = await fetch(`${apiURL}/pendency/${window.parent.userName}`);//
//         //  const response = await fetch(`${API_URL}/pendency/${window.parent.userName}`);
//           if (!response.ok) {
            
//               throw new Error('Failed to fetch data');
//           }
//           const data = await response.json();
//           setData(data);
          
//       } catch (error) {
//           console.error('Error:', error);
//           setData([]);
//       }
//   };

//    fetchData();
// }, []);
const rowsFromImage = [
  {
    branch: "Dwarika Sec 10",
    cifId: "874123457",
    entityName: "Albert David Limited",
    leadSource: "In Progress",
    industry: "Pharmaceuticals",
    dealSize: "18.50",
    priority: "High",
    constitution: "Public Limited Company",
    source: "AI Generated",
    lastActivityDate: "13-Jul-25",
    nextAction: "Awaiting Financial Docs"
  },
  {
    branch: "Greater Noida",
    cifId: "",
    entityName: "Allsec Technologies Limited",
    leadSource: "On Hold",
    industry: "IT / BPM Services",
    dealSize: "12.00",
    priority: "Medium",
    constitution: "Public Limited Company",
    source: "RM Initiated",
    lastActivityDate: "06-Jul-25",
    nextAction: "Awaiting KYC Docs"
  },
  {
    branch: "Gurgaon Sec 50",
    cifId: "874123555",
    entityName: "Arrow Greentech Limited",
    leadSource: "Converted",
    industry: "Packaging",
    dealSize: "7.20",
    priority: "Low",
    constitution: "Public Limited Company",
    source: "AI Generated",
    lastActivityDate: "13-Jul-25",
    nextAction: "Initiate PD Discussion"
  },
  {
    branch: "Greater Noida",
    cifId: "874123527",
    entityName: "Auti India Ltd",
    leadSource: "Converted",
    industry: "Automotive",
    dealSize: "7.20",
    priority: "High",
    constitution: "Public Limited Company",
    source: "RM Initiated",
    lastActivityDate: "06-Jul-25",
    nextAction: "Site Visit Scheduling"
  },
  {
    branch: "Dwarika Sec 10",
    cifId: "",
    entityName: "AVL India Private Limited",
    leadSource: "In Progress",
    industry: "Automotive",
    dealSize: "36.50",
    priority: "High",
    constitution: "Public Limited Company",
    source: "AI Generated",
    lastActivityDate: "13-Jul-25",
    nextAction: "Site Visit Scheduling"
  },
  {
    branch: "Greater Noida",
    cifId: "874123490",
    entityName: "Balaji Agro Pvt Ltd",
    leadSource: "On Hold",
    industry: "Food Processing",
    dealSize: "12.50",
    priority: "Medium",
    constitution: "Public Limited Company",
    source: "CRM Triggered",
    lastActivityDate: "06-Jul-25",
    nextAction: "Schedule PD Meeting"
  },
  {
    branch: "Greater Noida",
    cifId: "874123390",
    entityName: "Balrampur Industries Ltd",
    leadSource: "In Progress",
    industry: "Pulp & Paper",
    dealSize: "12.50",
    priority: "Medium",
    constitution: "Public Limited Company",
    source: "AI Generated",
    lastActivityDate: "06-Jul-25",
    nextAction: "Schedule Management Call"
  },
  {
    branch: "Greater Noida",
    cifId: "874123445",
    entityName: "Care Softwareware Ltd",
    leadSource: "Converted",
    industry: "Pulp & Paper",
    dealSize: "9.50",
    priority: "Low",
    constitution: "Public Limited Company",
    source: "CRM Triggered",
    lastActivityDate: "13-Jul-25",
    nextAction: "Site Visit Scheduling"
  },
  {
    branch: "Dwarika Sec 10",
    cifId: "874123422",
    entityName: "Eicher Motors Ltd",
    leadSource: "In Progress",
    industry: "Automotive",
    dealSize: "9.00",
    priority: "Low",
    constitution: "Public Limited Company",
    source: "RM Initiated",
    lastActivityDate: "15-Jul-25",
    nextAction: "Awaiting Financial Docs"
  },
  {
    branch: "Greater Noida",
    cifId: "874123412",
    entityName: "Essar Steel Suppliers",
    leadSource: "On Hold",
    industry: "Steel Distribution",
    dealSize: "11.00",
    priority: "Medium",
    constitution: "Partnership Firm",
    source: "RM Initiated",
    lastActivityDate: "15-Jul-25",
    nextAction: "Site Visit Scheduling"
  },
  {
    branch: "Greater Noida",
    cifId: "874123460",
    entityName: "Exide Industries Ltd",
    leadSource: "In Progress",
    industry: "Manufacturing",
    dealSize: "23.00",
    priority: "High",
    constitution: "Public Limited Company",
    source: "CRM Triggered",
    lastActivityDate: "05-Jul-25",
    nextAction: "Site Visit Scheduling"
  },
  {
    branch: "Gurgaon Sec 50",
    cifId: "874123445",
    entityName: "Innovative Textiles Ltd",
    leadSource: "On Hold",
    industry: "Textiles",
    dealSize: "14.00",
    priority: "Medium",
    constitution: "Private Limited Company",
    source: "RM Initiated",
    lastActivityDate: "15-Jul-25",
    nextAction: "Schedule Management Call"
  },
  {
    branch: "Dwarika Sec 10",
    cifId: "874123550",
    entityName: "Innovative Technomics",
    leadSource: "In Progress",
    industry: "Industrial Automation",
    dealSize: "15.00",
    priority: "Medium",
    constitution: "Proprietorship",
    source: "AI Generated",
    lastActivityDate: "15-Jul-25",
    nextAction: "Site Visit Scheduling"
  },
  {
    branch: "Gurgaon Sec 50",
    cifId: "874123460",
    entityName: "Lanco Infratech",
    leadSource: "In Progress",
    industry: "Infrastructure",
    dealSize: "11.00",
    priority: "High",
    constitution: "Public Limited Company",
    source: "AI Generated",
    lastActivityDate: "13-Jul-25",
    nextAction: "Awaiting Financial Docs"
  },
  {
    branch: "Dwarika Sec 10",
    cifId: "874124726",
    entityName: "Precision Controls",
    leadSource: "In Progress",
    industry: "Industrial Equipment",
    dealSize: "30.00",
    priority: "Low",
    constitution: "Partnership Firm",
    source: "RM Initiated",
    lastActivityDate: "13-Jul-25",
    nextAction: "Awaiting KYC Docs"
  },
  {
    branch: "Greater Noida",
    cifId: "874123890",
    entityName: "Sakar Healthcare Limited",
    leadSource: "In Progress",
    industry: "Pharmaceuticals",
    dealSize: "23.50",
    priority: "Medium",
    constitution: "Public Limited Company",
    source: "AI Generated",
    lastActivityDate: "15-Jul-25",
    nextAction: "Schedule PD Meeting"
  }
];
useEffect(() => {
  const fetchData = async () => {
      try {

        if(location.state?.filter=='SelfApprover'){
             const urls = [
    `${apiURL}/pendency/dev`,
    `${apiURL}/pendency/shivani`,
    `${apiURL}/pendency/vishal`,
  ];

  const responses = await Promise.all(urls.map(url => fetch(url)));

  const dataList = await Promise.all(responses.map(async (response) => {
    if (response.status === 204) {
      return []; // No content, return empty array
    }
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json(); // Return actual data
  }));

  const combinedData = dataList.flat(); // Flatten array of arrays

  if (combinedData.length === 0) {
    throw new Error("All data sources returned empty (204)");
  }
  

  setData(combinedData);

        }
        else if(location.state?.filter=='CreditApprover' || location.state?.filter=='Credit'){
            console.log("inside fetchdata apiURL"+apiURL)
        const response = await fetch(`${apiURL}/pendency/sudhanshu`);//
        //  const response = await fetch(`${API_URL}/pendency/${window.parent.userName}`);
          if (!response.ok) {
            
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setData(data);
        }
        else if(location.state?.filter=='Approver' || location.state?.filter=='Approver from checker'){
          console.log("inside fetchdata apiURL"+apiURL)
        const response = await fetch(`${apiURL}/pendency/msingh`);//
        //  const response = await fetch(`${API_URL}/pendency/${window.parent.userName}`);
          if (!response.ok) {
            
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setData(data);
        }
        else if(location.state?.filter=='All checker'){
          console.log("inside fetchdata apiURL"+apiURL)
        const response = await fetch(`${apiURL}/pendency/sudhanshu`);//
        //  const response = await fetch(`${API_URL}/pendency/${window.parent.userName}`);
          if (!response.ok) {
            
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setData(data);
        }

        else{
        console.log("inside fetchdata apiURL"+apiURL)
        const response = await fetch(`${apiURL}/pendency/${window.parent.userName}`);//
        //  const response = await fetch(`${API_URL}/pendency/${window.parent.userName}`);
          if (!response.ok) {
            
              throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setData(data);
        }  
      } catch (error) {
          console.error('Error:', error);
          setData([]);
      }
  };

  fetchData();
}, [location.state]);


if (loading) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    //  height='100%'
      height="100vh"
    >
      <Box mt={-50}>
      <CircularProgress  />
      </Box>
    </Box>
  );
}
//marginLeft: collapsed ? "60px" : "250px"
  return (
    <Box sx={{ backgroundColor: '#F5F5F5', display:'flex',flexDirection:'row',fontFamily:'Outfit',height:'92vh',justifyContent: 'center'}}>
          
    <Box component="main" sx={{ display:'flex' ,flexDirection:'column', p: 2,
    backgroundColor: '#F5F5F5',border:'none' ,height: '100%',
      fontFamily:'Outfit',maxWidth: "1200px",   // ✅ keeps it responsive & centered
    width: "100%",    }} >  {/*"81.5vh"*/}
     <Box sx={{ display: "flex", gap: 2, mb: 2, justifyContent:'space-between',padding:0 }}>
      
      <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "22px",
        padding: "0 8px",
        display: "flex",
        alignItems: "center",
        height: "28px", // control height here
        maxWidth: "150px", // optional width
      }}
    >
      <InputBase
  placeholder="Search"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{
    fontSize: "12px",
    width: "100%",
  }}
  endAdornment={
    <InputAdornment position="end">
      <SearchIcon sx={{ fontSize: 16, color: "#888" }} />
    </InputAdornment>
  }
/>
    </Box>
      <Box sx={{display:'flex',justifyContent:'center'}}><Typography sx={{ fontSize: '20px', fontFamily:'Outfit',fontWeight: 600, mb: 1 }}>
                  Lead Status
                </Typography></Box>
        <div>
        <Select
                  size="small"
                  value={daysFilter}
                  sx={{ fontSize: "12px", //padding: 0,
                    margin:1,borderRadius:'12px',maxHeight:'26px',maxWidth:'150px' 

                  }}
                  onChange={(e) => setDaysFilter(e.target.value)}
                >
                    <MenuItem value="Product" sx={{ fontSize: "12px", maxHeight: "26px"}}> Product</MenuItem>
                  <MenuItem sx={{ fontSize: "12px", maxHeight:'26px' }} value="More than 3 days">More than 3 days</MenuItem>
                  <MenuItem sx={{ fontSize: "12px",maxHeight:'26px' }} value="Less than 3 days">Less than 3 days</MenuItem>
                  
                </Select>
        
                
       
                <Select
                  size="small"
                  value={priorityFilter}
                  sx={{ fontSize: "12px",margin:1,borderRadius:'12px',maxHeight:'26px' }}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                ><MenuItem value="Sector" sx={{ fontSize: "12px", maxHeight: "26px" }}>Sector</MenuItem>
                  <MenuItem sx={{ fontSize: "12px",maxHeight:'26px'}} value="Red">Red</MenuItem>
                  <MenuItem sx={{ fontSize: "12px",maxHeight:'26px' }} value="Amber">Amber</MenuItem>
                  <MenuItem sx={{ fontSize: "12px",maxHeight:'26px' }} value="Green">Green</MenuItem>
                </Select>

                 <Select
                  size="small"
                  value={pendencyFilter}
                  sx={{ fontSize: "12px", //padding: 0,
                  margin:1,borderRadius:'12px',maxHeight:'26px',maxWidth:'150px' }}
                  onChange={(e) => setPendencyFilter(e.target.value)}
                >
                    <MenuItem value="Source" sx={{ fontSize: "12px", maxHeight: "26px" }}> Source</MenuItem>
                  <MenuItem sx={{ fontSize: "12px",maxHeight:'26px' }} value="Self">Self</MenuItem>
                  <MenuItem sx={{ fontSize: "12px",maxHeight:'26px' }} value="Credit">Credit</MenuItem>
                  <MenuItem sx={{ fontSize: "12px",maxHeight:'26px' }} value="Approver">Approver</MenuItem>
                </Select> 
                </div>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '5px' }}>
  <Table size="small" stickyHeader>
    <TableHead sx={{ backgroundColor: '#F9F2FD' }}>
      <TableRow>
        {[
          "Branch",
          "CIF ID",
          "Entity Name",
          "Status",
          "Industry",
          "Amount",
          "Priority",
          "Constitution",
          "Source",
          "Date",
          "Next Action",
          "Details"
        ].map((head) => (
          <TableCell key={head} sx={{ fontFamily: 'Outfit', fontSize: '14px', backgroundColor: '#F9F2FD', fontWeight: 600 }}>
            {head}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {
      //(searchQuery !== '' ? searchedData : sortedData)
      rowsFromImage
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, idx) => (
          <TableRow
            key={idx}
            sx={{
              backgroundColor: idx % 2 === 0 ? "#ffffff" : "#FAF8FB",
              fontFamily:'Outfit',
            fontSize:'10px'
            }}
          >
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px'}}>{row.branch}</TableCell>
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px'}}>{row.cifId}</TableCell>
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px'}}>{row.entityName}</TableCell>
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px'}}>{row.leadSource}</TableCell>
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px'}}>{row.industry}</TableCell>
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px'}}>{row.dealSize}</TableCell>
            <TableCell align='center' sx={{fontFamily:'Outfit',fontSize:'12px'}}>
              <Chip
  label={
    row.priority === 'High'
      ? 'Hot'
      : row.priority === 'Medium'
      ? 'Warm'
      : row.priority === 'Low'
      ? 'Cold'
      : ''
  }
  size="small"
  sx={{
    fontWeight: 500,
    ...(row.priority === 'High' && {
      backgroundColor: '#FDEAEA',
      color: '#C62828',
    }),
    ...(row.priority === 'Medium' && {
      backgroundColor: '#FFF6E5',
      color: '#EF6C00',
    }),
    ...(row.priority === 'Low' && {
      backgroundColor: '#E6F4EA',
      color: '#2E7D32',
    }),
  }}
/>

            </TableCell>
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px'}}>{row.constitution}</TableCell>
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px'}}>{row.source}</TableCell>
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px',width:'7%'}}>{row.lastActivityDate}</TableCell>
            <TableCell sx={{fontFamily:'Outfit',fontSize:'12px'}}>{row.nextAction}</TableCell>
            <TableCell sx={{fontFamily:'Outfit',}}>
              <IconButton
                aria-label="view"
                size="small"
                color="primary"
                onClick={() => {
                  handleViewDetails(row.cifId);
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
</TableContainer>

<TablePagination
  component="div"
  count={rowsFromImage.length}//{filteredData.length}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  rowsPerPageOptions={[5, 8, 25]}
  labelRowsPerPage="Rows per page"
/>
    </Box></Box>
  );
};

export default TriggerWise;
