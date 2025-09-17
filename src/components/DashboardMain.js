import React,{useState} from 'react';
import { Modal, Select, MenuItem ,IconButton} from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';

import Grid from '@mui/material/Grid';
import { Typography,Card,Divider,Button } from '@mui/material';
import LeadStats from './LeadStats';
import LeadPipelineChart from './LeadPipelineChart';
import TrendAnalysisChart from './TrendAnalysisChart'
import Calendar from './Calendar';
import LeadPipeline from './LeadPipeline';
import AIRecommendedLeads from './AIRecommendedLeads'
import ETBNudgesCard from './ETBNudgesCard'
// import CloseIcon from "@mui/icons-material/Close";
// import TriggerDetails from './TriggerDetails';
// import AssignedTask from './AssignedTask';
 import EWSClassificationChart from './EWSClassificationChart';
// import TrendAnalysisChart from './TrendAnalysisChart';
// import NewsSentimentAnalysis from './NewsSentimentAnalysis';
// import LumynFloat from '../../assets/lumyn1.png'
// import Lumyn from '../Lumyn/Lumyn';
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import "@fontsource/outfit"; // Defaults to weight 400
import "@fontsource/outfit/400.css"; 
 import FullscreenIcon from '@mui/icons-material/Fullscreen';
 import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LeadsDistribution from './LeadsDistribution';
export default function DashboardMain({collapsed}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {setOpen(false); setFullScreen(false);}
  const toggleFullScreen = () => setFullScreen(!fullScreen);
  const [fullScreen, setFullScreen] = useState(false);
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left:fullScreen?"50%":"81%",
  
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    minWidth: 400,
    width:fullScreen?"95%":'30%',
    outline:'none'
  };
    return (
        <>
           <Box sx={{ backgroundColor: fullScreen?'transparent':'#F5F5F5', display:'flex',flexDirection:'row'}}>
           
      <Box //className="flex-1 p-6"
      sx={{ marginLeft: collapsed?'60px':'255px', padding: 1.5, flexGrow: 1 }}
      >
        {/* Your main content here */}
     
      <Grid container>
         {!fullScreen && <>
         <Grid item size={{md:12, xs:12,}}  >
        
        <LeadStats/>
        </Grid>
        {/* Left Section */}
        <Grid item size={{md:4.5, xs:12,}}  >
          {/* Triggers Details */}
         {/* <TriggerDetails/> */}
          <EWSClassificationChart/> 
        </Grid>

        {/* Middle Section */}
        <Grid item size={{md:4, xs:12,}} >
          {/* <AssignedTask/> */}
          <LeadPipeline/> 
        </Grid>

        {/* Right Section */}
        <Grid item size={{md:3.5, xs:12,}} >
          {/* EWS Classification */}
          <Calendar/>
        </Grid>

        {/* Bottom Left - Trend Analysis */}
        <Grid item size={{md:4, xs:12,}} >
        {/* <TrendAnalysisChart/> */}
        <AIRecommendedLeads/>
        </Grid>

        {/* Bottom Right - News Sentiment Analysis */}
        <Grid item size={{md:4, xs:12,}} >
          {/* <NewsSentimentAnalysis/> */}
          <ETBNudgesCard/>
        </Grid>
        <Grid item size={{md:4, xs:12,}} >
          {/* <NewsSentimentAnalysis/> */}
          <LeadPipelineChart/>
        </Grid>
        <Grid item size={{md:6, xs:12,}} >
          {/* <NewsSentimentAnalysis/> */}
          <LeadsDistribution/>
        </Grid>
        <Grid item size={{md:6, xs:12,}} >
          {/* <NewsSentimentAnalysis/> */}
          <TrendAnalysisChart/>
        </Grid>
</>}
        
      </Grid>
      {/* <Box
        sx={{
          position: "fixed",
          bottom:12,
          right: 12,
          backgroundColor: "#51087E",
          width: 55,
          height: 55,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          

        }}
        onClick={() => setOpen(true)}
      >
        <img src={LumynFloat} alt='LumynFloat' height={39} width={43}/>
        
      </Box>
      <Modal open={open} onClose={handleClose}>

        <Box sx={modalStyle}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <IconButton onClick={toggleFullScreen} size="small">
              {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
         <Lumyn/>
        </Box>
      </Modal> */}
      </Box>
    </Box>
        </>
    )
}
