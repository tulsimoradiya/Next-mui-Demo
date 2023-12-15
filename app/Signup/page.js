"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Grid, Typography } from "@mui/material";
import Link from "next/link";

const SignupForm = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
  });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSignupSubmit = async function (e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://a50b-49-43-32-233.ngrok-free.app/user/register-api/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );
      console.log("Response:", response);
      console.log("hello");
      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        const token = data.tokens.access; 
        localStorage.setItem("token", token);
        router.push("/");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Grid textAlign="center">
      <form >
        <h3>Welcome to Sign-Up Page</h3>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="username"
              label="username"
              variant="outlined"
              value={signupData.username}
              onChange={handleSignupChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="first_name"
              label="first_name"
              variant="outlined"
              value={signupData.first_name}
              onChange={handleSignupChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="last_name"
              label="last_name"
              variant="outlined"
              value={signupData.last_name}
              onChange={handleSignupChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              name="email"
              label="email"
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
              onClick={handleSignupSubmit}
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
