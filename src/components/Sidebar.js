import React, { useState } from "react";
import "./Sidebar.css";
import "@fontsource/outfit";
import "@fontsource/outfit/400.css";

import lead from "../assets/lead.png";
import report from "../assets/report.png";
import house from "../assets/house.png";
import call from "../assets/call.png";
import newlead from "../assets/newlead.png";
import viewlead from "../assets/viewlead.png";

import { Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ toggleSidebar, collapsed }) => {
  const [wi, setWi] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const viewLead = () => {
    navigate("/application");
  };
  const dialCall = () => {
    navigate("/dialCall");
  };

  const clickReport = () => {
    navigate("/report");
  };
  const homeCall = () => {
    navigate("/");
  };

  const openWorkItem = () => {
  console.log("Open workitem fnc triggered");
  setIsLoading(true);
  axios
    .post(
      "https://closdemo.newgensoftware.net/LeadGenerationProject/api/workitem/createWI", 
      {
        extraAttributesXml: "", 
        queueId: "243",
      }
    )
    .then((res) => {
      if (res && res.data) {
        console.log("WI received:", res.data);
        setWi(res.data);

        const url = `https://closdemo.newgensoftware.net/webdesktop/login/loginapp.app?WDDomHost=closdemo.newgensoftware.net&WDDomPrt=https:&CalledFrom=OPENWI&CabinetName=closqa&SessionId=${window.parent.sessionId}&UserName=${window.parent.userName}&UserIndex=${window.parent.userIndex}&pid=${res.data}&wid=1&OAPDomHost=closdemo.newgensoftware.net&OAPDomPrt=https:`;

        setTimeout(() => {
          window.open(url);
          setIsLoading(false);
        }, 2000);
      }
      else {
          setIsLoading(false); 
        }
    })
    .catch((err) => {
      console.error("Error creating WI", err);
      setIsLoading(false);
    });
};

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.7)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Outfit",
          }}
        >
          Opening Workitem...
        </div>
      )}

    <Box
      className="sidebar"
      sx={{
        width: collapsed ? "70px" : "260px",
        transition: "width 0.3s ease-in-out",
        // overflow: "hidden",
        height: "100vh",
        backgroundColor: "#fff",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <Box className="user-info" sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!collapsed && (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "Outfit",
              }}
            >
              Welcome, Rohit Saini
            </Typography>
          )}
          <IconButton
            size="small"
            onClick={toggleSidebar}
            sx={{ color: "white" }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Outfit",
              }}
            >
              {collapsed ? ">" : "<"}
            </Typography>
          </IconButton>
        </Box>
        {!collapsed && (
          <Typography
            sx={{ fontSize: "10px", fontWeight: "bold", fontFamily: "Outfit" }}
          >
            Login Date & Time: 15-07-2023, 13:46:11
          </Typography>
        )}
      </Box>

      <ul className="menu">
        <li className="menu-item" onClick={homeCall}>
          <img src={house} alt="house" width={25} height={25} />
          {!collapsed && (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "Outfit",
                pl: 2,
              }}
            >
              Home
            </Typography>
          )}
        </li>

        <li className="menu-item leads-parent">
          <img src={lead} alt="leads" width={30} height={30} />
          {!collapsed && (
            <>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  pl: 2,
                }}
              >
                Leads
              </Typography>
              <span className="arrow-icon">⌵</span>
            </>
          )}

          <Box
            className="flyout-menu"
            sx={{ marginLeft: collapsed ? "20px" : "200px" }}
          >
            {!collapsed && (
              <Box className="flyout-item new-lead">
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <img src={newlead} alt="newlead" width={25} height={25} />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    onClick={openWorkItem}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        fontFamily: "Outfit",
                        pl: 2,
                      }}
                    >
                      New Lead
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        fontFamily: "Outfit",
                        pl: 2,
                      }}
                    >
                      +
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            <Box className="flyout-item">
              <Box
                sx={{ display: "flex", flexDirection: "row" }}
                onClick={viewLead}
              >
                <img src={viewlead} alt="viewlead" />
                <Typography
                  sx={{ fontSize: "16px", fontFamily: "Outfit", pl: 2 }}
                >
                  View Existing Leads
                </Typography>
              </Box>
            </Box>
            <Box className="flyout-label">Recently Viewed</Box>
            <Box className="flyout-item">Albert David Limited</Box>
            <Box className="flyout-item">Allsec Technologies Limited</Box>
            <Box className="flyout-item">Arrow Greentech Limited</Box>
          </Box>
        </li>

        {/* <li className="menu-item" onClick={dialCall}>
          <img src={call} alt="call" width={25} height={25} />
          {!collapsed && (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "Outfit",
                pl: 2,
              }}
            >
              Calls
            </Typography>
          )}
        </li> */}

        <li className="menu-item" onClick={clickReport}>
          <img src={report} alt="report" width={25} height={25} />
          {!collapsed && (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "Outfit",
                pl: 2,
              }}
            >
              Reports
            </Typography>
          )}
        </li>
      </ul>
    </Box>
    </>
  );
};

export default Sidebar;
