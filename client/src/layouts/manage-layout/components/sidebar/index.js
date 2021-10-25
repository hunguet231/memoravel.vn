import React from "react";
import { List, Box } from "@material-ui/core";
import { ClassOutlined, ListAltOutlined } from "@material-ui/icons";
import { PathConstant } from "const";
import SidebarItem from "./sidebar-item";
import { useStyles } from "./style";

const Sidebar = () => {
  const defaultClasses = useStyles();

  return (
    <Box className={defaultClasses.root}>
      <List className={defaultClasses.list}>
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
];
