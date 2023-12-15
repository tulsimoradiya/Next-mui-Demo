"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  console.log("loginData", loginData);
  console.log("setLoginData", setLoginData);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/Dashboard");
    }
    console.log("token", token);
  }, []);

  const authenticateToken = async (token) => {
    try {
      const response = await fetch(
        "https://24ec-2405-201-200d-159-1431-2be7-aafe-518d.ngrok-free.app/user/login-api/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("DATA", data);
        router.push("/Dashboard");
      } else {
        router.push("/signup");
      }
    } catch (error) {
      router.push("/signup");
    }
  };
  console.log("authenticateToken", authenticateToken);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginData("");
    console.log("Login Data:", loginData);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        await authenticateToken(token);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <Grid textAlign="center">
      <form onSubmit={handleLoginSubmit}>
        <h3>Welcome Back!</h3>
        {/* <Typography variant="h5">Login</Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={loginData.email}
              onChange={handleLoginChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={loginData.password}
              onChange={handleLoginChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Link
              href="/Dashboard"
              style={{ textDecoration: "none !important", color: "inherite" }}
            >
              <Typography sx={{ WebkitTextStrokeWidth: "thin" }}>
                Login
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Link href="/Signup">Signup</Link>
        </Box>
      </form>
    </Grid>
  );
};

export default LoginPage;
