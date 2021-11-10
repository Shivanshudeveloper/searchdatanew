import {Grid, Paper, Button, TextField, Container} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import SettingsIcon from "@material-ui/icons/Settings";

const columns = [
  {field: "id", headerName: "ID", width: 70},
  {field: "firstName", headerName: "First name", width: 130},
  {field: "lastName", headerName: "Last name", width: 130},
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

const rows = [
  {id: 1, lastName: "Snow", firstName: "Jon", age: 35},
  {id: 2, lastName: "Lannister", firstName: "Cersei", age: 42},
  {id: 3, lastName: "Lannister", firstName: "Jaime", age: 45},
  {id: 4, lastName: "Stark", firstName: "Arya", age: 16},
  {id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null},
  {id: 6, lastName: "Melisandre", firstName: null, age: 150},
  {id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44},
  {id: 8, lastName: "Frances", firstName: "Rossini", age: 36},
  {id: 9, lastName: "Roxie", firstName: "Harvey", age: 65},
];

const Roles = () => {
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
          <Button
            variant="contained"
            style={{
              marginBottom: "10px",
            }}
          >
            New Role
          </Button>
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
            <span>Guests</span>
            <SettingsIcon />
          </div>
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
            <span>Users</span>
            <SettingsIcon />
          </div>
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
            <span>Workspace Admin</span>
            <SettingsIcon />
          </div>
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
            <span>WorkSpace Editor</span>
            <SettingsIcon />
          </div>
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
            <span>Workspace Member</span>
            <SettingsIcon />
          </div>
          <hr
            style={{
              marginBottom: "10px",
            }}
          ></hr>
        </Grid>
        <Grid item xs={8}>
          <Container component={Paper} style={{
            padding: "10px",
          }}>
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
                <div>
                  <Button variant="contained" style={{
                    marginRight: "10px",
                  }}>Assign Users</Button>
                  <Button variant="contained">Unassign Users</Button>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                />
              </div>
            </div>
            <div style={{height: 400, width: "100%"}}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Roles;
