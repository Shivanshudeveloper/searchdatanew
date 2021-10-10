import { Helmet } from "react-helmet";
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import { v4 as uuid } from "uuid";

const itemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const Commision = () => (
  <>
    <Helmet>
      <title>Commision | Client Portal</title>
    </Helmet>

    <Box sx={{ px: 10, py: 5 }}>
      <Typography variant="h4" sx={{ my: "20px" }}>
        Affiliate program
      </Typography>
      <Paper sx={{ p: 7 }}>
        <Typography variant="subtitle1">
          Get your unique referral link and earn a commission for each order
          your referred clients place with us.
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Your link is:
        </Typography>
        <div sx={{ display: "flex" }}>
          <Typography
            variant="subtitle2"
            sx={{
              p: 1,
              mt: 2,
              background: "#fafafd",
              width: "30%",
              borderRadius: "5px",
              border: "1px solid grey",
            }}
          >
            {uuid()}
          </Typography>
          <Button size="small" variant="contained" sx={{ mt: 2 }}>
            Copy link
          </Button>
        </div>
      </Paper>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={4} sx={{ justifyContent: "space-around" }}>
            <Grid item md={2} sx={itemStyle}>
              <Typography color="textSecondary" gutterBottom variant="h6">
                Visitors
              </Typography>
              <Typography color="textPrimary" variant="h3">
                -
              </Typography>
            </Grid>
            <Grid item md={2} sx={itemStyle}>
              <Typography color="textSecondary" gutterBottom variant="h6">
                Signups
              </Typography>
              <Typography color="textPrimary" variant="h3">
                -
              </Typography>
            </Grid>
            <Grid item md={2} sx={itemStyle}>
              <Typography color="textSecondary" gutterBottom variant="h6">
                Clients
              </Typography>
              <Typography color="textPrimary" variant="h3">
                -
              </Typography>
            </Grid>
            <Grid item md={2} sx={itemStyle}>
              <Typography color="textSecondary" gutterBottom variant="h6">
                Unpaid Earnings
              </Typography>
              <Typography color="textPrimary" variant="h3">
                -
              </Typography>
            </Grid>
            <Grid item md={2} sx={itemStyle}>
              <Typography color="textSecondary" gutterBottom variant="h6">
                Total Earnings
              </Typography>
              <Typography color="textPrimary" variant="h3">
                -
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h4" sx={{ my: "20px" }}>
        Referrals
      </Typography>
      <Paper sx={{ p: 4, my: 4 }}>
        <Typography variant="subtitle2" align="center">
          When one of your referrals creates an account you'll see them here…
        </Typography>
      </Paper>

      <Typography variant="h4" sx={{ my: "20px" }}>
        Commissions
      </Typography>
      <Paper sx={{ p: 4, my: 4 }}>
        <Typography variant="subtitle2" align="center">
          When one of your referrals makes a payment you'll see a commission
          here…
        </Typography>
      </Paper>
    </Box>
  </>
);

export default Commision;
