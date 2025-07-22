 import { Box, Text } from "@chakra-ui/react";
// import { useForm } from "react-hook-form";


// export default function Login() {
// 	const {
// 		register,
// 		handleSubmit,
// 		watch,
// 		formState: { errors },
// 	} = useForm();

// 	const onSubmit = (data) => console.log(data);
// 	console.log(watch("example")); // watch input value by passing the name of it
// 	return (
// 		<div className="page">
// 			<Box bg="green.900" w={"100%"} maxW={800} className="p-6">
// 				<Text textStyle="title">File Claim</Text>
// 				<form
// 					onSubmit={handleSubmit(onSubmit)}
// 					className={"flex flex-col gap-6"}>
// 					{/* register your input into the hook by invoking the "register" function */}
// 					<h2>EKRNW</h2>
// 					<input {...register("example")} />

// 					{/* include validation with required or other standard HTML validation rules */}
// 					<input {...register("exampleRequired", { required: true })} />
// 					{/* errors will return when field validation fails  */}
// 					{errors.exampleRequired && <span>This field is required</span>}

// 					<input type="submit" />
// 				</form>
// 			</Box>
// 		</div>
// 	);
// }


import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { ethers } from 'ethers'

const { utils } = ethers;

export default function Login() {
  const [hospitalName, setHospitalName] = React.useState('')
  const [patientAddress, setPatientAddress] = React.useState('')
  const [medicalProcedure, setMedicalProcedure] = React.useState('')
  const [medicalProcedureCost, setMedicalProcedureCost] = React.useState('')

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0x08c5966e2f4B7c8773B76c9798D10699ac9B321C',
    abi: [
      {
        name: 'payHospital',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
        {
          "internalType": "string",
          "name": "hospital_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "paymentAmount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_patient_address",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "medicalProcedure",
          "type": "uint256"
        }
      ],
        outputs: [],
      },
    ],
    functionName: 'payHospital',
    args: [hospitalName, patientAddress, utils.BigNumber.from(medicalProcedure), utils.BigNumber.from(medicalProcedureCost)],
  })
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
	<div className="page">
	 <Box bg="green.900" w={"100%"} maxW={800} className="p-6">
	 <Text textStyle="title">File Claim</Text>
        <form onSubmit={(e) => {
			e.preventDefault()
			write?.()
		}}>
          <label htmlFor="hospitalName">Hospital Name</label>
          <input
            id="hospitalName"
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Hospital name"
            value={hospitalName}
          />
		  <br></br>
          <label htmlFor="patientAddress">Patient Address</label>
          <input
            id="patientAddress"
            onChange={(e) => setPatientAddress(e.target.value)}
            placeholder="Patient address"
            value={patientAddress}
          />
		  <br></br>
          <label htmlFor="medicalProcedure">Medical Procedure</label>
          <input
            id="medicalProcedure"
            onChange={(e) => setMedicalProcedure(e.target.value)}
            placeholder="Medical procedure"
            value={medicalProcedure}
          />
		  <br></br>
          <label htmlFor="medicalProcedureCost">Medical Procedure Cost</label>
          <input
            id="medicalProcedureCost"
            onChange={(e) => setMedicalProcedureCost(e.target.value)}
            placeholder="Medical procedure cost"
            value={medicalProcedureCost}
          />
		  <br></br>
          <button disabled={!write || isLoading}>
        	{isLoading ? 'Submitting...' : 'Submit'}
		  </button>
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
  )
}
