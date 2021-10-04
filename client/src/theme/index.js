import { createMuiTheme, colors } from "@mui/material";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#F4F6F8",
      paper: colors.common.white,
    },
    primary: {
      contrastText: "#ffffff",
      main: "#0051CC",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
  },
  shadows,
  typography,
});

export default theme;
