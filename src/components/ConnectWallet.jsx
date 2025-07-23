import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ExternalLink } from 'lucide-react';
import { Web3Button, Web3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import { arbitrum, mainnet, polygon, goerli } from 'wagmi/chains';
import Button from './Button';

const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = "aadfe464fef8ec2fcd82c54ef25ca687";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const ConnectWalletButton = () => {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="secondary" size="sm" disabled>
        <Wallet className="w-4 h-4 mr-2" />
        Loading...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-700 dark:text-green-300 text-sm font-medium">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
          </div>
        </div>
        <Web3Button />
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Web3Button />
    </div>
  );
};

const ConnectWalletProvider = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  );
};

export { ConnectWalletButton, ConnectWalletProvider };