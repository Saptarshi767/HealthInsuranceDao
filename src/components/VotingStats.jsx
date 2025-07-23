import { Box, Text, VStack, HStack, Progress, Badge, Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { useMockVoting } from "../hooks/useVoting";

const VotingStats = ({ claims }) => {
  const { getClaimVotes } = useMockVoting();

  // Calculate overall statistics
  const totalClaims = claims.length;
  const pendingClaims = claims.filter(claim => !getClaimVotes(claim.id).resolved).length;
  const approvedClaims = claims.filter(claim => {
    const votes = getClaimVotes(claim.id);
    return votes.resolved && votes.approved;
  }).length;
  const rejectedClaims = claims.filter(claim => {
    const votes = getClaimVotes(claim.id);
    return votes.resolved && !votes.approved;
  }).length;
  const paidClaims = claims.filter(claim => getClaimVotes(claim.id).paid).length;

  const totalClaimValue = claims.reduce((sum, claim) => sum + parseFloat(claim.price), 0);
  const approvedClaimValue = claims
    .filter(claim => {
      const votes = getClaimVotes(claim.id);
      return votes.resolved && votes.approved;
    })
    .reduce((sum, claim) => sum + parseFloat(claim.price), 0);

  return (
    <Box bg="blue.50" p={6} borderRadius="lg" mb={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4} color="blue.800">
        Voting Overview
      </Text>
      
      <VStack spacing={4}>
        <HStack spacing={8} width="100%">
          <Stat>
            <StatLabel color="gray.600">Total Claims</StatLabel>
            <StatNumber color="blue.600">{totalClaims}</StatNumber>
          </Stat>
          
          <Stat>
            <StatLabel color="gray.600">Pending</StatLabel>
            <StatNumber color="yellow.600">{pendingClaims}</StatNumber>
          </Stat>
          
          <Stat>
            <StatLabel color="gray.600">Approved</StatLabel>
            <StatNumber color="green.600">{approvedClaims}</StatNumber>
          </Stat>
          
          <Stat>
            <StatLabel color="gray.600">Rejected</StatLabel>
            <StatNumber color="red.600">{rejectedClaims}</StatNumber>
          </Stat>
        </HStack>

        <Box width="100%">
          <Text fontSize="sm" color="gray.600" mb={2}>Claims Resolution Progress</Text>
          <Progress 
            value={(approvedClaims + rejectedClaims) / totalClaims * 100} 
            colorScheme="blue" 
            size="lg"
            borderRadius="md"
          />
          <Text fontSize="xs" color="gray.500" mt={1}>
            {Math.round((approvedClaims + rejectedClaims) / totalClaims * 100)}% resolved
          </Text>
        </Box>

        <HStack spacing={4} width="100%">
          <Box>
            <Text fontSize="sm" color="gray.600">Total Claim Value</Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.600">
              ${totalClaimValue.toFixed(2)}
            </Text>
          </Box>
          
          <Box>
            <Text fontSize="sm" color="gray.600">Approved Value</Text>
            <Text fontSize="lg" fontWeight="bold" color="green.600">
              ${approvedClaimValue.toFixed(2)}
            </Text>
          </Box>
          
          <Box>
            <Text fontSize="sm" color="gray.600">Paid Out</Text>
            <Text fontSize="lg" fontWeight="bold" color="purple.600">
              {paidClaims} claims
            </Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default VotingStats;
