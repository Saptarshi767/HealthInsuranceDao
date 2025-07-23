# Health Insurance DAO - Voting System

## Overview

The voting system allows DAO members to vote on insurance claims submitted to the platform. This implementation includes both a mock version for development and a real smart contract integration setup.

## Features Implemented

### ✅ Voting Interface
- **Approve/Reject Buttons**: Each claim now has approve and reject voting buttons
- **Vote Status Display**: Shows current vote counts and claim status (Pending, Approved, Rejected, Paid)
- **Vote Progress**: Visual indicators of voting progress with badges and status colors
- **User Vote Tracking**: Prevents double voting and shows user's voting status

### ✅ Voting Logic
- **Mock Implementation**: Fully functional mock voting system for development
- **Smart Contract Ready**: Complete smart contract integration setup (requires deployment)
- **Vote Counting**: Tracks approve/reject votes for each claim
- **Majority Logic**: Claims are resolved when majority threshold is reached

### ✅ Claim Status Management
- **Pending**: Claims awaiting votes
- **Approved**: Claims that received majority approval
- **Rejected**: Claims that received majority rejection  
- **Paid**: Approved claims that have been paid out

### ✅ Payout System
- **Payout Button**: Appears for approved claims that haven't been paid
- **Payout Tracking**: Tracks which claims have been paid out
- **Access Control**: Only authorized members can process payouts

### ✅ Voting Statistics
- **Overall Statistics**: Dashboard showing total, pending, approved, and rejected claims
- **Progress Tracking**: Visual progress bars for claim resolution
- **Financial Metrics**: Total claim value and approved claim value tracking

## Current Implementation

The system currently uses a **mock voting implementation** that simulates smart contract behavior. This allows you to:

- Test all voting functionality without deploying a contract
- Develop and iterate quickly
- Demonstrate the complete user experience

## File Structure

```
src/
├── hooks/
│   └── useVoting.js          # Voting hooks (mock + real contract ready)
├── components/
│   ├── collapsable.jsx       # Updated claim component with voting
│   └── VotingStats.jsx       # Voting statistics dashboard
├── pages/
│   └── voting.jsx            # Updated voting page
├── contracts/
│   ├── ClaimVotingDAO.sol    # Smart contract
│   └── contractConfig.js     # Contract configuration
└── scripts/
    └── deploy.js             # Deployment script
```

## Usage

### Current Mock System

1. Navigate to the voting page
2. Expand any claim to see voting options
3. Click "Approve" or "Reject" to vote
4. View vote counts and status updates
5. For approved claims, click "Process Payout"

### Smart Contract Integration (When Ready)

1. **Deploy the Contract**:
   ```bash
   # Install Hardhat if not already installed
   npm install --save-dev hardhat
   
   # Compile the contract
   npx hardhat compile
   
   # Deploy to local network
   npx hardhat node
   npx hardhat run scripts/deploy.js --network localhost
   
   # Or deploy to testnet
   npx hardhat run scripts/deploy.js --network sepolia
   ```

2. **Update Configuration**:
   - Copy the deployed contract address
   - Update `CONTRACT_CONFIG.address` in `src/contracts/contractConfig.js`
   - Replace `useMockVoting` with `useVoting` in components

3. **Configure Web3 Connection**:
   - Ensure your Web3 wallet is connected
   - Make sure you're on the correct network
   - Verify you have the necessary permissions (voting member)

## Smart Contract Functions

The `ClaimVotingDAO.sol` contract provides:

- `submitClaim()`: Submit new insurance claims
- `voteOnClaim()`: Vote approve/reject on claims
- `getClaim()`: Retrieve claim details and vote counts
- `markClaimPaid()`: Mark approved claims as paid
- `getVotingMembers()`: Get list of authorized voters

## Environment Setup for Smart Contract

Create a `.env` file:

```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your-infura-project-id
MAINNET_RPC_URL=https://mainnet.infura.io/v3/your-infura-project-id
ETHERSCAN_API_KEY=your_etherscan_api_key
REPORT_GAS=true
```

## Security Considerations

- Only authorized voting members can vote on claims
- Each member can only vote once per claim
- Claims are automatically resolved when majority is reached
- Payout requires claim to be approved and not already paid
- All transactions are recorded on-chain for transparency

## Development vs Production

### Development (Current)
- Uses `useMockVoting` hook
- No blockchain interaction required
- Instant feedback and testing
- State persists only in browser session

### Production (After Contract Deployment)
- Uses `useVoting` hook with real contract
- Requires wallet connection and gas fees
- Permanent on-chain storage
- Real financial transactions

## Next Steps

1. **Test Current Implementation**: Verify all voting features work as expected
2. **Deploy Smart Contract**: Use the provided deployment script
3. **Switch to Real Contract**: Update components to use `useVoting` instead of `useMockVoting`
4. **Add More Features**: Consider adding features like:
   - Voting deadlines
   - Quorum requirements
   - Claim submission interface
   - Member management
   - Audit trails

## Troubleshooting

- **Voting buttons not appearing**: Check that claims have unique IDs
- **Mock votes not persisting**: This is expected - refresh resets mock state
- **Contract deployment fails**: Verify network configuration and account balance
- **Transaction errors**: Check wallet connection and gas settings

## Support

For issues with:
- **Frontend**: Check browser console and component props
- **Smart Contract**: Verify deployment and network configuration  
- **Web3 Integration**: Ensure wallet is connected to correct network
