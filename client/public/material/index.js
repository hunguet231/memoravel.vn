import palette from "./palette";
import breakpoints from "./breakpoints";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette,
  breakpoints,
});

export default theme;

export { palette };
