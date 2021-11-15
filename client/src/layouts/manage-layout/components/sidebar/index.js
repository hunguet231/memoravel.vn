import React from "react";
import { List, ListItem, Box } from "@material-ui/core";
import {
  ClassOutlined,
  ListAltOutlined,
  AccountCircleOutlined,
  Menu,
} from "@material-ui/icons";
import { AppConstant, PathConstant } from "const";
import SidebarItem from "./sidebar-item";
import { useStyles } from "./styles";

const Sidebar = () => {
  const defaultClasses = useStyles();

  return (
    <Box className={defaultClasses.root}>
      <List className={defaultClasses.list}>
        <ListItem className={defaultClasses.listItem}>
          <Menu className={defaultClasses.icon} />
        </ListItem>
        {SIDEBAR_DATA.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

Sidebar.propTypes = {};

export default Sidebar;

const SIDEBAR_DATA = [
  {
    text: "Chủ đề",
    icon: <ListAltOutlined color="inherit" />,
    path: PathConstant.MANAGE_TOPIC,
  },
  {
    text: "Bài viết",
    icon: <ClassOutlined color="inherit" />,
    path: PathConstant.MANAGE_POST,
  },
  {
    text: "Quản lý User",
    icon: <AccountCircleOutlined color="inherit" />,
    path: PathConstant.MANAGE_USER,
    role: AppConstant.ROLE.admin,
  },
];
