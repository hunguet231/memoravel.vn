import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Avatar,
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useStyles } from "./styles";

const Header = ({ profile, isCloseWithMobile, onOpenSidebar }) => {
  const defaultClasses = useStyles();
  const [isShowSelectHeader, setIsShowHeader] = useState(false);

  return (
    <AppBar color="inherit" position="sticky">
      <Box className={defaultClasses.root}>
        {isCloseWithMobile ? (
          <IconButton onClick={onOpenSidebar}>
            <Menu />
          </IconButton>
        ) : (
          <Box></Box>
        )}
        <IconButton onClick={() => setIsShowHeader(true)}>
          <Avatar
            alt={profile?.full_name}
            src={profile?.avatar || profile?.full_name}
          />
        </IconButton>
        {isShowSelectHeader && profile && (
          <ClickAwayListener onClickAway={() => setIsShowHeader(false)}>
            <Paper className={defaultClasses.profileAction}>
              <List component="div">
                <ListItem button className={defaultClasses.actionItem}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="inherit">
                        Tài khoản
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem button className={defaultClasses.actionItem}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="inherit">
                        Đăng xuất
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          </ClickAwayListener>
        )}
      </Box>
    </AppBar>
  );
};

Header.propTypes = {
  profile: PropTypes.object,
  isCloseWithMobile: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
};
Header.defaultProps = {};

export default Header;
