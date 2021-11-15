import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  item: {
    minHeight: 36,
    color: "white",
    "&:hover": {
      background: theme.palette.primary.dark,
    },
    "&$selectedItem": {
      background: theme.palette.primary.dark,
      "&:hover": {
        background: theme.palette.primary.main,
      },
    },
    "& svg": {
      fontSize: 16,
    },
  },
  itemIcon: {
    minWidth: 30,
    color: "inherit",
  },
  selectedItem: {},
}));
