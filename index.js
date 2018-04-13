var web3 = new Web3(new Web3.providers.HttpProvider("http://35.224.171.179:8545"));
var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"getCandidates","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"voterAddress","type":"address"}],"name":"validVoter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"voterList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getVoters","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voterInfo","outputs":[{"name":"voterAddress","type":"address"},{"name":"hasVoted","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"},{"name":"voters","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
var VotingContract = web3.eth.contract(abi);

var contractInstance = VotingContract.at('0x6ec80a5a00a98aaf8c609cb1f7de889b20f77954');

var candidates;
var votes = [];

var refreshData = function(){
  votes = []; // clear votes array
  // clear table
  $('tbody').children("tr").remove();
  candidates.forEach(function(name, index) {
    votes.push(contractInstance.totalVotesFor(name).toNumber());
    $('tbody').append('<tr><td>'+name+'</td><td id="' + index+ '">' + votes[index] + '</td></tr>');

  });
  console.log("Refreshing");
  console.log(candidates);
  console.log(votes);
};

function voteForCandidate() {
  candidateName = $("#candidate").val();
  // console.log(candidateName);
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[2]}, function() {
    var c = candidates.map(x => web3.toAscii(x).replace(/\u0000/g, ''));
    let div_id = c.indexOf(candidateName);
    $("#" + div_id).html(contractInstance.totalVotesFor(candidateName).toNumber());
    // console.log(contractInstance.totalVotesFor(candidateName).toNumber());
  });
}

$(document).ready(function() {
  candidates = contractInstance.getCandidates()
    .map(x => web3.toAscii(x).replace(/\u0000/g, ''));
  // console.log(candidates);
  refreshData();
  // console.log(votes);

  candidates.forEach(function(name, index) {
    // var name = web3.toAscii(cand);
    // console.log(web3.toAscii(cand));
    // var votes = contractInstance.totalVotesFor(name);
    $('tbody').append('<tr><td>'+name+'</td><td id="' + index+ '">' + votes[index] + '</td></tr>');
  });

});

