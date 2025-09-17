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
      <LeadsTable collapsed={collapsed} />
    </Box>
  );
};

export default DashboardLayout;
