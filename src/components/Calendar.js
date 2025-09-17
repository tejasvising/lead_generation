/*import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListIcon from '@mui/icons-material/List';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const immediateActions = [
  {
    company: 'Albert David Limited',
    date: '28-07-2025',
    tag: 'Hot Lead',
    tagColor: 'red',
  },
  {
    company: 'Velocity Enterprises',
    date: '20-7-2025',
    tag: 'Warm Lead',
    tagColor: 'orange',
  },
  {
    company: 'Prestige Construction Limited',
    date: '27-07-2025',
    tag: 'Hot Lead',
    tagColor: 'red',
  },
];

const CalendarCard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showCalendar, setShowCalendar] = useState(true);

  return (
    <Card sx={{ m: 1, border: 'solid 1px #e8e8e8', maxHeight: '285px',// width: 337 

    }}>
      <CardContent sx={{ p: 2 }}>
     
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              fontFamily: 'Outfit',
            }}
          >
            {showCalendar ? 'Calendar' : "Today's Tasks"}
          </Typography>
          <IconButton onClick={() => setShowCalendar(!showCalendar)} size="small">
            {showCalendar ? <ListIcon fontSize="small" /> : <CalendarMonthIcon fontSize="small" />}
          </IconButton>
        </Box>

      
        {showCalendar ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                '& .MuiPickersCalendarHeader-root': { minHeight: 30 },
                '& .MuiDayCalendar-header': { minHeight: 25 },
                '& .MuiDayCalendar-weekContainer': { minHeight: 30 },
                transform: 'scale(0.9)',
                transformOrigin: 'top left',
             //   width: 330,
                height: 305,
                overflow: 'hidden',
                mt: -1,
              }}
            >
              <DateCalendar
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
              />
            </Box>
          </LocalizationProvider>
          
        ) : (
          // Immediate Action Cards
          <Box mt={1} sx={{height: 305,}}>
            {immediateActions.map((item, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: '#f5f1f8',
                  borderRadius: 2,
                  p: 1,
                  mb: 1,
                }}
              >
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Typography fontWeight="bold" fontSize="14px" fontFamily="Outfit">
                  {item.company}
                </Typography>
                <Typography
                  fontSize="12.5px"
                  fontWeight="bold" 
                  fontFamily="Outfit"
                  sx={{ color: item.tagColor, textAlign: 'right' }}
                >
                  {item.tag}
                </Typography>
                </Box>
                <Typography fontSize="12.5px" color="#555" fontFamily="Outfit">
                  Next Follow Up date: {item.date}
                </Typography>
                
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarCard;*/
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListIcon from '@mui/icons-material/List';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import MeetingModal from './MeetingModal';
import '@fontsource/outfit';
const CalendarCard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showCalendar, setShowCalendar] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setModalOpen(true); // Open modal when date changes
  };
const immediateActions = [
  {
    company: 'Albert David Limited',
    date: '28-07-2025',
    tag: 'Hot Lead',
    tagColor: 'red',
  },
  {
    company: 'Velocity Enterprises',
    date: '20-7-2025',
    tag: 'Warm Lead',
    tagColor: 'orange',
  },
  {
    company: 'Prestige Construction Limited',
    date: '27-07-2025',
    tag: 'Hot Lead',
    tagColor: 'red',
  },
];
  return (
    <>
      <Card sx={{ m: 0.5, border: 'solid 1px #e8e8e8', maxHeight: '295px' }}>
        <CardContent sx={{ p:0, }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
                fontFamily: 'Outfit',
                p:1
              }}
            >
              {showCalendar ? 'Calendar' : "Today's Tasks"}
            </Typography>
            <IconButton onClick={() => setShowCalendar(!showCalendar)} size="small">
              {showCalendar ? <ListIcon fontSize="small" /> : <CalendarMonthIcon fontSize="small" />}
            </IconButton>
          </Box>

          {showCalendar ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  '& .MuiPickersCalendarHeader-root': { minHeight: 30 },
                  '& .MuiDayCalendar-header': { minHeight: 25 },
                  '& .MuiDayCalendar-weekContainer': { minHeight: 30 },
                  transform: 'scale(0.9)',
                  transformOrigin: 'top left',
                  height: 305,
                  overflow: 'hidden',
                  mt: -1,
                }}
              >
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </Box>
            </LocalizationProvider>
          ) : (
            <Box mt={1} p={1} sx={{ height: 305 }}>
              {immediateActions.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: '#f5f1f8',
                    borderRadius: 2,
                    p: 1,
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography fontWeight="bold" fontSize="14px" fontFamily="Outfit">
                      {item.company}
                    </Typography>
                    <Typography
                      fontSize="12.5px"
                      fontWeight="bold"
                      fontFamily="Outfit"
                      sx={{ color: item.tagColor, textAlign: 'right' }}
                    >
                      {item.tag}
                    </Typography>
                  </Box>
                  <Typography fontSize="12.5px" color="#555" fontFamily="Outfit">
                    Next Follow Up date: {item.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <MeetingModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
      />
    </>
  );
};
export default CalendarCard
