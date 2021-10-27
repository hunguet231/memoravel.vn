import { makeStyles } from "@material-ui/core";

export const DRAWER_WIDTH_OPEN = 210;

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    width: DRAWER_WIDTH_OPEN,
    height: "calc(100vh - 60px)",
    minWidth: DRAWER_WIDTH_OPEN,
    top: 60,
    overflowY: "auto",
    background: "#3e4045",
    boxShadow:
      "4px 3px 4px -1px rgb(0 0 0 / 20%), 4px 4px 4px 4px rgb(0 0 0 / 14%), 2px 1px 10px 4px rgb(0 0 0 / 12%)",
  },
  list: {
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "flex-end",
    minHeight: 56,
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    color: theme.palette.common.white,
  },
}));
