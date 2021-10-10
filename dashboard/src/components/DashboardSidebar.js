import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import RoomServiceIcon from "@material-ui/icons/RoomService";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

import NavItem from "./NavItem";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "",
  name: "Katarina Smith",
};

const items = [
  {
    href: "/app/dashboard",
    icon: HomeIcon,
    title: "Home",
  },
  {
    href: "/app/search",
    icon: SearchIcon,
    title: "Search",
  },
  {
    href: "/app/campaign",
    icon: RoomServiceIcon,
    title: "Campaigns",
  },
  {
    href: "/app/enrich",
    icon: ConfirmationNumberIcon,
    title: "Enrich",
  },
  {
    href: "/app/account",
    icon: SettingsIcon,
    title: "Settings",
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          p: 2,
          background: "#F4F6F8",
          m: 2,
          borderRadius: "16px",
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: "pointer",
            width: 45,
            height: 45,
            mr: 3,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
