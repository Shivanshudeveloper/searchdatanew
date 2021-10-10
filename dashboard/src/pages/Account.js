import { Helmet } from "react-helmet";
import SettingsNotifications from "src/components/settings/SettingsNotifications";
import SettingsPassword from "src/components/settings/SettingsPassword";
import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "src/components/account/AccountProfile";
import AccountProfileDetails from "src/components/account/AccountProfileDetails";

const Account = () => (
  <>
    <Helmet>
      <title>Account | Client Portal</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </>
);

export default Account;
