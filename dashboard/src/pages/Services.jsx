import React, { useState } from "react";

import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Typography,
} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Services = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
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
              Campagins
            </Typography>
          </div>

          <AppBar
            position="static"
            style={{ background: "transparent", boxShadow: "none" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Emails" {...a11yProps(0)} />
              <Tab label="Calls" {...a11yProps(1)} />
              <Tab label="Tasks" {...a11yProps(2)} />
              <Tab label="Templates" {...a11yProps(3)} />
              <Tab label="Analytics" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            
          </TabPanel>
          <TabPanel value={value} index={1}>
            
          </TabPanel>
          <TabPanel value={value} index={2}>
            
          </TabPanel>
          <TabPanel value={value} index={3}>
            
          </TabPanel>
          <TabPanel value={value} index={4}>
            
          </TabPanel>
          
        </Container>
      </Box>
    </>
  );
};

export default Services;
