import { useState } from "react";
import LeadsTable from "./LeadsTable";
import { Box } from "@mui/material";
import DashboardMain from "./DashboardMain";
import Dialer from "./Dialer";

import Sidebar from "./Sidebar"; // Assuming Sidebar is imported

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dialer collapsed={collapsed} />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
