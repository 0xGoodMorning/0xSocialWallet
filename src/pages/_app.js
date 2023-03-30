import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import { AccountProvider } from "@/contexts/accountContext";

export default function App({ Component, pageProps }) {
  return (
    <AccountProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AccountProvider>
  );
}
