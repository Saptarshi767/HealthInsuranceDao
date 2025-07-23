import { Box, Text } from "@chakra-ui/react";
import Dropdown from "../components/collapsable";
import LineChartComponent from "../components/lineChart";
import VotingStats from "../components/VotingStats";

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

export default function HomePage() {
  return (
    <Box display="flex" className="page">
      <Box flex="1" p={4}>        <Box bg="blue.100" className="p-6 rounded-lg" textAlign="left" marginBottom="3%">
          <Text textStyle={"title"} color={"white"}>
            Vote on Claims
          </Text>
        </Box>
        
        <VotingStats claims={claimsData} />
        
        {claimsData.map((claim, index) => (
          <Box marginTop="2%" key={claim.id}>
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
          </Box>
        ))}
      </Box>
      <Box flex="1" p={4}>
        <Box bg="blue.100" className="p-6 rounded-lg" textAlign="left">
          <Text textStyle={"title"} color={"white"}>
            Treasury
          </Text>
        </Box>
        <Box bg="black" className="p-6 rounded-lg" marginTop="5%" height= "50%">
          <LineChartComponent />
        </Box>
      </Box>
    </Box>
  );
}
