import { Box, Button, Collapse, Flex, Text, Link, Badge, HStack, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useMockVoting } from "../hooks/useVoting";

function CustomDropdown({ 
  id, 
  name, 
  price, 
  date, 
  patientAddress, 
  hospitalName, 
  recPriceLow, 
  recPriceHigh, 
  votingLink 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const { voteOnClaim, payoutClaim, getClaimVotes, isVoting, isPaying, votingError } = useMockVoting();
  
  const claimId = id || Math.floor(Math.random() * 1000); // Fallback for demo
  const voteData = getClaimVotes(claimId);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleVote = async (approve) => {
    try {
      await voteOnClaim(claimId, approve);
      toast({
        title: `Vote ${approve ? 'Approved' : 'Rejected'}`,
        description: `You have successfully voted to ${approve ? 'approve' : 'reject'} this claim.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Voting Failed',
        description: votingError || 'Failed to submit vote',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePayout = async () => {
    try {
      await payoutClaim(claimId);
      toast({
        title: 'Payout Processed',
        description: 'The claim payout has been successfully processed.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Payout Failed',
        description: votingError || 'Failed to process payout',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getStatusBadge = () => {
    if (voteData.paid) {
      return <Badge colorScheme="green" variant="solid">PAID</Badge>;
    }
    if (voteData.resolved) {
      return voteData.approved 
        ? <Badge colorScheme="blue" variant="solid">APPROVED</Badge>
        : <Badge colorScheme="red" variant="solid">REJECTED</Badge>;
    }
    return <Badge colorScheme="yellow" variant="solid">PENDING</Badge>;
  };
  return (
    <Box>
      <Button onClick={toggleDropdown}>
        <Flex justify="space-between" align="center" width="100%">
          <HStack spacing={4} flex={1}>
            <Text color="white" fontWeight="bold">{name}</Text>
            {getStatusBadge()}
          </HStack>
          <HStack spacing={4}>
            <Text color="white" fontWeight="semibold">${price}</Text>
            <img
              src={isOpen ? "./up.png" : "./down.svg"}
              alt="Collapse Icon"
              width="40px"
            />
          </HStack>
        </Flex>
      </Button>
      <Collapse in={isOpen}>
        <Box p={4} mt={2} border="1px" borderColor="gray.200" rounded="md" bg="blue.300">
          <VStack align="start" spacing={3}>
            <Text color="white"><strong>Date:</strong> {date}</Text>
            <Text color="white"><strong>Patient Address:</strong> {patientAddress}</Text>
            <Text color="white"><strong>Hospital Name:</strong> {hospitalName}</Text>
            <Text color="white"><strong>Recommended Price:</strong> ${recPriceLow}-${recPriceHigh}</Text>
            
            {/* Vote Counts */}
            <HStack spacing={4}>
              <Text color="white"><strong>Approve Votes:</strong> {voteData.approveVotes}</Text>
              <Text color="white"><strong>Reject Votes:</strong> {voteData.rejectVotes}</Text>
            </HStack>

            {/* Voting Buttons */}
            {!voteData.resolved && !voteData.userVoted && (
              <HStack spacing={3} mt={4}>
                <Button
                  colorScheme="green"
                  size="sm"
                  onClick={() => handleVote(true)}
                  isLoading={isVoting}
                  loadingText="Voting..."
                  disabled={voteData.userVoted}
                >
                  Approve
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleVote(false)}
                  isLoading={isVoting}
                  loadingText="Voting..."
                  disabled={voteData.userVoted}
                >
                  Reject
                </Button>
              </HStack>
            )}

            {/* Payout Button */}
            {voteData.resolved && voteData.approved && !voteData.paid && (
              <Button
                colorScheme="blue"
                size="sm"
                onClick={handlePayout}
                isLoading={isPaying}
                loadingText="Processing..."
                mt={2}
              >
                Process Payout
              </Button>
            )}

            {/* User Vote Status */}
            {voteData.userVoted && (
              <Badge colorScheme="purple" variant="outline">
                You have already voted on this claim
              </Badge>
            )}

            {/* Voting Link */}
            <Box mt={2}>
              <Text color="white"><strong>Voting Link:</strong></Text>
              <Link href={votingLink} color="white" fontWeight="semiBold" className="underline">
                {votingLink}
              </Link>
            </Box>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}

export default CustomDropdown;
