import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import theme from "../theme";

interface _appProps {
  Component: any;
  pageProps: any;
}

const MyApp: React.FC<_appProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Navigation pageProps={undefined} />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default MyApp;
