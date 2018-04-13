var fs = require('fs');
var Web3 = require('web3');
var sleep = require('sleep');
var contractInstance;
var web3;
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var compile = async function(){
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  var code = fs.readFileSync('Voting2.sol').toString()
  var solc = require('solc')
  var compiledCode = solc.compile(code)
  var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
  console.log(compiledCode.contracts[':Voting'].interface);
  var VotingContract = web3.eth.contract(abiDefinition);
  var byteCode = compiledCode.contracts[':Voting'].bytecode
  var deployedContract = VotingContract.new(['Rama','Nick','Jose'],web3.eth.accounts, {data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
  await timeout(3000);
  contractInstance = VotingContract.at(deployedContract.address); 
  console.log(deployedContract.address);
  // console.log(contractInstance);
  // console.log(contractInstance.totalVotesFor.call("Rama")) ;
  return contractInstance;
}
var getVotes = function(candidate){
  return contractInstance.totalVotesFor.call(candidate);
};
var vote = function(candidate){
  contractInstance.voteForCandidate(candidate, {from: web3.eth.accounts[0]})
};
module.exports = {
	compile,
	getVotes,
	vote
};
