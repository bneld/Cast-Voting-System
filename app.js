const express = require('express')
const app = express()
var contract = require('./test1.js');
contract.compile();
// console.log(contract);
app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/login', (req, res) =>  res.sendFile('login.html',{root: 'public'}));

app.post('/login', (req, res) => {
	//console.log(req.body);
	//console.log(contract.totalVotesFor.call("Rama"));
	// console.log(contract.getVotes("Rama"));
	res.status(200).send('User logged in');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
