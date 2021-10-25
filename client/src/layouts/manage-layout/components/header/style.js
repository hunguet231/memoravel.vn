import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingLeft: 30,
    paddingRight: 30,
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
    right: 42,
  },
  actionItem: {
    minWidth: 190,
    paddingTop: 3,
    paddingBottom: 3,
  },
});
