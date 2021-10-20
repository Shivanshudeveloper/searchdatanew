import React, { useState, useEffect } from "react";

import { Helmet } from "react-helmet";
import { v4 as uuid } from "uuid";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";

import OrderDetails from "src/components/orders//OrderDetails";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import FilterListIcon from "@material-ui/icons/FilterList";

import axios from "axios";
import { API_SERVICE } from "../URI";

const Orders = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Apply Filters</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              fullWidth
              label="Name"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              fullWidth
              label="Job Title"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              fullWidth
              label="Company Name"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              fullWidth
              label="Location"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              fullWidth
              label="Employee"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              fullWidth
              label="Industry"
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog> */}

      <Helmet>
        <title>Customers | Client Portal</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          padding: "30px",
        }}
      >
        <div style={{ marginTop: "50px" }}>
          <OrderDetails />
        </div>
      </Box>
    </>
  );
};

export default Orders;
