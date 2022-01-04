import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  TextField,
  Stack,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import { ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";
import { Search as SearchIcon } from "react-feather";
import { parseInt } from "lodash";
import axios from "axios";
import SnackMessage from "src/components/SnackMessage";
import { API_SERVICE } from "src/config/url";

const Search = () => {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [text, setText] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [fetchedData, setFetchedData] = useState(null);
  const [variant, setVariant] = useState(null);
  const [message, setMessage] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);

  const count = 100;

  const userEmail = sessionStorage.getItem("userEmail")
    ? sessionStorage.getItem("userEmail")
    : null;

  useEffect(() => {
    if (fetchedData !== null) {
      const pageCount = parseInt(fetchedData.length / 15);

      if (fetchedData.length % 15 === 0) {
        setTotalPages(pageCount);
      } else {
        setTotalPages(pageCount + 1);
      }
    }
  }, [fetchedData]);

  useEffect(() => {
    if (fetchedData !== null) {
      const currData = fetchedData.slice(start, start + 15);
      setTableData(currData);
    }
  }, [page, fetchedData]);

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `${API_SERVICE}/api/v1/main/random/${count}`
      );
      setFetchedData(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const moveForward = () => {
    setStart(start + 15);
    setPage(page + 1);
  };

  const moveBack = () => {
    setStart(start - 15);
    setPage(page - 1);
  };

  const addtoSaveList = async (rowData) => {
    try {
      const value = { ...rowData, userEmail: userEmail };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        body: value,
      };

      const { data } = await axios.post(
        `${API_SERVICE}/api/v1/main/savedDetails/add`,
        body,
        config
      );

      if (data.success) {
        setMessage("User Added to Saved List");
        setVariant("success");
        setSnackOpen(true);
      } else {
        setMessage("User with this email already exist");
        setVariant("error");
        setSnackOpen(true);
      }
    } catch (error) {
      setMessage(error);
      setVariant("error");
      setSnackOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };
  const handleChange = (e) => {
    setText(e.target.value);

    if (e.target.value === "") {
      setFilteredTableData([]);
      return;
    }
    console.log(e.target.value);
    let data = [...tableData];

    let Filter = data.filter(
      (dat) =>
        dat.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        dat.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        dat.company.toLowerCase().includes(e.target.value.toLowerCase()) ||
        dat.country.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredTableData(Filter);
  };
  return (
    <Box sx={{ py: 8, px: 2 }}>
      <TextField
        fullWidth
        type="text"
        placeholder="Search "
        variant="outlined"
        sx={{ mb: 5, backgroundColor: "white" }}
        value={text}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
      />
      <Card sx={{ py: 4 }}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">Job Role</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Linkedin</TableCell>
                  <TableCell align="center">Country</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredTableData.length === 0 && text === ""
                  ? tableData.map((row) => (
                      <TableRow
                        key={row.email}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.firstName}
                        </TableCell>
                        <TableCell align="center">{row.lastName}</TableCell>
                        <TableCell align="center">{row.company}</TableCell>
                        <TableCell align="center">{row.jobRole}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">
                          {row.linkedinProfile}
                        </TableCell>
                        <TableCell align="center">{row.country}</TableCell>
                        <TableCell align="center">
                          <Button onClick={() => addtoSaveList(row)}>
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : filteredTableData.map((row) => (
                      <TableRow
                        key={row.email}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.firstName}
                        </TableCell>
                        <TableCell align="center">{row.lastName}</TableCell>
                        <TableCell align="center">{row.company}</TableCell>
                        <TableCell align="center">{row.jobRole}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">
                          {row.linkedinProfile}
                        </TableCell>
                        <TableCell align="center">{row.country}</TableCell>
                        <TableCell align="center">
                          <Button onClick={() => addtoSaveList(row)}>
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            {filteredTableData.length === 0 && text !== "" ? (
              <center>
                <Typography color="textPrimary" variant="h2">
                  Not Found
                </Typography>
              </center>
            ) : null}
          </TableContainer>
        </CardContent>
        <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
          {start === 0 ? (
            <IconButton disabled sx={{ mr: 4 }} onClick={() => moveBack()}>
              <ArrowBackIos />
            </IconButton>
          ) : (
            <IconButton sx={{ mr: 4 }} onClick={() => moveBack()}>
              <ArrowBackIos />
            </IconButton>
          )}
          {page === totalPages ? (
            <IconButton disabled onClick={() => moveForward()}>
              <ArrowForwardIos />
            </IconButton>
          ) : (
            <IconButton onClick={() => moveForward()}>
              <ArrowForwardIos />
            </IconButton>
          )}
        </Stack>
      </Card>
      <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={handleClose}
      />
    </Box>
  );
};

export default Search;
