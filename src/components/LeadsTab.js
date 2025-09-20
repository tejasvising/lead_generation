import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LeadsTable from "./LeadsTable";
import { Box } from "@mui/material";
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <Box sx={{ display: "flex",backgroundColor: '#F5F5F5', height:'100%'}}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <Box
        sx={{
          flexGrow: 1,                  // take remaining space
          display: "flex",              // flexbox for centering
          justifyContent: "center",     // center horizontally
          alignItems: "flex-start",     // keep content top-aligned
          p: 2,
          ml: collapsed ? '5%': '15%' 
        }}
      >
      <LeadsTable collapsed={collapsed}  />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
