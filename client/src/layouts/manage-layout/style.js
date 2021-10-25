import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "stretch",
  },
  main: {
    flexGrow: 1,
    minHeight: "calc(100vh - 60px)",
    backgroundColor: "#fafafb",
  },
});
