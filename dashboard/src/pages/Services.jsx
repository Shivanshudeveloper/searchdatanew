import React, { useRef, useState } from "react";

import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Typography,
  Autocomplete,
  Button,
  TextField,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import EmailEditor from "react-email-editor";

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

  const emailEditorRef = useRef(null);
  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
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
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <div
              style={{ display: "flex", justifyContent: "center", flex: "0.2" }}
            >
              <Autocomplete
                // options={userContactsEmail}
                getOptionLabel={(opt) => opt}
                style={{ width: "50%" }}
                renderInput={(param) => {
                  return (
                    <TextField
                      {...param}
                      label="Search E-mail"
                      variant="outlined"
                    />
                  );
                }}
              ></Autocomplete>
              <Button
                // onClick={() => setOpenEmailAdd(true)}
                variant="contained"
                style={{ margin: "10px" }}
              >
                Add Contact
              </Button>
            </div>

            <EmailEditor
              style={{ marginTop: "40px", height: "60vh" }}
              ref={emailEditorRef}
              onLoad={onLoad}
            />
          </TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </Container>
      </Box>
    </>
  );
};

export default Services;
