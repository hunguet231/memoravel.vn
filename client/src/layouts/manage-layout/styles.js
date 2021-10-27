import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "stretch",
    marginTop: 8,
  },
  main: {
    flexGrow: 1,
    minHeight: "calc(100vh - 68px)",
    backgroundColor: "#fafafb",
  },
});
