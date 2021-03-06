import { Helmet } from "react-helmet";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import LatestOrders from "src/components/dashboard//LatestOrders";

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Client Portal</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        padding: "30px",
      }}
    >
      <Container maxWidth={false}>
        <Typography variant="h4" sx={{ my: "20px" }}>
          Saved List
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
