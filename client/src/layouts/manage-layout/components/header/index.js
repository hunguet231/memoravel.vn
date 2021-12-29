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
import { AppConstant, PathConstant } from "const";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useStyles } from "./styles";

const Header = ({ profile, isCloseWithMobile, onOpenSidebar }) => {
  const defaultClasses = useStyles();
  const router = useRouter();

  const [isShowSelectHeader, setIsShowHeader] = useState(false);

  const onLogout = () => {
    Cookies.remove(AppConstant.APP_TOKEN);
    router.push(PathConstant.MANAGE_LOGIN);
  };

  return (
    <AppBar color="inherit" position="sticky">
      <ClickAwayListener onClickAway={() => setIsShowHeader(false)}>
        <Box className={defaultClasses.root}>
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img
                src="/images/logo-dark.svg"
                width={40}
                height={40}
                alt="MEMORAVEL.VN"
              />
              <span className={defaultClasses.logoText}>MEMORAVEL</span>
            </div>
          </Link>
          {isCloseWithMobile ? (
            <IconButton onClick={onOpenSidebar}>
              <Menu />
            </IconButton>
          ) : (
            <Box></Box>
          )}
          <IconButton onClick={() => setIsShowHeader(!isShowSelectHeader)}>
            <Avatar
              alt={profile?.full_name}
              src={profile?.avatar || profile?.full_name}
            />
          </IconButton>
          {isShowSelectHeader && profile && (
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
                    onClick={() => onLogout()}
                    primary={
                      <Typography variant="body2" color="inherit">
                        Đăng xuất
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          )}
        </Box>
      </ClickAwayListener>
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
