import * as React from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, } from 'wagmi'
 
export function FileClaim() {
  const { config, error: prepareError,
    isError: isPrepareError, } = usePrepareContractWrite({
    address: '0x00',
    abi: [
      {
        name: 'payHospital',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'payHospital',
  })
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
 
  return (
    <div>
      <button disabled={!write || isLoading} onClick={() => write()}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {isSuccess && (
        <div>
          Successfully submitted Claim!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  )
}