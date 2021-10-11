import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { useTheme } from "@material-ui/styles";

import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableFooter,
  TablePagination,
  IconButton,
  Snackbar,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";

import axios from "axios";
import { API_SERVICE } from "../../URI";

const OrderDetails = () => {
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme?.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton onClick={handleNextButtonClick} aria-label="next page">
          {theme?.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orders, setOrders] = useState([]);

  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const saveToList = async (user) => {
    const data = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      company: user.job_company_name,
      designation: user.job_title,
      country: user.location_country,
      linkedin: user.linkedin_username,
      email:
        user && user.emails && user.emails.length > 0
          ? user.emails[0].address
          : "N/A",
      userInfoCompressed: user,
    };
    axios
      .post(`${API_SERVICE}/add-user`, data)
      .then((res) => {
        setMessage("SAVED");
        handleClick();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
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
  );
  const [isFilter, setIsFilter] = useState(false);

  const getOrders = async () => {
    setOrders([]);
    axios
      .get(
        `${API_SERVICE}/fetch_users/
      ${page * rowsPerPage}/
      ${rowsPerPage}`
      )
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.users);
        setIsFilter(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();
  }, [page, rowsPerPage]);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const initialState = {
    name: "",
    email: "",
    linkedin: "",
    // country: "",
    phone: "",
    design: "",
    company: "",
  };
  const [search, setSearch] = useState(initialState);

  const applyFilter = async () => {
    setOrders([]);
    if (search !== initialState) {
      console.log(search);
      axios
        .post(`${API_SERVICE}/filter_users/`, search)
        .then((res) => {
          handleCloseDialog();
          setSearch(initialState);
          if (res.data?.users?.length > 0) {
            // setMessage(`Number of data found : ${res.data?.users?.length}`);
            // handleClick();
            setOrders(res.data.users);
            setIsFilter(true);
          } else {
            setMessage(`No data found`);
            handleClick();
            getOrders();
          }
        })
        .catch((err) => console.log(err));
    } else {
      getOrders();
      handleCloseDialog();
    }
  };

  if (orders?.length === 0) return <CircularProgress />;

  return (
    <Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
      <PerfectScrollbar>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography style={{ marginLeft: "20px", marginTop: "10px" }}>
            {isFilter && <>Number of data found : {orders?.length}</>}
          </Typography>
          <div>
            <Button
              variant="contained"
              style={{ float: "right", marginRight: "35px", marginTop: "20px" }}
              color="primary"
              startIcon={<FilterListIcon />}
              onClick={handleClickOpenDialog}
            >
              Filter
            </Button>
            {isFilter && (
              <Button
                variant="contained"
                style={{
                  float: "right",
                  marginRight: "35px",
                  marginTop: "20px",
                }}
                color="primary"
                onClick={() => {
                  setIsFilter(false);
                  getOrders();
                }}
              >
                RESET
              </Button>
            )}
          </div>
        </div>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Level</TableCell>
                <TableCell>Job Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>LinkedIn Username</TableCell>
                <TableCell>Country</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow hover key={order?.linkedin_username}>
                  <TableCell>{order?.first_name || "-"}</TableCell>
                  <TableCell>{order?.last_name || "-"}</TableCell>
                  <TableCell>{order?.job_company_name || "-"}</TableCell>
                  <TableCell>
                    {order?.job_title_levels?.join("") || "-"}
                  </TableCell>
                  <TableCell>{order?.job_title_role || "-"}</TableCell>
                  <TableCell>{order?.email?.join(",") || "-"}</TableCell>
                  <TableCell>{order?.mobile_phone || "-"}</TableCell>
                  <TableCell>{order?.linkedin_username || "-"}</TableCell>
                  <TableCell>{order?.countries?.join(",") || "-"}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        saveToList(order);
                      }}
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
            {!isFilter && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    count={17000}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </Box>
      </PerfectScrollbar>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="md"
        onClose={handleCloseDialog}
      >
        <DialogTitle id="alert-dialog-title">Apply Filters</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              defaultValue="Name"
              value={search.name}
              onChange={(e) => setSearch({ ...search, name: e.target.value })}
              fullWidth
              label="Name"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              defaultValue="LinkeIn"
              value={search.linkedin}
              onChange={(e) =>
                setSearch({ ...search, linkedin: e.target.value })
              }
              fullWidth
              label="Linkedin"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              defaultValue="Company"
              value={search.company}
              onChange={(e) =>
                setSearch({ ...search, company: e.target.value })
              }
              fullWidth
              label="Company"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              defaultValue="Designation"
              value={search.design}
              onChange={(e) => setSearch({ ...search, design: e.target.value })}
              fullWidth
              label="Designation"
              variant="outlined"
            />
            {/* <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              defaultValue="Country"
              value={search.country}
              onChange={(e) =>
                setSearch({ ...search, country: e.target.value })
              }
              fullWidth
              label="Country"
              variant="outlined"
            /> */}
            {/* <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              defaultValue="Email"
              value={search.email}
              onChange={(e) => setSearch({ ...search, email: e.target.value })}
              fullWidth
              label="Email"
              variant="outlined"
            /> */}
            <TextField
              id="outlined-basic"
              style={{ marginBottom: "18px" }}
              defaultValue="Phone"
              value={search.phone}
              onChange={(e) => setSearch({ ...search, phone: e.target.value })}
              fullWidth
              label="Phone"
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button
            onClick={() => {
              setSearch(initialState);
            }}
            color="primary"
          >
            Clear Filters
          </Button>
          <Button onClick={applyFilter} color="primary" autoFocus>
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default OrderDetails;
