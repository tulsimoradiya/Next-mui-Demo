"use client";
import { useState } from "react";
import { TextField, Grid, Typography } from "@mui/material";
import Link from "next/link";

const SignupForm = () => {
  const [signupData, setSignupData] = useState({
    FristName: "",
    email: "",
    password: "",
  });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupSubmit = async function (e) {
    e.preventDefault();
    // setSignupData("");
    // console.log("Signup Data:", signupData);
    try {
      const response = await fetch(
        "https://fccc-2405-201-200d-159-4c69-f3f-a912-134c.ngrok-free.app/user/register-api/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem("token", token);
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Grid textAlign="center">
      <form onSubmit={handleSignupSubmit}>
        <h3>Welcome to Sign-Up Page</h3>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="UserName"
              label="UserName"
              variant="outlined"
              value={signupData.name}
              onChange={handleSignupChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="FristName"
              label="FristName"
              variant="outlined"
              value={signupData.name}
              onChange={handleSignupChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="LastName"
              label="LastName"
              variant="outlined"
              value={signupData.name}
              onChange={handleSignupChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={signupData.email}
              onChange={handleSignupChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={signupData.password}
              onChange={handleSignupChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Link
              href="/"
              style={{ textDecoration: "none !important", color: "inherite" }}
            >
              <Typography sx={{ WebkitTextStrokeWidth: "thin" }}>
                Sign Up
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default SignupForm;
