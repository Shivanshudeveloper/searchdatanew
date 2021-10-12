import React, { useRef, useState, useEffect } from "react";

import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Typography,
  Autocomplete,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import EmailEditor from "react-email-editor";
import axios from "axios";
import { API_SERVICE } from "../URI";
import { SettingsAccessibilityOutlined } from "@material-ui/icons";

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

  const [userContactsEmail, setUserContactsEmail] = useState([]);
  const [userContactsNames, setUserContactsNames] = useState([]);

  const getOrders = async () => {
    axios
      .get(`${API_SERVICE}/fetch_saved_users`)
      .then((res) => {
        console.log(res.data.users);
        let emails = [];
        let names = [];
        res.data.users.map((user) => {
          if (user.email !== "N/A") emails.push({ email: user.email });
          names.push({
            name: `${user.first_name} ${user.last_name}`,
          });
        });

        setUserContactsEmail(emails);
        setUserContactsNames(names);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getOrders();
  }, []);

  const [campaignEmail, setCampaignEmail] = useState({
    email: "",
    template: "",
  });

  const addEmail = async () => {
    emailEditorRef.current.editor.exportHtml(async (data) => {
      const { design, html } = data;
      // setCampaignEmail({ ...campaignEmail, template: html });
      await axios
        .post(`${API_SERVICE}/saveemail`, {
          email: campaignEmail.email,
          template: html,
          userId: "123123",
        })
        .then((res) => {
          console.log(res.data);
          setCampaignEmail({
            email: "",
            template: "",
          });
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    });
  };

  const [campaignCall, setCampaignCall] = useState({
    name: "",
    date: "",
    time: "",
    desc: "",
  });
  const [campaignTask, setCampaignTask] = useState({
    name: "",
    date: "",
    time: "",
    desc: "",
  });
  const [callCamp, setCallCamp] = useState([]);
  const [taskCamp, setTaskCamp] = useState([]);

  const addCall = async () => {
    await axios
      .post(`${API_SERVICE}/savecall`, campaignCall)
      .then((res) => {
        console.log(res.data);
        handleClose();
        getCall();
      })
      .catch((err) => console.log(err));
  };
  const getCall = async () => {
    await axios
      .get(`${API_SERVICE}/getcall`)
      .then((res) => {
        setCallCamp(res.data.users);
      })
      .catch((err) => console.log(err));
  };
  const addTask = async () => {
    await axios
      .post(`${API_SERVICE}/savetask`, campaignTask)
      .then((res) => {
        console.log(res.data);
        handleClose();
        getTask();
      })
      .catch((err) => console.log(err));
  };
  const getTask = async () => {
    await axios
      .get(`${API_SERVICE}/gettask`)
      .then((res) => {
        setTaskCamp(res.data.users);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCall();
    getTask();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [isCall, setIsCall] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCampaignCall({
      name: "",
      date: "",
      time: "",
      desc: "",
    });
    setCampaignTask({
      name: "",
      date: "",
      time: "",
      desc: "",
    });
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
                options={userContactsEmail}
                // value={campaignEmail.email}
                onChange={(event, newValue) => {
                  setCampaignEmail({
                    ...campaignEmail,
                    email: newValue?.email,
                  });
                }}
                getOptionLabel={(opt) => opt.email}
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
                onClick={addEmail}
                variant="contained"
                style={{ margin: "10px" }}
              >
                Add EMAIL
              </Button>
            </div>

            <EmailEditor
              style={{ marginTop: "40px", height: "60vh" }}
              ref={emailEditorRef}
              onLoad={onLoad}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flex: "0.2",
              }}
            >
              <Button
                onClick={() => {
                  handleClickOpen();
                  setIsCall(true);
                }}
                variant="contained"
                style={{ margin: "10px" }}
              >
                Add CALL
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>To</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {callCamp.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.desc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flex: "0.2",
              }}
            >
              <Button
                onClick={() => {
                  handleClickOpen();
                  setIsCall(false);
                }}
                variant="contained"
                style={{ margin: "10px" }}
              >
                Add TASK
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taskCamp.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.desc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle id="alert-dialog-title">
              {isCall ? "ADD CALL" : "ADD TASK"}
            </DialogTitle>
            {isCall ? (
              <DialogContent>
                <Autocomplete
                  fullWidth
                  options={userContactsNames}
                  // value={campaignEmail.email}
                  onChange={(event, newValue) => {
                    setCampaignCall({
                      ...campaignCall,
                      name: newValue?.name,
                    });
                  }}
                  getOptionLabel={(opt) => opt.name}
                  renderInput={(param) => {
                    return (
                      <TextField
                        {...param}
                        label="Contact Name"
                        variant="outlined"
                        fullWidth
                      />
                    );
                  }}
                  sx={{ mb: 3 }}
                ></Autocomplete>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  sx={{ width: "47%", mr: 1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => {
                    setCampaignCall({
                      ...campaignCall,
                      date: event.target.value,
                    });
                  }}
                />
                <TextField
                  id="time"
                  label="Time"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: "47%", ml: 1 }}
                  onChange={(event) => {
                    setCampaignCall({
                      ...campaignCall,
                      time: event.target.value,
                    });
                  }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  sx={{ mt: 3 }}
                  multiline
                  rows={4}
                  onChange={(event) => {
                    setCampaignCall({
                      ...campaignCall,
                      desc: event.target.value,
                    });
                  }}
                />
              </DialogContent>
            ) : (
              <DialogContent>
                <Autocomplete
                  fullWidth
                  options={userContactsNames}
                  // value={campaignEmail.email}
                  onChange={(event, newValue) => {
                    setCampaignTask({
                      ...campaignTask,
                      name: newValue?.name,
                    });
                  }}
                  getOptionLabel={(opt) => opt.name}
                  renderInput={(param) => {
                    return (
                      <TextField
                        {...param}
                        label="Assigned To"
                        variant="outlined"
                        fullWidth
                      />
                    );
                  }}
                  sx={{ mb: 3 }}
                ></Autocomplete>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  sx={{ width: "47%", mr: 1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => {
                    setCampaignTask({
                      ...campaignTask,
                      date: event.target.value,
                    });
                  }}
                />
                <TextField
                  id="time"
                  label="Time"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: "47%", ml: 1 }}
                  onChange={(event) => {
                    setCampaignTask({
                      ...campaignTask,
                      time: event.target.value,
                    });
                  }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  sx={{ mt: 3 }}
                  multiline
                  rows={4}
                  onChange={(event) => {
                    setCampaignTask({
                      ...campaignTask,
                      desc: event.target.value,
                    });
                  }}
                />
              </DialogContent>
            )}
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button
                onClick={() => {
                  isCall ? addCall() : addTask();
                }}
                autoFocus
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
};

export default Services;
