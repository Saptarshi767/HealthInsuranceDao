import { readContract } from '@wagmi/core'
 
const data = await readContract({
  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  abi: wagmigotchiABI,
  functionName: 'love',
  args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
})

