import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    padding: "0 48px",
    [theme.breakpoints.down(900)]: {
      padding: "0 12px",
    },
  },
  logo: {
    width: 40,
    height: 40,
    maxHeight: "100%",
    backgroundColor: "#64b5f6",
  },
  profileAction: {
    position: "absolute",
    top: 60,
    right: 30,
  },
  actionItem: {
    minWidth: 190,
    paddingTop: 3,
    paddingBottom: 3,
  },
}));
