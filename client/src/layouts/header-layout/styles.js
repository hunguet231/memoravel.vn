import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    height: 48,
    width: "100%",
    padding: "8px 32px",
    borderTop: "1px solid rgb(212, 213, 216, 0.5)",
    borderBottom: "1px solid rgb(212, 213, 216, 0.5)",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    backgroundColor: "rgba(101, 179, 157, 0.1)",
  },
  title: {
    fontSize: 18,
    lineHeight: "30px",
    fontWeight: "bold",
  },
});
