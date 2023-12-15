"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function add() {
  const [formData, setFormData] = React.useState({
    username: "",
    subject: "",
    message: "",
    email: "",
    date: "",
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

    setFormData({
      username: "",
      subject: "",
      message: "",
      email: "",
      date: "",
    });
  };
  return (
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
          name="subject"
          label="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="message"
          label="Message"
          value={formData.message}
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
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Link href="/Dashboard/bbb">
          <Typography
            sx={{
              display: "inline-block",
              textDecoration: "none",
              cursor: "pointer",
              WebkitTextStrokeWidth: "thin",
              color: "inherit",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Typography>
        </Link>
      </form>
    </Box>
  );
}

export default add;
