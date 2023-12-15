"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField, Grid, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  console.log("loginData", loginData);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     router.push("/Dashboard");
  //   }
  //   console.log("token", token);
  // }, []);

  // const authenticateToken = async (token) => {
  //   try {
  //     const response = await fetch(
  //       "https://a50b-49-43-32-233.ngrok-free.app/user/login-api/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("DATA", data);
  //       router.push("/Dashboard");
  //     } else {
  //       router.push("/signup");
  //     }
  //   } catch (error) {
  //     router.push("/signup");
  //   }
  // };
  // console.log("authenticateToken", authenticateToken);



  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://a50b-49-43-32-233.ngrok-free.app/user/login-api/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        const token = data.tokens.access; 
        localStorage.setItem("token", token);
        router.push("/Dashboard");
      }else{
      throw new Error(`HTTP error! Status: ${response.status}`);
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
