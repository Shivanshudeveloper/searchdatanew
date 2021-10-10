import React, { useState } from "react";

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
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import OrderDetails from "src/components/orders//OrderDetails";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import FilterListIcon from '@material-ui/icons/FilterList';
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

  const orders = [
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
    {
      id: uuid(),
      ref: "CDD1044",
      amount: 16.76,
      customer: {
        name: "Adam Denisov",
        title: "Employee",
        company: "Apple Cop.",
        location: "Mountview California"
      },
      createdAt: 1554670800000,
      status: "delivered",
    },
  ];

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
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Apply Filters</DialogTitle>
        <DialogContent>
          <div >
            <TextField id="outlined-basic" style={{ marginBottom: '18px' }} fullWidth label="Name" variant="outlined" />
            <TextField id="outlined-basic" style={{ marginBottom: '18px' }} fullWidth label="Job Title" variant="outlined" />
            <TextField id="outlined-basic" style={{ marginBottom: '18px' }} fullWidth label="Company Name" variant="outlined" />
            <TextField id="outlined-basic" style={{ marginBottom: '18px' }} fullWidth label="Location" variant="outlined" />
            <TextField id="outlined-basic" style={{ marginBottom: '18px' }} fullWidth label="Employee" variant="outlined" />
            <TextField id="outlined-basic" style={{ marginBottom: '18px' }} fullWidth label="Industry" variant="outlined" />
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
      </Dialog>


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
        <Container maxWidth={false}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ my: "20px" }}>
              Search
            </Typography>
            <div>
              <TextField label="Search" variant="filled" size="small" />
              <IconButton>
                <SearchIcon />
              </IconButton>
            </div>
          </div>
          

          <Button 
            variant="contained"
            style={{ float: 'right', marginRight: '35px', marginTop: '20px' }}
            color="primary"
            startIcon={<FilterListIcon />}
            onClick={handleClickOpen}
          >
            Filter
          </Button>


          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AppBar
                position="static"
                style={{ background: "transparent", boxShadow: "none" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Contacts" {...a11yProps(0)} />
                  <Tab label="Company" {...a11yProps(1)} />
                  <Tab label="Lists" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <OrderDetails orders={orders} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <OrderDetails orders={orders.slice(0, 2)} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <OrderDetails orders={orders.slice(3, 4)} />
              </TabPanel>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Orders;
