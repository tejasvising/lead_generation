import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import "@fontsource/outfit"; // Defaults to weight 400
import "@fontsource/outfit/400.css"; 
const leads = [
  {
    company: 'Triveni AgroTech Pvt. Ltd.',
    description:
      'AI flagged due to 35% YoY revenue growth and export expansion — ideal for working capital funding.',
    date: '12-07-2025',
  },
  {
    company: 'Novonix Engineering LLP',
    description:
      'Recent capex filings suggest asset purchase term loan opportunity.',
    date: '15-07-2025',
  },
  {
    company: 'Arclite Pharmaceuticals Ltd.',
    description:
      'Positive news sentiment and distributor ramp-up indicate supply chain finance need.',
    date: '10th Nov 2024',
  },
];

const AIRecommendedLeads = () => {
  return (
    <Card sx={{ margin:1, border:'solid 1px #e8e8e8', maxHeight:'290px',overflowY: 'auto',scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },}}>

      <CardContent>
        <Typography variant="h6"sx={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#333",
                            mb: 1,
                            fontFamily: "'Outfit', sans-serif",
                          }} >
          AI Recommended NTB Leads
        </Typography>

        {leads.map((lead, index) => (
          <Box key={index} sx={{ mb: index !== leads.length - 1 ? 2 : 0 }}>
            <Typography fontWeight="bold" fontSize="12px" sx={{fontFamily: "'Outfit', sans-serif"}}>
              {lead.company}
            </Typography>
            <Typography fontSize="12px" sx={{ mt: 0.5 ,fontFamily: "'Outfit', sans-serif"}}>
              {lead.description}
            </Typography>
            <Typography
              fontSize="12px"
              sx={{ color: 'gray', mt: 0.5,fontFamily: "'Outfit', sans-serif" }}
            >
              {lead.date}
            </Typography>
            {index !== leads.length - 1 && (
              <Divider sx={{ mt: 1.5, mb: 1.5 }} />
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIRecommendedLeads;
