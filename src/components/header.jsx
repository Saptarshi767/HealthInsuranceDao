import React, { useState, useEffect } from "react";
import { Box, Text, Button, Badge } from "@chakra-ui/react";
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
      </Link>      <nav className={"flex flex-row align-bottom"} style={{ gap: "20px" }}>
        <Link to="/connect" className="flex flex-col justify-center">
          <Text textStyle={"link"} fontSize={"xl"} color={"white"} _hover={{ color: "blue.200" }}>
            Connect
          </Text>
        </Link>
        <Link to="/home" className="flex flex-col justify-center">
          <Text textStyle={"link"} fontSize={"xl"} color={"white"} _hover={{ color: "blue.200" }}>
            Dashboard
          </Text>
        </Link>
        <Link to="/filing" className="flex flex-col justify-center">
          <Text textStyle={"link"} fontSize={"xl"} color={"white"} _hover={{ color: "blue.200" }}>
            File Claim
          </Text>
        </Link>
        <Link to="/feed" className="flex flex-col justify-center">
          <Text textStyle={"link"} fontSize={"xl"} color={"white"} _hover={{ color: "blue.200" }}>
            Claims Feed
          </Text>
        </Link>

        <Link to="/voting" className="flex flex-col justify-center">
          <Box position="relative">
            <Button
              colorScheme="blue"
              variant="solid"
              size="md"
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              }
              _hover={{ 
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bg: "blue.600"
              }}
              transition="all 0.2s"
              bg="blue.500"
            >
              Vote on Claims
            </Button>
            <Badge
              colorScheme="red"
              variant="solid"
              borderRadius="full"
              position="absolute"
              top="-8px"
              right="-8px"
              fontSize="xs"
              minW="20px"
              h="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              3
            </Badge>
          </Box>
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
