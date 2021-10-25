import { makeStyles } from "@material-ui/core";

export const DRAWER_WIDTH_OPEN = 210;

export const useStyles = makeStyles({
  root: {
    position: "sticky",
    width: DRAWER_WIDTH_OPEN,
    height: "calc(100vh - 60px)",
    minWidth: DRAWER_WIDTH_OPEN,
    top: 60,
    overflowY: "auto",
    background: "#3e4045",
  },
  list: {
    padding: 0,
  },
});
