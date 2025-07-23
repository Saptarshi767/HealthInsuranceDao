import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import Dropdown from "../components/collapsable";
import LineChartComponent from "../components/lineChart";
import VotingStats from "../components/VotingStats";
import GlassCard from "../components/GlassCard"; // Assuming you have this component
import "../styles/voting.css";

const claimsData = [
  {
    id: 1,
    name: "Chest X-Ray",
    price: "12.99",
    date: "09/25/2023",
    patientAddress: "0x87652345",
    hospitalName: "Carepoint",
    recPriceLow: "1,000",
    recPriceHigh: "4,000",
    votingLink: "https://google.com"
  },
  {
    id: 2,
    name: "Colonoscopy",
    price: "3.50",
    date: "10/15/2023",
    patientAddress: "0x12345678",
    hospitalName: "City Medical Center",
    recPriceLow: "2,500",
    recPriceHigh: "5,500",
    votingLink: "https://example.com/vote/2"
  },
  {
    id: 3,
    name: "Appendectomy",
    price: "7.54",
    date: "11/02/2023",
    patientAddress: "0x98765432",
    hospitalName: "General Hospital",
    recPriceLow: "8,000",
    recPriceHigh: "15,000",
    votingLink: "https://example.com/vote/3"
  }
];

export default function VotingPage() {
  return (
    <Box p={5} className="page-background">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Left Column */}
        <VStack spacing={6}>
          <GlassCard className="glass-card">
            <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
              Vote on Claims
            </Text>
            <VotingStats claims={claimsData} />
          </GlassCard>
          
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} w="100%">
            {claimsData.map((claim) => (
              <GlassCard key={claim.id} w="100%" className="glass-card">
                <Dropdown
                  id={claim.id}
                  name={claim.name}
                  price={claim.price}
                  date={claim.date}
                  patientAddress={claim.patientAddress}
                  hospitalName={claim.hospitalName}
                  recPriceLow={claim.recPriceLow}
                  recPriceHigh={claim.recPriceHigh}
                  votingLink={claim.votingLink}
                />
              </GlassCard>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Right Column */}
        <VStack spacing={6}>
          <GlassCard>
            <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
              Treasury Overview
            </Text>
            <Box height="300px">
              <LineChartComponent />
            </Box>
          </GlassCard>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}
