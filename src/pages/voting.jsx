import { Box, Text } from "@chakra-ui/react";
import Dropdown from "../components/collapsable";
import LineChartComponent from "../components/lineChart";

const claimsData = [
  {
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
    name: "Colonoscopy",
    price: "3.50",
    patientAddress: "X",
    hospitalName: "X",
    recPriceLow: "X",
    recPriceHigh: "X",
    votingLink: "X"
  },
  {
    name: "Appendectomy",
    price: "7.54",
    patientAddress: "X",
    hospitalName: "X",
    recPriceLow: "X",
    recPriceHigh: "X",
    votingLink: "X"
  }
];

export default function HomePage() {
  return (
    <Box display="flex" className="page">
      <Box flex="1" p={4}>
        <Box bg="blue.100" className="p-6 rounded-lg" textAlign="left" marginBottom="3%">
          <Text textStyle={"title"} color={"white"}>
            Vote on Claims
          </Text>
        </Box>
        {claimsData.map((claim, index) => (
          <Box marginTop="2%" key={index}>
            <Dropdown
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
