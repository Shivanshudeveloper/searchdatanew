import moment from "moment";
import React, { useState, useEffect } from "react";

import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TableFooter,
  TablePagination,
  CircularProgress,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/styles";
import axios from "axios";
import { API_SERVICE } from "../../URI";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const LatestOrders = (props) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    axios
      .get(`${API_SERVICE}/fetch_saved_users`)
      .then((res) => {
        console.log(res.data.users);
        setOrders(res.data.users);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getOrders();
  }, []);

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
          {theme?.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
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
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme?.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme?.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (orders?.length === 0) return <CircularProgress />;

  return (
    <>
      <div
        style={{
          margin: "10px 0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />

        <Table id="table-to-xls" style={{ display: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Linkedin</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? orders?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : orders
            )?.map((order) => (
              <TableRow hover key={order?.id}>
                <TableCell>{order?.first_name || "-"}</TableCell>
                <TableCell>{order?.last_name || "-"}</TableCell>
                <TableCell>{order?.company || "-"}</TableCell>
                <TableCell>{order?.designation || "-"}</TableCell>
                <TableCell>{order?.email || "-"}</TableCell>
                <TableCell>{order?.linkedin || "-"}</TableCell>
                <TableCell>{order?.country || "-"}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Card {...props}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Linkedin</TableCell>
                  <TableCell>Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? orders?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : orders
                )?.map((order) => (
                  <TableRow hover key={order?.id}>
                    <TableCell>{order?.first_name || "-"}</TableCell>
                    <TableCell>{order?.last_name || "-"}</TableCell>
                    <TableCell>{order?.company || "-"}</TableCell>
                    <TableCell>{order?.designation || "-"}</TableCell>
                    <TableCell>{order?.email || "-"}</TableCell>
                    <TableCell>{order?.linkedin || "-"}</TableCell>
                    <TableCell>{order?.country || "-"}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    count={orders?.length}
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
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default LatestOrders;
