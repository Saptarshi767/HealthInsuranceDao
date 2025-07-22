import { Box, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Web3Button } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";
import { useAccount, useWalletClient } from "wagmi";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import Treasury from "../contracts/Treasury.json";
import { ethers } from "ethers";
import { getAllPolicies } from "../apis/graph";

const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = "aadfe464fef8ec2fcd82c54ef25ca687";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function ConnectPage() {
  const [locked, setLocked] = useState("pending");
  const [policyPrices, setPolicyPrices] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [address, setAddress] = useState(null);

  const account = useAccount();

  const unlockHandler = (e) => {
    setLocked(e.detail);
  };

  const checkout = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  };

  async function getPremium(num) {
    console.log("yeah");

    console.log("getting num", num);
    const treasuryContract = new ethers.Contract(
      Treasury.address,
      Treasury.abi,
      walletClient
    );

    let amnt = await treasuryContract.getPremium(num);

    console.log("premium:", amnt);

    return amnt.toString();
  }

  async function load() {
    let a = await getAllPolicies();
    let edited = [];
    for (let i = 0; i < a.length; i++) {
      console.log(a[i]);
      let premium = await getPremium(a[i].policyNumber);

      let b = {
        name: a[i].name,
        cost: premium,
      };
      edited.push(b);
    }
    console.log(edited);
    setPolicies(edited);
  }

  ///=================================

  useEffect(() => {
    window.addEventListener("unlockProtocol", unlockHandler);

    load();
    return () => {
      window.removeEventListener("unlockProtocol", unlockHandler);
    };
  }, []);

  useEffect(() => {
    if (account) {
      setAddress(account.address);
    }
  }, [account]);

  const connectedBox = (
    <Box
      bg="blue.300"
      w={"100%"}
      maxW={800}
      p={6}
      rounded="lg"
      align="center"
      gap={"20px"}
    >
      <Text textStyle={"title"}>Select Your Policy</Text>
      {policies.map((policy, index) => (
        <div>{policy.name}</div>
      ))}
      <Button variant="primary" onClick={checkout}>
        Purchase Insurance
      </Button>
    </Box>
  );

  const notConnectedBox = (
    <Box
      bg="blue.300"
      w={"100%"}
      maxW={800}
      p={6}
      rounded="lg"
      align="center"
      gap={"20px"}
    >
      <Text textStyle={"title"}>Welcome</Text>
      <img width="25%" src="public/purse.svg" alt="Wallet Icon" />
      <Text textStyle={"subTitle"} mb="20px">
        Connect your account to purchase insurance.
      </Text>
      <Web3Button />
    </Box>
  );

  return (
    <div
      className="page"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {address ? connectedBox : notConnectedBox}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
}
