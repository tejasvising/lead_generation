import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  TextareaAutosize,
} from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/outfit";
import axios from "axios";
import dayjs from "dayjs";

// Styled components
const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#000",
    fontFamily: "Outfit",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000",
    fontFamily: "Outfit",
  },
  "& .MuiOutlinedInput-root": {
    height: 40,
    borderRadius: 10,
    fontFamily: "Outfit",
    "& fieldset": {
      borderColor: "#ccc",
      fontFamily: "Outfit",
    },
    "&:hover fieldset": {
      borderColor: "#999",
      fontFamily: "Outfit",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
      fontFamily: "Outfit",
    },
  },
  "& input": {
    fontSize: 14,
    fontFamily: "Outfit",
  },
});

const CustomSelect = styled(Select)({
  height: 40,
  //borderRadius: 10,
  "& .MuiSelect-select": {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontFamily: "Outfit",
    color: "#000",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
    fontFamily: "Outfit",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#999",
    fontFamily: "Outfit",
  },
});

const CustomButton = styled(Button)(({ variant }) => ({
  color: "#000",
  borderColor: "#000",
  borderRadius: 10,
  textTransform: "none",
  fontFamily: "Outfit",
  fontWeight: 500,
  ...(variant === "contained" && {
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#222",
    },
  }),
}));

const CustomSwitch = styled(Switch)({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#000",
    fontFamily: "Outfit",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#000",
    fontFamily: "Outfit",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
   maxWidth: 460, // set a max width
  maxHeight: "95vh", // so it doesn't go off screen
  overflowY: "auto",
  bgcolor: "#fff",
  color: "#000",
  boxShadow: 24,
  p: 4,
 /* borderRadius: 10, // modal corner rounding*/
  fontFamily: "Outfit",
};

const MeetingModal = ({ open, handleClose, selectedDate }) => {
  const [title, setTitle]                   = useState("");
  const [to, setTo]                   = useState("");
  const [cc, setCC]                   = useState("");
  const [date, setDate]               = useState("");
  const [startTime, setStartTime]           = useState("");
  const [endTime, setEndTime]               = useState("");
  const [timezone, setTimezone]             = useState("");
  const [description, setDescription]       = useState("");
  const [notificationType, setNotificationType]     = useState("");
  const [notificationOffset, setNotificationOffset] = useState("");
  const [notificationUnit, setNotificationUnit]     = useState("");

   useEffect(() => {
    if (selectedDate) {
      setDate(dayjs(selectedDate).format("YYYY-MM-DD"));
    }
  }, [selectedDate]);

  const scheduleMeeting = () => {
    if (!title.trim()) {
      alert("Please enter the Title");
      return;
    }
    if (!to.trim()) {
      alert("Please enter the 'To'");
      return;
    }
     if (!cc.trim()) {
      alert("Please enter the 'CC'");
      return;
    }
    if (!date) {
      alert("Please select a Date");
      return;
    }
    if (!startTime) {
      alert("Please select a Start time");
      return;
    }
    if (!endTime) {
      alert("Please select an End time");
      return;
    }
    if (!timezone) {
      alert("Please choose a Timezone");
      return;
    }
    if (!description.trim()) {
      alert("Please enter the Description");
      return;
    }
    if (!notificationType) {
      alert("Please choose a Notification type");
      return;
    }
    if (!notificationOffset || isNaN(notificationOffset) || Number(notificationOffset) < 1) {
      alert("Please enter a valid Notification offset");
      return;
    }
    if (!notificationUnit) {
      alert("Please choose Notification unit");
      return;
    }
   
    const payload = {
      to,
      cc,
      date,                       // e.g. "2025-08-01"
      startTime,                  // "09:00"
      endTime,                    // "11:30"
      timezone,                   // "IST"
      title,
      description,
      notificationType,
      notificationOffset: Number(notificationOffset),
      notificationUnit
    };

    axios.post("https://closdemo.newgensoftware.net/LeadGenerationProject/api/workitem/MeetingReq", payload)
       .then(res => {
    const responseText = res.data;

    if (responseText.includes("SUCCESS")) {
      alert("Meeting scheduled and email sent!");
    } else {
      alert("Meeting saved, but mail failed: " + responseText);
    }

    handleClose();
  })
  .catch(err => {
    console.error(err);
    alert("Unexpected error scheduling meeting");
  });
  };
   return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography fontSize={18} fontWeight="bold" mb={2}>
          Schedule Meeting
        </Typography>

        {/* Title */}
        <CustomTextField
          fullWidth label="Title" variant="outlined" value={title}
          onChange={e => setTitle(e.target.value)} sx={{ mb: 2 }}
        />
        {/* mailTo */}
        <CustomTextField
          fullWidth label="To" variant="outlined" value={to}
          onChange={e => setTo(e.target.value)} sx={{ mb: 2 }}
        />
        {/* cc */}
        <CustomTextField
          fullWidth label="CC" variant="outlined" value={cc}
          onChange={e => setCC(e.target.value)} sx={{ mb: 2 }}
        />

        {/* Date & Time */}
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <CustomTextField
            label="Date" type="date" value={date}
            onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
          />
          <CustomTextField
            label="Start" type="time" value={startTime}
            onChange={e => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }} sx={{ flex: 1 }}
          />
          <CustomTextField
            label="End" type="time" value={endTime}
            onChange={e => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }} sx={{ flex: 1 }}
          />
        </Box>

        {/* Timezone */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Timezone</InputLabel>
          <CustomSelect
            value={timezone}
            onChange={e => setTimezone(e.target.value)}
            label="Timezone"
          >
            <MenuItem value="CET">(GMT+02:00) CET – Copenhagen</MenuItem>
            <MenuItem value="IST">(GMT+05:30) IST – India</MenuItem>
          </CustomSelect>
        </FormControl>

        {/* Description */}
        <Typography fontWeight="bold" fontSize={14} mb={1}>
          Description
        </Typography>
        <TextareaAutosize
          minRows={2}
          placeholder="Enter details..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{
            width: "100%",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "10px",
            marginBottom: "16px",
            fontFamily: "Outfit",
            fontSize: 14,
          }}
        />

        {/* Notifications */}
        <Typography fontWeight="bold" fontSize={14} mb={1}>
          Notifications
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <CustomSelect
            value={notificationType}
            onChange={e => setNotificationType(e.target.value)}
          >
            <MenuItem value="Email and SMS">Email and SMS</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="SMS">SMS</MenuItem>
          </CustomSelect>
          <CustomTextField
            type="number" value={notificationOffset}
            onChange={e => setNotificationOffset(e.target.value)}
            sx={{ width: 80 }}
          />
          <CustomSelect
            value={notificationUnit}
            onChange={e => setNotificationUnit(e.target.value)}
          >
            <MenuItem value="Minutes">Minutes</MenuItem>
            <MenuItem value="Hours">Hours</MenuItem>
          </CustomSelect>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <CustomButton variant="outlined" onClick={handleClose}>
            Cancel
          </CustomButton>
          <CustomButton variant="contained" onClick={scheduleMeeting}>
            Send Meeting Link
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default MeetingModal;