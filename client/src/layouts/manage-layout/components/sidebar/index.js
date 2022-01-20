import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, Box } from "@material-ui/core";
import {
  ClassOutlined,
  ListAltOutlined,
  AccountCircleOutlined,
  Menu,
} from "@material-ui/icons";
import CastConnectedIcon from "@material-ui/icons/CastConnected";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import StorefrontIcon from "@material-ui/icons/Storefront";
import BallotIcon from "@material-ui/icons/Ballot";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { AppConstant, PathConstant } from "const";
import SidebarItem from "./sidebar-item";
import { useStyles } from "./styles";

const Sidebar = ({ profile }) => {
  const defaultClasses = useStyles();

  return (
    <Box className={defaultClasses.root}>
      <List className={defaultClasses.list}>
        <ListItem className={defaultClasses.listItem}>
          <Menu className={defaultClasses.icon} />
        </ListItem>
        {SIDEBAR_DATA.map(
          (item, index) =>
            profile?.role &&
            profile?.role <= item.role && (
              <SidebarItem key={index} item={item} />
            )
        )}
      </List>
    </Box>
  );
};

Sidebar.propTypes = {
  profile: PropTypes.object,
};

export default Sidebar;

const SIDEBAR_DATA = [
  {
    text: "Chủ đề",
    icon: <ListAltOutlined color="inherit" />,
    path: PathConstant.MANAGE_TOPIC,
    role: AppConstant.ROLE.manage,
  },
  {
    text: "Bài viết",
    icon: <ClassOutlined color="inherit" />,
    path: PathConstant.MANAGE_POST,
    role: AppConstant.ROLE.manage,
  },
  {
    text: "Shop",
    icon: <StorefrontIcon color="inherit" />,
    path: PathConstant.MANAGE_SHOP,
    role: AppConstant.ROLE.manage,
  },
  {
    text: "Sản phẩm",
    icon: <BallotIcon color="inherit" />,
    path: PathConstant.MANAGE_PRODUCT,
    role: AppConstant.ROLE.manage,
  },
  {
    text: "Đơn hàng",
    icon: <ReceiptIcon color="inherit" />,
    path: PathConstant.MANAGE_ORDER,
    role: AppConstant.ROLE.manage,
  },
  {
    text: "Thống kê",
    icon: <EqualizerIcon color="inherit" />,
    path: PathConstant.MANAGE_STATISTIC,
    role: AppConstant.ROLE.manage,
  },
  {
    text: "Quản lý User",
    icon: <AccountCircleOutlined color="inherit" />,
    path: PathConstant.MANAGE_USER,
    role: AppConstant.ROLE.admin,
  },
  {
    text: "Tối ưu SEO",
    icon: <CastConnectedIcon color="inherit" />,
    path: PathConstant.MANAGE_SEO,
    role: AppConstant.ROLE.admin,
  },
];
