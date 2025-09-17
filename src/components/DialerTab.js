import React, { useState } from "react";
import Sidebar from "./Sidebar";
import LeadsTable from "./LeadsTable";
import { Box } from "@mui/material";
import Dialer from "./Dialer";
import DashboardCharts from "./DashboardCharts";
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <Dialer collapsed={collapsed} />
      <DashboardCharts collapsed={collapsed} />
    </Box>
  );
};

export default DashboardLayout;
