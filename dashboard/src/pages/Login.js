import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { auth } from "src/firebase";
import FacebookIcon from "src/icons/Facebook";
import GoogleIcon from "src/icons/Google";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId !== null) {
      window.location.href = "/app/dashboard";
    }
  }, []);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Helmet>
        <title>Login | Client Portal</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "test@gmail.com",
              password: "1234567890",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={(det) => {
              auth
                .signInWithEmailAndPassword(det.email, det.password)
                .then(() => {
                  auth.onAuthStateChanged(function (user) {
                    if (user) {
                      sessionStorage.setItem("userId", user.uid);
                      sessionStorage.setItem("userEmail", user.email);
                      sessionStorage.setItem("userName", user.displayName);
                      window.location.href = "/app/dashboard";
                    } else {
                      setMessage("Something Went Wrong");
                      handleClickOpen();
                    }
                  });
                })
                .catch((err) => {
                  setMessage(err.message);
                  handleClickOpen();
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                  <Box
                    sx={{
                      pb: 3,
                      pt: 3,
                    }}
                  >
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      or login with social media accounts
                    </Typography>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Button
                        color="primary"
                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Facebook
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Google
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Box>
    </>
  );
};

export default Login;
