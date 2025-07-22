import { Box, Button, Collapse, Flex, Text, Link } from "@chakra-ui/react";
import { useState } from "react";

function CustomDropdown({ name, price, date, patientAddress, hospitalName, recPriceLow, recPriceHigh, votingLink }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Button onClick={toggleDropdown} variant="secondary" paddingRight="5%">
        <Flex justify="space-between" align="center" width="100%">
          <Text color="white" marginRight="80%" width="1%">{name}</Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text color="white" width="100%">${price}</Text>
            <img
              src={isOpen ? "./up.png" : "./down.svg"}
              alt="Collapse Icon"
              width="40px"
            />
          </div>
        </Flex>
      </Button>
      <Collapse in={isOpen}>
        <Box p={4} mt={2} border="1px" borderColor="gray.200" rounded="md" bg="blue.300">
          <Text color="white">Date: {date}</Text>
          <Text color="white">Patient Address: {patientAddress}</Text>
          <Text color="white">Hospital Name: {hospitalName}</Text>
          <Text color="white">Recommended Price: ${recPriceLow}-${recPriceHigh}</Text>
          <Text color="white">Voting Link:</Text>
          <Link href={votingLink} color="white" fontWeight="semiBold" className="underline">{votingLink}</Link>
        </Box>
      </Collapse>
    </Box>
  );
}

export default CustomDropdown;
