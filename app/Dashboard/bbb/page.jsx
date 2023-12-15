"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from "next/link";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';


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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function CustomizedTables() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = React.useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem("formData")) || [];
    const updatedData = [...existingData, formData];
    localStorage.setItem("formData", JSON.stringify(updatedData));

    setRows(updatedData);
    setOpen("")
    setFormData({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
  };

  React.useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem('formData')) || [];
    setRows(dataFromStorage);
  }, []);
  // const handleAdd = () => {
  //   setRows([...rows, formData]);
  //   setFormData({
  //     username: '',
  //     subject: '',
  //     message: '',
  //     email: '',
  //     date: '',
  //   });
  // };


  return (
    <Box>
      <Button onClick={handleOpen}>Add </Button>
      <AddIcon />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <form onSubmit={handleSubmit}>
              <TextField
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="first_name"
                label="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="last_name"
                label="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="password"
                label="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button type="submit" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
      <Box sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell align="right">first_name</StyledTableCell>
                <StyledTableCell align="right">last_name</StyledTableCell>
                <StyledTableCell align="right">email</StyledTableCell>
                <StyledTableCell align="right">password</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.first_name}</StyledTableCell>
                  <StyledTableCell align="right">{row.last_name}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.password}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}



