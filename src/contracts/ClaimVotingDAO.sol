// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClaimVotingDAO {
    struct Claim {
        uint256 id;
        string hospitalName;
        address patientAddress;
        string procedure;
        uint256 amount;
        uint256 approveVotes;
        uint256 rejectVotes;
        bool paid;
        bool resolved;
        bool approved;
        mapping(address => bool) hasVoted;
    }

    address[] public votingMembers;
    mapping(address => bool) public isVotingMember;
    mapping(uint256 => Claim) private claims;
    uint256 public claimCounter;

    event ClaimSubmitted(uint256 indexed claimId, string hospitalName, address patientAddress, string procedure, uint256 amount);
    event Voted(uint256 indexed claimId, address indexed voter, bool approve);
    event ClaimResolved(uint256 indexed claimId, bool approved);
    event ClaimPaid(uint256 indexed claimId);

    modifier onlyVotingMember() {
        require(isVotingMember[msg.sender], "Not a voting member");
        _;
    }

    constructor(address[] memory _votingMembers) {
        for (uint i = 0; i < _votingMembers.length; i++) {
            votingMembers.push(_votingMembers[i]);
            isVotingMember[_votingMembers[i]] = true;
        }
    }

    function submitClaim(string memory hospitalName, address patientAddress, string memory procedure, uint256 amount) external returns (uint256) {
        claimCounter++;
        Claim storage c = claims[claimCounter];
        c.id = claimCounter;
        c.hospitalName = hospitalName;
        c.patientAddress = patientAddress;
        c.procedure = procedure;
        c.amount = amount;
        emit ClaimSubmitted(claimCounter, hospitalName, patientAddress, procedure, amount);
        return claimCounter;
    }

    function voteOnClaim(uint256 claimId, bool approve) external onlyVotingMember {
        Claim storage c = claims[claimId];
        require(!c.resolved, "Claim already resolved");
        require(!c.hasVoted[msg.sender], "Already voted");
        c.hasVoted[msg.sender] = true;
        if (approve) {
            c.approveVotes++;
        } else {
            c.rejectVotes++;
        }
        emit Voted(claimId, msg.sender, approve);
        // Check if majority reached
        uint256 majority = (votingMembers.length / 2) + 1;
        if (c.approveVotes >= majority) {
            c.resolved = true;
            c.approved = true;
            emit ClaimResolved(claimId, true);
        } else if (c.rejectVotes >= majority) {
            c.resolved = true;
            c.approved = false;
            emit ClaimResolved(claimId, false);
        }
    }

    function getClaim(uint256 claimId) external view returns (
        uint256 id,
        string memory hospitalName,
        address patientAddress,
        string memory procedure,
        uint256 amount,
        uint256 approveVotes,
        uint256 rejectVotes,
        bool paid,
        bool resolved,
        bool approved
    ) {
        Claim storage c = claims[claimId];
        return (
            c.id,
            c.hospitalName,
            c.patientAddress,
            c.procedure,
            c.amount,
            c.approveVotes,
            c.rejectVotes,
            c.paid,
            c.resolved,
            c.approved
        );
    }

    function markClaimPaid(uint256 claimId) external onlyVotingMember {
        Claim storage c = claims[claimId];
        require(c.resolved && c.approved, "Claim not approved");
        require(!c.paid, "Already paid");
        c.paid = true;
        emit ClaimPaid(claimId);
    }

    function getVotingMembers() external view returns (address[] memory) {
        return votingMembers;
    }
} 