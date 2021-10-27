import React from "react";
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
import { useManageLayout } from "hooks";
import { useStyles } from "./styles";

const Header = () => {
  const defaultClasses = useStyles();
  const {
    isCloseWithMobile,
    setIsOpenSidebar,
    isShowSelectHeader,
    setIsShowHeader,
  } = useManageLayout();

  return (
    <AppBar color="inherit" position="sticky">
      <Box className={defaultClasses.root}>
        {isCloseWithMobile ? (
          <IconButton
            onClick={() => setIsOpenSidebar((currentData) => !currentData)}
          >
            <Menu />
          </IconButton>
        ) : (
          <Box></Box>
        )}
        <IconButton onClick={() => setIsShowHeader(true)}>
          <Avatar alt={""} src={""} />
        </IconButton>
        {isShowSelectHeader && (
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

export default Header;
