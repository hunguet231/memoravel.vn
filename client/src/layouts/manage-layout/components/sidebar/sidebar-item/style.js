import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  item: {
    minHeight: 36,
    color: "white",
    "&:hover": {
      background: "#913006",
    },
    "&$selectedItem": {
      background: "#5f1e03",
      "&:hover": {
        background: "#913006",
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
