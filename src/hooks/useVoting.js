import { useState, useCallback } from 'react';
import { useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';

// You'll need to import the actual ABI from your contract
const CLAIM_VOTING_DAO_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "claimId", "type": "uint256"}, {"internalType": "bool", "name": "approve", "type": "bool"}],
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
  }
];

// Replace with your actual contract address
const CONTRACT_ADDRESS = "0x87652345"; // Placeholder - replace with actual deployed contract

export const useVoting = () => {
  const [isVoting, setIsVoting] = useState(false);
  const [votingError, setVotingError] = useState(null);

  // Vote on claim
  const { data: voteData, write: voteWrite } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CLAIM_VOTING_DAO_ABI,
    functionName: 'voteOnClaim',
    onError: (error) => {
      setVotingError(error.message);
      setIsVoting(false);
    },
    onSuccess: () => {
      setIsVoting(false);
      setVotingError(null);
    }
  });

  // Mark claim as paid
  const { data: payoutData, write: payoutWrite } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CLAIM_VOTING_DAO_ABI,
    functionName: 'markClaimPaid',
    onError: (error) => {
      setVotingError(error.message);
    },
    onSuccess: () => {
      setVotingError(null);
    }
  });

  const { isLoading: isVoteLoading } = useWaitForTransaction({
    hash: voteData?.hash,
  });

  const { isLoading: isPayoutLoading } = useWaitForTransaction({
    hash: payoutData?.hash,
  });

  const voteOnClaim = useCallback(async (claimId, approve) => {
    try {
      setIsVoting(true);
      setVotingError(null);
      await voteWrite({
        args: [claimId, approve]
      });
    } catch (error) {
      setVotingError(error.message);
      setIsVoting(false);
    }
  }, [voteWrite]);

  const payoutClaim = useCallback(async (claimId) => {
    try {
      setVotingError(null);
      await payoutWrite({
        args: [claimId]
      });
    } catch (error) {
      setVotingError(error.message);
    }
  }, [payoutWrite]);

  return {
    voteOnClaim,
    payoutClaim,
    isVoting: isVoting || isVoteLoading,
    isPaying: isPayoutLoading,
    votingError
  };
};

export const useClaimData = (claimId) => {
  const { data: claimData, isLoading, error, refetch } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CLAIM_VOTING_DAO_ABI,
    functionName: 'getClaim',
    args: [claimId],
    enabled: !!claimId,
    watch: true // This will watch for changes and automatically refetch
  });

  return {
    claimData,
    isLoading,
    error,
    refetch
  };
};

// Mock function for development/testing when contract is not deployed
export const useMockVoting = () => {
  const [isVoting, setIsVoting] = useState(false);
  const [votingError, setVotingError] = useState(null);
  const [claimVotes, setClaimVotes] = useState({});

  const voteOnClaim = useCallback(async (claimId, approve) => {
    setIsVoting(true);
    setVotingError(null);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      setClaimVotes(prev => ({
        ...prev,
        [claimId]: {
          ...prev[claimId],
          approveVotes: (prev[claimId]?.approveVotes || 0) + (approve ? 1 : 0),
          rejectVotes: (prev[claimId]?.rejectVotes || 0) + (approve ? 0 : 1),
          resolved: false, // You can add logic to determine when resolved
          userVoted: true
        }
      }));
      setIsVoting(false);
    } catch (error) {
      setVotingError("Failed to vote");
      setIsVoting(false);
    }
  }, []);

  const payoutClaim = useCallback(async (claimId) => {
    setVotingError(null);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      setClaimVotes(prev => ({
        ...prev,
        [claimId]: {
          ...prev[claimId],
          paid: true
        }
      }));
    } catch (error) {
      setVotingError("Failed to process payout");
    }
  }, []);

  const getClaimVotes = useCallback((claimId) => {
    return claimVotes[claimId] || {
      approveVotes: 0,
      rejectVotes: 0,
      resolved: false,
      approved: false,
      paid: false,
      userVoted: false
    };
  }, [claimVotes]);

  return {
    voteOnClaim,
    payoutClaim,
    getClaimVotes,
    isVoting,
    isPaying: false,
    votingError
  };
};
