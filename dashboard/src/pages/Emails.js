import React from 'react';
import { Helmet } from "react-helmet";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const Emails = () => {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (

  <>
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create a new campagin</DialogTitle>
      <DialogContent>

        <TextField id="outlined-basic" fullWidth sx={{ mb: 2, mt: 4 }} label="Name" variant="outlined" />
        <TextField id="outlined-basic" fullWidth sx={{ mb: 2 }}  label="Email Used" variant="outlined" />
        <TextField id="outlined-basic" fullWidth sx={{ mb: 2 }}  label="Email To" variant="outlined" />
        <TextField id="outlined-basic" fullWidth sx={{ mb: 2 }}  label="Subject" variant="outlined" />
        <TextField id="outlined-basic" multiline rows={4} fullWidth sx={{ mb: 2 }}  label="Body" variant="outlined" />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>


    <Helmet>
      <title>Dashboard | Client Portal</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        padding: "30px",
      }}
    >


      <Container maxWidth={false}>
        <Button
          color="primary"
          variant="contained"
          sx={{ float: 'right' }}
          onClick={handleClickOpen}
        >
          Send Email
        </Button>
        <Typography variant="h4" sx={{ my: "20px" }}>
          Email List
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Name of Campagin</TableCell>
                <TableCell align="center">Email Used</TableCell>
                <TableCell align="center">Email Opened</TableCell>
                <TableCell align="center">Email Deleted</TableCell>
                <TableCell align="center">Email Archive</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={1}>
                  <TableCell component="th" scope="row">
                    1001
                  </TableCell>
                  <TableCell align="center">Test Campagin</TableCell>
                  <TableCell align="center">testme@gmail.com</TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center">0</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </Box>
  </>
  )
};

export default Emails;
