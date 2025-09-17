import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import '@fontsource/outfit'; // Make sure this is installed

const nudges = [
  {
    company: 'Velora Textile Limited',
    insight: 'Rising GST turnover & seasonal demand',
    customerId: '9837284929',
    product: 'Working Capital',
  },
  {
    company: 'Quantix Precision Tools',
    insight: 'Capex filing & machinery import flagged',
    customerId: '8939827482',
    product: 'Term loan, Import LC',
  },
  {
    company: 'Nutriva Biotech Pvt. Ltd.',
    insight: 'Distributor expansion & positive media buzz',
    customerId: '83924729822',
    product: 'Supply Chain Finance',
  },
];

const ETBNudgesCard = () => {
  return (
    <Card sx={{ margin:1, border:'solid 1px #e8e8e8', maxHeight:'290px',minHeight:'290px',overflowY: 'auto',scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },}}>
      <CardContent>
        {/* Card Heading */}
        <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                    mb: 1,
                      fontFamily: "'Outfit', sans-serif",
                  }}
                >
          ETB Portfolio Growth Opportunities
        </Typography>

        {/* Each Nudge */}
        {nudges.map((nudge, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: '#F8F6FE',
            //  borderRadius: 2,
              p: 1,
              mb: index !== nudges.length - 1 ? 2 : 0,
            }}
          >
            {/* Company + Insight */}
            <Typography sx={{ fontSize: '12.5px' }}>
              <strong>{nudge.company}</strong> – {nudge.insight} (Customer ID: {nudge.customerId})
            </Typography>

            {/* Customer ID + Product */}
            {/* <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <Typography sx={{ fontSize: '10px' }}>
                Customer ID:{' '}
                <strong>{nudge.customerId}</strong>
              </Typography>
              <Typography sx={{ fontSize: '10px' }}>
                Suggested Product:{' '}
                <strong style={{ color: '#46325D' }}>
                  {nudge.product}
                </strong>
              </Typography>
            </Grid> */}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ETBNudgesCard;
