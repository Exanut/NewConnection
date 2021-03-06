import { useState, forwardRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import AuthContext from "src/store/auth-context";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Footer from "../components/footer/Footer";

const API_URL = process.env.REACT_APP_API_URL;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const [openFailureAlert, setOpenFailureAlert] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameBlur = () => {
    if (username === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const handlePasswordBlur = () => {
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailureAlert(false);
  };

  const handleLogin = async (e) => {
    try {
      // Get the token
      const tokenResponse = await fetch(`${API_URL}/dj-rest-auth/login/`, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        // Get the userdata
        const userResponse = await fetch(`${API_URL}/userdata/${username}/`);
        const userData = await userResponse.json();
        authCtx.login(tokenData.key, userData);
        console.log(tokenData);
        console.log(userData);
        navigate("/app/dashboard", { replace: true });
      } else {
        setOpenFailureAlert(true);
      }
    } catch (error) {
      let errorMessage = "Authentication failed!";
      console.log(error.message);
      alert(errorMessage);
      setOpenFailureAlert(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>NewConnection</title>
      </Helmet>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Container maxWidth="sm">
          <Box display="flex" justifyContent="center" py="10px">
            <img
              src="/newconnectionlogo.png"
              alt="logo"
              style={
                small
                  ? { maxWidth: 300, marginBottom: 20 }
                  : { maxWidth: 400, marginBottom: 10 }
              }
              display="flex"
            />
          </Box>
          <Box
            item
            px="20pt"
            py="20pt"
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
              error={usernameError}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onFocus={(e) => {
                setUsernameError(false);
              }}
              onBlur={(e) => handleUsernameBlur()}
            />
            <TextField
              fullWidth
              label="Password"
              margin="dense"
              name="password"
              type="password"
              variant="outlined"
              error={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onFocus={(e) => {
                setPasswordError(false);
              }}
              onBlur={(e) => handlePasswordBlur()}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
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
            <Box display="flex" justifyContent="center">
              <Typography
                marginRight="10pt"
                color="textSecondary"
                variant="body1"
                align="center"
              >
                Don't have an account?
              </Typography>
              <Link component={RouterLink} to="/register" variant="body1">
                Sign up
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
      <Snackbar
        open={openFailureAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Authentication failed!
        </Alert>
      </Snackbar>
      <Footer />
      
    </>
  );
};

export default Login;
