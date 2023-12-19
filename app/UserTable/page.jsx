"use client";
import * as React from 'react';
import axios from "axios";
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
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';
import Dashboard from "../Dashboard/page";

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
  const [editingIndex, setEditingIndex] = React.useState(-1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingIndex(-1);
  };
  const [formData, setFormData] = React.useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get('https://a50b-49-43-32-233.ngrok-free.app/user/GetAll/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
          // "Access-Control-Allow-Headers": "*",
          // "Ngrok-Trace-Id":"fa4499189f9f3af842f1ad872caa20d4"
          // "ngrok-skip-browser-warning": 'true',
          // "User-Agent":"PostmanRuntime/7.36.0",
          // "Accept-Encoding":"gzip, deflate, br",
          // "Connection":"keep-alive"
        }
      });
      if (response.ok) {
        const responseData = response.data();
        console.log("responseData", responseData);
        setRows(responseData);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // const deleteData = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await fetch('https://a50b-49-43-32-233.ngrok-free.app//user/DeleteByAll/', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     console.log("response status:", response.status);
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log("responseData:", responseData);
  //       setRows([...rows, formData]);
  //       setOpen(false);
  //       setFormData({
  //         username: '',
  //         first_name: '',
  //         last_name: '',
  //         email: '',
  //         password: '',
  //       });
  //     } else {
  //       throw new Error('Network response was not ok');
  //     }
  //   } catch (error) {
  //     console.error('There was a problem with the fetch operation:', error);
  //   }
  // }
  // React.useEffect(() => {
  //   deleteData();
  // }, []);

  const handleEdit =  async (row) => {
    console.log(row);
    if (selectedRow) {
      const idToUpdate = selectedRow.id; 
  
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRow), 
      };
  
      try {
        const response = await fetch(`https://a50b-49-43-32-233.ngrok-free.app/user/UpdateById/${idToUpdate}`, requestOptions);
        console.log("responsewwww", response);
        
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
  
        console.log('User updated successfully');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };
  const handleDelete = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
    localStorage.setItem("formData", JSON.stringify(updatedRows));
  };

  const handleDeleteAll = () => {
    setRows([]);
    localStorage.removeItem("formData");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token)
    try {
      const response = await fetch('https://a50b-49-43-32-233.ngrok-free.app/user/CreateUser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log("response status:", response.status);
      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData:", responseData);
        setRows([...rows, formData]);
        setOpen(false);
        setFormData({
          username: '',
          first_name: '',
          last_name: '',
          password: '',
          email: '',
        });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  // React.useEffect(() => {
  //   const dataFromStorage = JSON.parse(localStorage.getItem('formData')) || [];
  //   setRows(dataFromStorage);
  // }, []);

  return (
    <Dashboard>
      <Box >
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Box sx={{ border: 1 }}>
            <IconButton onClick={handleOpen} sx={{ marginBottom: '11px' }} >
              <Typography variant="body1" sx={{ color: 'grey', marginRight: '4px' }}>ADD</Typography>
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ border: 1, marginLeft: '8px' }}>
            <IconButton onClick={handleDeleteAll} sx={{ marginBottom: '11px' }}>
              <Typography variant="body1" sx={{ color: 'grey', marginRight: '4px' }}>DELETE ALL</Typography>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
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
                  label="username"
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
                  sx={{
                    marginTop: '8px'
                  }}
                />
                <TextField
                  name="last_name"
                  label="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{
                    marginTop: '8px'
                  }}
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{
                    marginTop: '8px'
                  }}
                />
                <TextField
                  name="password"
                  label="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{
                    marginTop: '8px'
                  }}
                />
                <Button type="submit" variant="contained" onClick={handleSubmit} sx={{ marginTop: '10px' }}>
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
                  <StyledTableCell align="right">First_name</StyledTableCell>
                  <StyledTableCell align="right">Last_name</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Password</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
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
                    <StyledTableCell align="right">
                      <IconButton onClick={() => handleEdit(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row)}>
                        <PersonRemoveIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Dashboard>
  );
}



