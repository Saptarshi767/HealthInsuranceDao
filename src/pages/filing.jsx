import { Box, Text, Button } from "@chakra-ui/react";
import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { ethers } from "ethers";
import Treasury from "../contracts/Treasury.json";
const { utils } = ethers;

export default function Login() {
  const [hospitalName, setHospitalName] = React.useState("");
  const [patientAddress, setPatientAddress] = React.useState("");
  const [medicalProcedure, setMedicalProcedure] = React.useState("");
  const [medicalProcedureCost, setMedicalProcedureCost] = React.useState("");

  const calculatedValue = (parseFloat(medicalProcedureCost) * 10**18).toString();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Treasury.address, // Replace with imported address
    abi: Treasury.abi, // Replace with imported ABI
    functionName: "payHospital",
    args: [
      hospitalName,
      patientAddress,
      medicalProcedure,
    ],
    value: '1000000000000000',
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  
  return (
    <div className="page">
      <Box
        bg="blue.300"
        maxW={800}
        className="p-6"
        borderRadius="6px"
        width="50%"
        height="70%"
      >
        <Text textStyle="subTitle">File a Claim</Text>
        <hr className="my-4" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            write?.();
          }}
        >
          <Text color="white" htmlFor="hospitalName">
            Hospital Name:
          </Text>
          <input
            id="hospitalName"
            onChange={(e) => setHospitalName(e.target.value)}
            value={hospitalName}
            style={{
              border: "2px solid white",
              borderRadius: "7px",
              marginBottom: "1rem",
              padding: "0.5rem",
              width: "100%",
              color: "white",
              backgroundColor: "transparent",
            }}
          />
          <Text color="white" htmlFor="hospitalName">
            Patient Address:
          </Text>
          <input
            id="patientAddress"
            onChange={(e) => setPatientAddress(e.target.value)}
            value={patientAddress}
            style={{
              border: "2px solid white",
              borderRadius: "7px",
              marginBottom: "1rem",
              padding: "0.5rem",
              width: "100%",
              color: "white",
              backgroundColor: "transparent",
            }}
          />
          <Text color="white" htmlFor="hospitalName">
            Medical Procedure:
          </Text>
          <input
            id="medicalProcedure"
            onChange={(e) => setMedicalProcedure(e.target.value)}
            value={medicalProcedure}
            style={{
              border: "2px solid white",
              borderRadius: "7px",
              marginBottom: "1rem",
              padding: "0.5rem",
              width: "100%",
              color: "white",
              backgroundColor: "transparent",
            }}
          />
          <Text color="white" htmlFor="hospitalName">
            Procedure Cost:
          </Text>
          <input
            id="medicalProcedureCost"
            onChange={(e) => setMedicalProcedureCost(e.target.value)}
            value={medicalProcedureCost}
            style={{
              border: "2px solid white",
              borderRadius: "7px",
              marginBottom: "1rem",
              padding: "0.5rem",
              width: "100%",
              color: "white",
              backgroundColor: "transparent",
            }}
          />
          <Button
            marginTop="2%"
            variant="primary"
            disabled={!write || isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
          {isSuccess && (
            <div>
              Successfully submitted the claim
              <div>
                <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
              </div>
            </div>
          )}
          {(isPrepareError || isError) && (
            <div>Error: {(prepareError || error)?.message}</div>
          )}
        </form>
      </Box>
    </div>
  );
}
