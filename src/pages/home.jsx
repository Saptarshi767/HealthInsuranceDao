import { Text, Box, Flex } from "@chakra-ui/react";
import LineChartComponent from "../components/lineChart";

const claimData = [
  { hospitalName: "XYZ", patientAddress: "0x876541...", procedure: "Colonoscopy", price: "$2000" },
];

export default function HomePage() {
  return (
    <Flex className="page">
      <Box flex="1" p={4}>
        <Box bg="blue.100" className="p-6 rounded-lg" textAlign="left">
        <Text textStyle={"subTitle"}>Treasury</Text>
        </Box>
        <Box bg="black" className="p-6 rounded-lg" marginTop="5%" height="50%">
          <LineChartComponent />
        </Box>
      </Box>
      <Box flex="1" p={4}>
        <Box bg="blue.100" className="p-6 rounded-lg" textAlign="left">
          <Text textStyle={"subTitle"}>Claims</Text>
        </Box>
        <Box bg="blue.100" marginTop="5%" className="p-6 rounded-lg" textAlign="left">
          <Flex justify="space-between" align="center" width="100%">
            <h1>Hospital:</h1>
            <h1>Patient:</h1>
            <h1>Procedure:</h1>
            <h1>Price:</h1>
          </Flex>
        </Box>
        {claimData.map((claim, index) => (
          <Box key={index} bg="blue.300" marginTop="3%" className="p-6 rounded-lg" textAlign="left">
            <Flex justify="space-between" align="center" width="100%">
              <h1>{claim.hospitalName}</h1>
              <h1>{claim.patientAddress}</h1>
              <h1>{claim.procedure}</h1>
              <h1>{claim.price}</h1>
            </Flex>
          </Box>
        ))}
      </Box>
    </Flex>
  );
}
