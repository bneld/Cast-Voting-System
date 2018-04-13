var voters = ;

var candidates = ['Rama', 'Nick', 'Jose'];

var rand;
console.log("running");
function setTimer(){
    voters.forEach(function(voter){
        rand = candidates[Math.floor(Math.random() * candidates.length)];
        contractInstance.voteForCandidate(rand, {from: voter})
    });
}
