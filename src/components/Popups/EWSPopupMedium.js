import {React,useState,useEffect} from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  TablePagination
} from "@mui/material";
import '@fontsource/outfit';
import '@fontsource/outfit/400.css';



const getChipStyle = (rating) => {
  switch (rating) {
    case "High":
      return { backgroundColor: "#FEC3C4", color: "#000"};
    case "Medium":
      return { backgroundColor: "#FFE9A2", color: "#000" };
    case "Low":
      return { backgroundColor: "#C8F9C7", color: "#000"};
    default:
      return { backgroundColor: "#d9d9d9", color: "#000" };
  }
};
const API_URL=process.env.REACT_APP_API_BASE_URL;

const EWSPopupLow = () => {
     const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(10);
      const [data,setData]=useState([
              {
               "dateOpened": "",
                  "cifId": "",
                  "borrowerName": "",
                  "priority": "",
                  "exposure": "",
                  "ewsScore": null,
                  "triggers": {
                      "high": "",
                      "low": "",
                      "medium": ""
                  }
            }]);

      const capitalizeEachWord = (str) => {
  return str
    .split(' ')
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
};
      
      useEffect(() => {
                const fetchData = async () => {
                    try {
                        const response = await fetch(`${API_URL}/donutReport/${window.parent.userName}/medium`); //${window.parent.userName}
                        if (!response.ok) {
                            throw new Error('Failed to fetch data');
                        }
                        const data = await response.json();
                        setData(data);
                    } catch (error) {
                        console.error('Error:', error);
                        setData([]);
                    }
                };
              
                fetchData();
              }, []);
              const mediumData=data.filter(row=>row.priority==='Medium')
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
  return (
    <Box sx={{ p: 2, backgroundColor: "#F5F5F5", height: "81.5vh" }}>
      <TableContainer component={Paper} sx={{ borderRadius: "5px" }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell  rowSpan={2} sx={{ fontWeight: 600, backgroundColor: "#FAF8FB" }}>Date</TableCell>
              <TableCell rowSpan={2} sx={{ fontWeight: 600, backgroundColor: "#FAF8FB" }}>Customer ID</TableCell>
              <TableCell rowSpan={2} sx={{ fontWeight: 600, backgroundColor: "#FAF8FB" }}>Borrower Name</TableCell>
              <TableCell rowSpan={2} sx={{ fontWeight: 600, backgroundColor: "#FAF8FB" }}>EWS Rating</TableCell>
              <TableCell rowSpan={2} sx={{ fontWeight: 600, backgroundColor: "#FAF8FB" }}>EWS Score</TableCell>
              <TableCell rowSpan={2} sx={{ fontWeight: 600, backgroundColor: "#FAF8FB" }}>Exposure (Cr.)</TableCell>
              <TableCell colSpan={3} sx={{ fontWeight: 600, backgroundColor: "#FAF8FB", textAlign: 'center' }}>
                Number of Triggers
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, backgroundColor: "#FAF8FB" }}>Red</TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: "#FAF8FB" }}>Amber</TableCell>
              <TableCell sx={{ fontWeight: 600, backgroundColor: "#FAF8FB" }}>Green</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#FAF8FB"
                }}
              >
                 <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.custId}</TableCell>
                                                <TableCell>{capitalizeEachWord(row.borrowerName)}</TableCell>
                                                <TableCell align='center'>
                                                  <Chip label={row.ewsCategory} size="small" sx={getChipStyle(row.ewsCategory)} />
                                                </TableCell>
                                                <TableCell align="center">{row.ewsScore}</TableCell>
                                                 <TableCell align="center">{(row.exposure / 10000000).toFixed(2)}
                                                    </TableCell>
                                                <TableCell align="center">{row.triggers.high}</TableCell>
                                                <TableCell align="center">{row.triggers.medium}</TableCell>
                                                <TableCell align="center">{row.triggers.low}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Rows per page"
      />
    </Box>
  );
};

export default EWSPopupLow;
