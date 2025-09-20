// MainLayout.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardCharts from "./DashboardCharts";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <Box sx={{ display: "flex" ,backgroundColor:'#f5f5f5',height:'100%'}}>
      <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
      <Box component="main" sx={{  flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: 3,
          marginLeft: collapsed ? "5%":"15%",//"80px" : "250px", // adjust based on sidebar width
          height:'100%'
          }}>
        <DashboardCharts collapsed={collapsed} />
       <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
