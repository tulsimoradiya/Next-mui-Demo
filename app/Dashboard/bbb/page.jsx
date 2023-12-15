"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "next/link";
import Typography from "@mui/material/Typography";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem('formData')) || [];
    setRows(dataFromStorage);
  }, []);
  const handleAdd = () => {
    setRows([...rows, formData]);
    setFormData({
      username: '',
      subject: '',
      message: '',
      email: '',
      date: '',
    });
  };


  return (
    <Box>
        <Link
              href="/Dashboard/bbb/add"
              style={{ textDecoration: "none !important", color: "inherite" }}
            >
              <Typography sx={{ WebkitTextStrokeWidth: "thin" }}>
                Add
              </Typography>
            </Link>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell align="right">Subject</StyledTableCell>
                <StyledTableCell align="right">Message</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.subject}</StyledTableCell>
                  <StyledTableCell align="right">{row.message}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.date}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
    </Box>
  );
}



