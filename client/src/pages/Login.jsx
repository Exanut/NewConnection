import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "src/store/auth-context";
import { makeStyles } from "@mui/styles";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles({
  logo: {
    maxWidth: 400,
  },
});

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    const url = `${API_URL}/dj-rest-auth/login/`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.key);
        navigate("/app/dashboard", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | NewConnection</title>
      </Helmet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10%",
          alignContent: "center",
          alignItems: "center",
          height: "100vh",
          marginLeft: "8%",
          marginRight: "8%",
        }}
      >
        <Box justifyContent="center" py="10px">
          <img
            src="/newconnectionlogo.png"
            alt="logo"
            className={classes.logo}
            justifyContent="center"
            display="flex"
          />
        </Box>
        <Box
          item
          px="30px"
          py="40px"
          backgroundColor="white"
          borderRadius="10px"
          justifyContent="center"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          />
          <TextField
            fullWidth
            label="Username"
            margin="dense"
            name="username"
            type="username"
            variant="outlined"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Password"
            margin="dense"
            name="password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              style={{ background: "#FFFFFF", color: "black" }}
              onClick={handleLogin}
            >
              Sign in
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1" align="center">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register" variant="body1">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
