import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts,
});

export default theme;
