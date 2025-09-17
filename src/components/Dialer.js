import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import BackspaceIcon from "@mui/icons-material/Backspace";

const Dialer = ({collapsed}) => {
  const [number, setNumber] = useState("");

  const handlePress = (value) => {
    setNumber((prev) => prev + value);
  };

  const handleBackspace = () => {
    setNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    alert(`Calling ${number}...`);
  };

  const dialPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width:"70vh",
     //   backgroundColor: "#f4f6f8",
        marginLeft: collapsed?'60px':'243.3px'
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4, width: 300 }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: "bold", mb: 2, fontFamily: "Outfit" }}
        >
          Dialer
        </Typography>

        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            padding: 1,
            mb: 2,
            minHeight: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.5rem",
            fontFamily: "monospace",
            backgroundColor: "#ffffff",
          }}
        >
          {number || <span style={{ color: "#999" }}>Enter number</span>}
          {number && (
            <IconButton size="small" onClick={handleBackspace}>
              <BackspaceIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        <Grid container spacing={1}>
          {dialPad.map((digit) => (
            <Grid item xs={4} key={digit}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handlePress(digit)}
                sx={{
                  height: 60,
                  fontSize: "1.5rem",
                  fontFamily: "Outfit",
                  borderRadius: 2,
                }}
              >
                {digit}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <IconButton
            onClick={handleCall}
            sx={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              width: 60,
              height: 60,
              "&:hover": { backgroundColor: "#43a047" },
            }}
          >
            <CallIcon fontSize="large" />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dialer;
