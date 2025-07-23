// This file contains the smart contract integration setup
// Replace the mock functions with these when you're ready to connect to a real deployed contract

import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, hardhat } from 'wagmi/chains'

// Contract configuration - update these values when you deploy your contract
export const CONTRACT_CONFIG = {
  // Replace with your deployed contract address
  address: "0x0000000000000000000000000000000000000000", 
  
  // Your contract ABI (you can get this from the compiled contract artifacts)
  abi: [
    {
      "inputs": [
        {"internalType": "string", "name": "hospitalName", "type": "string"},
        {"internalType": "address", "name": "patientAddress", "type": "address"},
        {"internalType": "string", "name": "procedure", "type": "string"},
        {"internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "submitClaim",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "uint256", "name": "claimId", "type": "uint256"},
        {"internalType": "bool", "name": "approve", "type": "bool"}
      ],
      "name": "voteOnClaim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "claimId", "type": "uint256"}],
      "name": "getClaim",
      "outputs": [
        {"internalType": "uint256", "name": "id", "type": "uint256"},
        {"internalType": "string", "name": "hospitalName", "type": "string"},
        {"internalType": "address", "name": "patientAddress", "type": "address"},
        {"internalType": "string", "name": "procedure", "type": "string"},
        {"internalType": "uint256", "name": "amount", "type": "uint256"},
        {"internalType": "uint256", "name": "approveVotes", "type": "uint256"},
        {"internalType": "uint256", "name": "rejectVotes", "type": "uint256"},
        {"internalType": "bool", "name": "paid", "type": "bool"},
        {"internalType": "bool", "name": "resolved", "type": "bool"},
        {"internalType": "bool", "name": "approved", "type": "bool"}
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "claimId", "type": "uint256"}],
      "name": "markClaimPaid",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVotingMembers",
      "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimCounter",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    // Events
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "uint256", "name": "claimId", "type": "uint256"},
        {"indexed": false, "internalType": "string", "name": "hospitalName", "type": "string"},
        {"indexed": false, "internalType": "address", "name": "patientAddress", "type": "address"},
        {"indexed": false, "internalType": "string", "name": "procedure", "type": "string"},
        {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "ClaimSubmitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "uint256", "name": "claimId", "type": "uint256"},
        {"indexed": true, "internalType": "address", "name": "voter", "type": "address"},
        {"indexed": false, "internalType": "bool", "name": "approve", "type": "bool"}
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "uint256", "name": "claimId", "type": "uint256"},
        {"indexed": false, "internalType": "bool", "name": "approved", "type": "bool"}
      ],
      "name": "ClaimResolved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "uint256", "name": "claimId", "type": "uint256"}
      ],
      "name": "ClaimPaid",
      "type": "event"
    }
  ]
};

// Wagmi configuration for connecting to different networks
export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, hardhat],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
});

// Helper function to format claim data from contract
export const formatClaimData = (rawClaimData) => {
  if (!rawClaimData) return null;
  
  const [id, hospitalName, patientAddress, procedure, amount, approveVotes, rejectVotes, paid, resolved, approved] = rawClaimData;
  
  return {
    id: Number(id),
    hospitalName,
    patientAddress,
    procedure,
    amount: Number(amount),
    approveVotes: Number(approveVotes),
    rejectVotes: Number(rejectVotes),
    paid,
    resolved,
    approved
  };
};

// Instructions for deployment and setup:
/*
1. Deploy your ClaimVotingDAO.sol contract to your chosen network
2. Update the CONTRACT_CONFIG.address with your deployed contract address
3. Make sure your contract ABI matches the one above
4. Configure your Web3 provider/wallet connection
5. Replace useMockVoting with useVoting in your components
6. Test the integration on a testnet first

For local development with Hardhat:
1. Start a local Hardhat node: npx hardhat node
2. Deploy your contract to localhost
3. Update the contract address
4. Use the hardhat chain configuration

For testnet deployment (Sepolia):
1. Get testnet ETH from a faucet
2. Deploy using: npx hardhat run scripts/deploy.js --network sepolia
3. Update contract address and use sepolia chain

For mainnet:
1. Ensure thorough testing on testnet
2. Use a secure deployment process
3. Consider using a multisig wallet for contract ownership
*/
