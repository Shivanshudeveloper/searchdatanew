import {Grid, Paper, Button, TextField, Container} from "@mui/material";
import SettingsIcon from "@material-ui/icons/Settings";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ClearIcon from "@material-ui/icons/Clear";

const Translate = () => {
  function createData(name, translation) {
    return {name, translation};
  }

  const rows = [
    createData("Name 1", "Translation 1"),
    createData("Name 2", "Translation 2"),
    createData("Name 3", "Translation 3"),
    createData("Name 4", "Translation 4"),
    createData("Name 5", "Translation 5"),
  ];

  return (
    <div
      style={{
        margin: "15px",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={3}
          style={{
            marginRight: "20px",
          }}
        >
          <Button variant="text">+ New Localization</Button>
          <hr></hr>
          <div
            className="icons"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeft: "3px solid blue",
              padding: "10px",
              margin: "10px",
            }}
          >
            <span>English</span>
            <SettingsIcon />
          </div>
          <hr
            style={{
              marginBottom: "10px",
            }}
          ></hr>
          <Button variant="contained">Update</Button>
        </Grid>
        <Grid item xs={8}>
          <Container
            component={Paper}
            style={{
              padding: "20px",
            }}
          >
            <div>
              <div
                className="buttons"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Button variant="contained">Add New Translation</Button>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                />
              </div>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Source Text</TableCell>
                    <TableCell align="right">Translation</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{"&:last-child td, &:last-child th": {border: 0}}}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.translation}</TableCell>
                      <TableCell align="right">{<ClearIcon />}</TableCell>
                      <TableCell align="right">{}</TableCell>
                      <TableCell align="right">{}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Translate;
