pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract Voting {

  struct voter {
    address voterAddress; // The address of the voter
    bool hasVoted;
  }
  
  mapping (bytes32 => uint8) public votesReceived;

  /* Maps an Ethereum address to their voter profile*/
  mapping (address => voter) public voterInfo;
  
  /* List of candidates */
  bytes32[] public candidateList;
  address[] public voterList;


  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bytes32[] candidateNames, address[] voters) public {
    candidateList = candidateNames;
    voterList = voters; 
    // for(uint i = 0; i < voters.length; i++) {
      // voterInfo[voters[i]] = voter(voters[i], false);
    // }
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) view public returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate) public {
    if(validCandidate(candidate) && validVoter(msg.sender)){
      votesReceived[candidate] += 1;
      voterInfo[msg.sender].hasVoted = true;
    }
  }

  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function validVoter(address voterAddress) view public returns (bool) {
    return voterInfo[voterAddress].voterAddress == address(0x0) && !voterInfo[voterAddress].hasVoted;
  }

  function getVoters() view public returns (address[]) {
    return voterList;
  }
  function getCandidates() view public returns (bytes32[]) {
    return candidateList;
  }
}
