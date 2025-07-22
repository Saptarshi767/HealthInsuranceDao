import React, { useState, useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Web3Button } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { createConfig, configureChains } from "wagmi";
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";
import { useAccount } from "wagmi";
import { Web3Modal } from "@web3modal/react";

const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = "aadfe464fef8ec2fcd82c54ef25ca687";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function Header() {
  const account = useAccount();

  return (
    <Box
      bgColor={"blue.100"}
      className={"flex py-2"}
      style={{
        paddingLeft: "75px",
        paddingRight: "75px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Link to="/" className="flex flex-col justify-center">
        <Text textStyle={"title"} color={"white"}>
          HealthInsuranceDao
        </Text>
      </Link>
      <nav className={"flex flex-row align-bottom"} style={{ gap: "20px" }}>
        <Link to="/home" className="flex flex-col justify-center">
          <Text textStyle={"link"} fontSize={"xl"}>
            Dashboard
          </Text>
        </Link>
        <Link to="/login" className="flex flex-col justify-center">
          <Text textStyle={"link"} fontSize={"xl"}>
            File Claim
          </Text>
        </Link>

        <Link to="/voting" className="flex flex-col justify-center">
          <Text textStyle={"link"} fontSize={"xl"}>
            Voting
          </Text>
        </Link>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Web3Button />
        </div>
      </nav>
    </Box>
  );
}
