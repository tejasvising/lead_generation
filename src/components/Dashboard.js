import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LeadsTable from "./LeadsTable";
import { Box } from "@mui/material";
import DashboardMain from "./DashboardMain";
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <DashboardMain collapsed={collapsed} />
    </Box>
  );
};

export default DashboardLayout;
