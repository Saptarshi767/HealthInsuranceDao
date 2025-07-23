// Hardhat deployment script for ClaimVotingDAO
// Run with: npx hardhat run scripts/deploy.js --network <network-name>

const { ethers } = require("hardhat");

async function main() {
  console.log("Starting ClaimVotingDAO deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Define initial voting members (replace with actual addresses)
  const votingMembers = [
    deployer.address, // Include deployer as a voting member
    // Add more voting member addresses here
    // "0x1234567890123456789012345678901234567890",
    // "0x0987654321098765432109876543210987654321",
  ];

  console.log("Voting members:", votingMembers);

  // Deploy the contract
  const ClaimVotingDAO = await ethers.getContractFactory("ClaimVotingDAO");
  const claimVotingDAO = await ClaimVotingDAO.deploy(votingMembers);

  await claimVotingDAO.deployed();

  console.log("ClaimVotingDAO deployed to:", claimVotingDAO.address);
  console.log("Transaction hash:", claimVotingDAO.deployTransaction.hash);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await claimVotingDAO.deployTransaction.wait(5);

  // Verify contract on Etherscan (if not local network)
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: claimVotingDAO.address,
        constructorArguments: [votingMembers],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Error verifying contract:", error.message);
    }
  }

  // Test basic functionality
  console.log("Testing basic functionality...");
  
  // Submit a test claim
  const testClaimTx = await claimVotingDAO.submitClaim(
    "Test Hospital",
    deployer.address,
    "Test Procedure",
    ethers.utils.parseEther("1.0") // 1 ETH worth
  );
  await testClaimTx.wait();
  console.log("Test claim submitted with transaction hash:", testClaimTx.hash);

  // Get the claim counter
  const claimCounter = await claimVotingDAO.claimCounter();
  console.log("Current claim counter:", claimCounter.toString());

  // Get the test claim details
  const testClaim = await claimVotingDAO.getClaim(1);
  console.log("Test claim details:", {
    id: testClaim[0].toString(),
    hospitalName: testClaim[1],
    patientAddress: testClaim[2],
    procedure: testClaim[3],
    amount: ethers.utils.formatEther(testClaim[4]),
    approveVotes: testClaim[5].toString(),
    rejectVotes: testClaim[6].toString(),
    paid: testClaim[7],
    resolved: testClaim[8],
    approved: testClaim[9]
  });

  console.log("Deployment completed successfully!");
  console.log("\nNext steps:");
  console.log("1. Update src/contracts/contractConfig.js with the deployed address:");
  console.log(`   address: "${claimVotingDAO.address}"`);
  console.log("2. Replace useMockVoting with useVoting in your components");
  console.log("3. Test the voting functionality in your frontend");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
