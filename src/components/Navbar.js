import {React,useState} from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Newgenlogo from "../assets/NewgenColor.png";
import Customer from '../assets/customer.png';
import QuickLinks from '../assets/linking.png'
import PowerOff from '../assets/poweroff.png'
import Notification from '../assets/notify.png'
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorElLinks, setAnchorElLinks] = useState(null);
  const openLinks = Boolean(anchorElLinks);
  
  const location = useLocation();

  // Decide label based on path
  const getTitle = () => {
    //if (location.pathname === '/') return 'Relationship Manager';
    if (window.parent.userName=='sudhanshu') return "Anjali Mehta's Portfolio | Credit Head |";
    if (window.parent.userName=='msingh') return "Vikas Kapoor's Portfolio | Risk Head |";
    if(window.parent.userName=='dev')
    return "Karan Desai's Portfolio | Relationship Manager |";
    if(window.parent.userName=='shivani') return "Amit Mehra's Portfolio | Relationship Manager |";
    if(window.parent.userName=='vishal') return "Pooja Shah's Portfolio | Relationship Manager |";
  };
  
  // Handle open

  
  const handleClick = (event) => {
    //alert("Profile open");
    setAnchorEl(event.currentTarget);
  };

  // Handle close
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLinks = (event) => {
    //alert("Profile open");
    setAnchorElLinks(event.currentTarget);
  };

  // Handle close
  const handleCloseLinks = () => {
    setAnchorElLinks(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        boxShadow: 1,
        borderBottom: "2px solid #51087E",
      //  borderImage: "linear-gradient(to right, purple, orange) 1",
        height: "48px", // reduce height
      }}
    >
       <Toolbar
        sx={{
          minHeight: "40px !important", // ensure toolbar compresses
          height: "42px",
          padding: "0 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
      
        <Box display="flex" alignItems="center">
          {/* <img
            src={Newgenlogo}
            alt="newgen logo"
            style={{ height: 24, marginRight: 6 }}
          /> */}
          <Typography
            variant="subtitle1"
            sx={{
              color: "black",
              fontSize: "15px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              display: { xs: "none", md: "flex" }
            }}
          >
            Lead Management System
          </Typography>
   
        </Box>

        
        <Box sx={{display:'flex',flexDirection:'row'}}>
        
        <Box sx={{display: { xs: "none", md: "flex" },flexDirection:'row',alignItems:"center"}}>
          
        <IconButton size="small" onClick={handleClickLinks}>
        <img src={QuickLinks} alt="Quick Links" style={{ height: 20, marginRight: 4 }} />
        </IconButton>
    <Typography
      variant="subtitle1"
      onClick={handleClickLinks}
      sx={{
        color: "black",
        fontSize: "15px",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        marginTop:0.1,
        marginRight:2,
      }}
    >
      Quick Links
    </Typography>
    
    <Menu
        anchorEl={anchorElLinks}
        open={openLinks}
        onClose={handleCloseLinks}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{fontSize:12,padding:0}}
      >
        <MenuItem onClick={() => {
    const link = document.createElement("a");
    link.href = process.env.PUBLIC_URL + "/docs/frauds.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
    handleCloseLinks();
  }}>Regulatory Circulars</MenuItem>
        <MenuItem onClick={handleCloseLinks}>User Manual</MenuItem>
        <MenuItem onClick={handleCloseLinks}>Glossary</MenuItem>
      </Menu>
      </Box>
      <Box sx={{display:'flex',flexDirection:'column',alignItems:"center",alignContent:'right'}}>
      <Box sx={{display:'flex',flexDirection:'row',alignItems:"center"}}>
          <IconButton size="small" >
            <img src={Notification} alt="Notification" style={{ height: 20, marginRight: 4 }} />
            {/* <NotificationsActiveIcon sx={{ color: "black", fontSize: 20,display: { xs: "none", md: "flex" } }} /> */}
          </IconButton>
          <Typography
      variant="subtitle1"
      onClick={handleClickLinks}
      sx={{
        color: "black",
        fontSize: "15px",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        marginTop:0.1,
        marginRight:1,
      }}
    >
      Logout
    </Typography>
          
          <IconButton size="small" onClick={handleClick} sx={{display: { xs: "none", md: "flex" }}}>
            <img src={PowerOff} alt='Customer' style={{ height: 20, marginRight: 4 }}/>
           
          </IconButton>
          <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{fontSize:12,padding:0,display: { xs: "none", md: "flex" }}}
      >
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={handleClose}>Change Password</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </Box>
           
            </Box>
            </Box>
      </Toolbar> 
     

    </AppBar>
  );
};

export default Navbar;
