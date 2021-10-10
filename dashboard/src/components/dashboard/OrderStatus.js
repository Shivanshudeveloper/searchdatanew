import { Card, CardContent, Grid, Typography } from "@material-ui/core";

const itemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const OrderStatus = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={4} sx={{ justifyContent: "space-around" }}>
        <Grid item md={4} sx={itemStyle}>
          <Typography color="textSecondary" gutterBottom variant="h6">
            Open Orders
          </Typography>
          <Typography color="textPrimary" variant="h3">
            6
          </Typography>
        </Grid>
        <Grid item md={4} sx={itemStyle}>
          <Typography color="textSecondary" gutterBottom variant="h6">
            Completed Orders
          </Typography>
          <Typography color="textPrimary" variant="h3">
            1
          </Typography>
        </Grid>
        <Grid item md={4} sx={itemStyle}>
          <Typography color="textSecondary" gutterBottom variant="h6">
            Active Subscriptions
          </Typography>
          <Typography color="textPrimary" variant="h3">
            1
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default OrderStatus;
