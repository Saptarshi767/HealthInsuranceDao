import React from 'react';
import { Box, Text, VStack, FormControl, FormLabel, Input, Textarea, CheckboxGroup, Stack, Checkbox } from '@chakra-ui/react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const CustomPlanPage = () => {
  return (
    <Box p={5} className="page-background">
      <VStack spacing={6} maxW="3xl" mx="auto">
        <GlassCard>
          <Text fontSize="3xl" fontWeight="bold" color="white" mb={4} textAlign="center">
            Create Your Custom Health Plan
          </Text>
          <Text color="gray.300" textAlign="center" mb={8}>
            Tell us your needs, and we'll build a plan that's perfect for you.
          </Text>

          <VStack spacing={6} as="form">
            <FormControl isRequired>
              <FormLabel color="white">Full Name</FormLabel>
              <Input placeholder="John Doe" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white">Email Address</FormLabel>
              <Input type="email" placeholder="john.doe@example.com" />
            </FormControl>

            <FormControl>
              <FormLabel color="white">What services are you interested in?</FormLabel>
              <CheckboxGroup colorScheme="purple">
                <Stack spacing={2} direction="column">
                  <Checkbox value="cardiology">Cardiology</Checkbox>
                  <Checkbox value="neurology">Neurology</Checkbox>
                  <Checkbox value="vision">Vision Care</Checkbox>
                  <Checkbox value="general">General Medicine</Checkbox>
                  <Checkbox value="pharmacy">Pharmacy</Checkbox>
                  <Checkbox value="emergency">Emergency Care</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>

            <FormControl>
              <FormLabel color="white">Tell us more about your needs</FormLabel>
              <Textarea placeholder="Describe your specific health requirements, budget, or any other details." />
            </FormControl>

            <Button size="lg" type="submit">
              Submit Request
            </Button>
          </VStack>
        </GlassCard>
      </VStack>
    </Box>
  );
};

export default CustomPlanPage;