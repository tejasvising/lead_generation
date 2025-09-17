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
    <Box sx={{ display: "flex" ,backgroundColor:'#f5f5f5'}}>
      <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
      <Box component="main" sx={{  flexGrow: 1,
          padding: 3,
          marginLeft: collapsed ? "5%":"18.8%",//"80px" : "250px", // adjust based on sidebar width
          display: "flex"}}>
        <DashboardCharts collapsed={collapsed} />
       <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
