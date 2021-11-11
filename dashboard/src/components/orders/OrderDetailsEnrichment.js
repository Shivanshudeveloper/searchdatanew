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
  Toolbar,
  Checkbox,
  Container,
} from "@material-ui/core";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import CSVReader from "react-csv-reader";

import axios from "axios";
import { API_SERVICE } from "../../URI";

const OrderDetailsEnrichment = () => {
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
      company: user.company,
      job_level: user.job_level,
      job_title_role: user.job_title_role,
      designation: user.job_title_role,
      country: user.country,
      linkedin: user.linkedin,
      email: user.email,
      mobile_phone: user.mobile_phone,
      userInfoCompressed: user,
    };
    axios
      .post(`${API_SERVICE}/add-user`, data)
      .then((res) => {
        setMessage(res.data.error.length > 0 ? res.data.error : "SAVED");
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

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [data, setData] = useState([]);

  const handleForce = (data, fileInfo) => {
    console.log(data);
    setData(data);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  if (data?.length === 0)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV  "
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
        />

        <a href="/test.csv" download target="_blank">
          Download Sample CSV
        </a>
      </div>
    );

  return (
    <Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
      {data.length > 0 && (
        <PerfectScrollbar>
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
                {data?.map((order) => {
                  return (
                    <TableRow hover key={order?.linkedin_username}>
                      <TableCell>{order?.first_name || "-"}</TableCell>
                      <TableCell>{order?.last_name || "-"}</TableCell>
                      <TableCell>{order?.company || "-"}</TableCell>
                      <TableCell>{order?.job_level || "-"}</TableCell>
                      <TableCell>{order?.job_title_role || "-"}</TableCell>
                      <TableCell>{order?.email || "-"}</TableCell>
                      <TableCell>{order?.mobile_phone || "-"}</TableCell>
                      <TableCell>{order?.linkedin || "-"}</TableCell>
                      <TableCell>{order?.country || "-"}</TableCell>
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
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      )}
    </Card>
  );
};

export default OrderDetailsEnrichment;
