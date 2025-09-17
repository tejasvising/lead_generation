import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  AutoAwesome as SparklesIcon,
  VpnKey as KeyIcon,
  MicOff as DropIcon,
  DeviceHub as ActiveIcon,
} from '@mui/icons-material';

import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import icon4 from '../assets/icon4.png'

const stats = [
  {
    label: 'Total Leads',
    value: 89,
    icon: <img src={icon1}/>
  },
  {
    label: 'Leads Converted',
    value: 54,
    icon:  <img src={icon2}/>
  },
  {
    label: 'Leads Dropped',
    value: 35,
    icon:  <img src={icon3}/>
  },
  {
    label: 'Active Leads',
    value: 10,
    icon:  <img src={icon4}/>
  },
];

const LeadStats = () => {
  return (
    <Box
      sx={{
        display: 'flex',
       // gap: 2,
       justifyContent:'space-between',
        bgcolor: '#f5f5f5',
        p: 0,
        m:1,
        borderRadius: 1,
        overflowX: 'auto',
      }}
    >
      {stats.map((item, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 1,
            borderRadius: 2,
            minWidth: 255,
            border: '1px solid #eee',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="body2" fontWeight={540}>
            {item.label}
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ ml: 'auto' }}>
            {item.value}
          </Typography>
          {item.icon}
        </Paper>
      ))}
    </Box>
  );
};

export default LeadStats;
