import Router from "./router";
import AppProvider from "./providers/appProvider";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/chakraTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = "aadfe464fef8ec2fcd82c54ef25ca687";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Box className="app" id="app" bgColor={"green.900"}>
          <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <AppProvider>
                <Router />
              </AppProvider>
            </QueryClientProvider>
          </ChakraProvider>
        </Box>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
