import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  ListItemText,
  ListItem,
  Typography,
  ListItemIcon,
  Link,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useStyles } from "./styles";

const SidebarItem = ({ item }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Link to={item.path}>
      <ListItem
        button
        classes={{ root: classes.item, selected: classes.selectedItem }}
        selected={item.path === router.pathname}
      >
        <ListItemIcon className={classes.itemIcon}>{item.icon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2" color="inherit">
              {item.text}
            </Typography>
          }
        />
      </ListItem>
    </Link>
  );
};

SidebarItem.propTypes = {
  item: PropTypes.object.isRequired,
};
SidebarItem.defaultProps = {};

export default memo(SidebarItem);
