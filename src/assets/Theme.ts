import { DefaultTheme } from "react-native-paper";
import { Theme as PaperTheme } from "react-native-paper/lib/typescript/src/types";

const colors = {
    primary: "green",
    white: "#FFFFFF"
};

DefaultTheme.colors.primary = colors.primary;


const settings:PaperTheme = {
  ...DefaultTheme,
};

const Theme = {
  colors,
  settings
};
export default Theme;
