import React, { useState,useEffect } from "react";
import { Box, Tabs,Button, Tab, Typography, Link } from "@mui/material";
import DashboardMain from "./DashboardMain";
import Dashboard from "./Dashboard";
// import ActionableTable from "./Actionable/ActionableTable";
// import ActionableTab from "./Actionable/ActionableTab";
import "@fontsource/outfit"; // Defaults to weight 400
import "@fontsource/outfit/400.css"; 
 import { useLocation, useNavigate } from "react-router-dom";
 import TriggerWise from "./LeadsTable";
// import RedFlagTable from "./RedFlag/RedFlagTable";
// import AlertforInfo from "./AlertforInfo";
const DashboardTabs = () => {
  const location=useLocation();
  const [value, setValue] = useState(0);
  const [alertClicked,setAlertClicked]=useState(null);
  const navigate=useNavigate();
  const handleChange = (event,newValue) => {
    
    setValue(newValue);
    setAlertClicked(false);
    console.log("after change:"+alertClicked);
    if(newValue==0){
      navigate('/');
    }
  };

  const handleClick = (event,newValue) => {
    
    //setValue(newValue);
    setAlertClicked(false);
    console.log("after change:"+alertClicked);
    // if(newValue==0){
    //   navigate('/');
    // }
  };

// const Dashboard = () => <Dashboard/>;
// const Actionables = () => <ActionableTable/>;
// const Borrowers = () => <RedFlagTable/>;
//const AlertforInfo = () => <AlertforInfo/>;
useEffect(() => {
  if (location.state?.value) {
    const prop=location.state.value;
   
    if(prop==1){
      setValue(1);
    }
    
  }
  
}, [location.state]);

const handleAlertClick = (event, newValue) => {
    
    setAlertClicked(true);
    setValue(89)
    
  };
  return (
    <Box sx={{ width: "100%", borderBottom: "#51087E" ,fontSize:'14px',    fontFamily: "'Outfit', sans-serif"}}>
      <Box sx={{ position: 'sticky',
          top: '48px', // height of the sticky navbar
          zIndex: (theme) => theme.zIndex.appBar + 3,}}>
      {/* Tabs Section */}
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center" ,maxHeight:'40px',backgroundColor: "white"}}>
        {/* Left Tabs */}
        <Tabs value={value}  onClick={handleClick} onChange={handleChange}  textColor="inherit"  indicatorColor="none" sx={{maxHeight:'35px'}}  >
          <Tab label="My Dashboard" sx={{ textTransform: "none", fontWeight: value === 0 ? "bold" : "normal", color: value === 0 ? "purple" : "black" }} />
          <Tab label="My Applications" sx={{ textTransform: "none",fontWeight: value === 1 ? "bold" : "normal", color: value === 1 ? "purple" : "black"  }} />
          <Tab label="Analytics" sx={{ textTransform: "none", fontWeight: value === 2 ? "bold" : "normal", color: value === 2 ? "purple" : "black"  }} />
        
        </Tabs>

        {/* Right Side "View Alert" Link */}
        {/* <Button onClick={handleAlertClick} sx={{ color: "purple", fontWeight: "bold", textDecoration: "none",textTransform:"none", paddingRight: "15px" ,display: { xs: "none", md: "flex" } }}>
        Alert for Information
        </Button> */}
      </Box>

      {/* Purple Underline for Active Tab */}
      {alertClicked &&
            <Box sx={{ height: "3px", width: "10%", color:"purple",backgroundColor: "purple", marginTop: "-3px", transition: "0.3s", transform: `translateX(${89 * 10}%)` }} />
      }
      {!alertClicked &&
      <Box sx={{ height: "3px",width: { xs: "60px", sm: "80px", md: "100px", lg: "120px" }, color:"purple",backgroundColor: "purple", marginTop: "-3px", transition: "0.3s", transform: `translateX(${value * 120}px)` }} />
}
      </Box>
      {alertClicked ? (
        <></>
  //<AlertforInfo />
) : (<>{value === 0 && <DashboardMain/>}{value === 1 && <TriggerWise />}</>
//   <>
//     {value === 0 && <DashboardMain />}
//     {value === 1 && <ActionableTab />}
//     {value === 2 && <Borrowers />}
//   </>
)}

      
    </Box>
  );
};

export default DashboardTabs;
