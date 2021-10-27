import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CardMedia,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";

const Header = () => {
  const defaultClasses = useStyles();

  const [isShow, setIsShow] = useState(false);

  return (
    <AppBar color="inherit" position="sticky">
      <Box className={defaultClasses.root}>
        <CardMedia
          component="img"
          src="/images/logo-1.png"
          className={defaultClasses.logo}
        />
        <IconButton onClick={() => setIsShow(true)}>
          <Avatar alt={""} src={""} />
        </IconButton>
        {isShow && (
          <ClickAwayListener onClickAway={() => setIsShow(false)}>
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
