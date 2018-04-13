var ctx = document.getElementById("myChart").getContext('2d');
var candidates = contractInstance.getCandidates().map(x => web3.toAscii(x).replace(/\u0000/g, ''));
var votes = [];
candidates.forEach(function(cand){
    votes.push(contractInstance.totalVotesFor(cand).toNumber());
});

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: candidates,
        datasets: [{
            label: '# of Votes',
            data: votes,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

setInterval(function(){
    refreshData();
    // votes[0] += 5;
    myChart.data.labels = [];
    candidates.forEach(function(cand) {
        myChart.data.labels.push(cand);
    })
    myChart.data.datasets[0].data = [];
    votes.forEach(function(vote) {
        myChart.data.datasets[0].data.push(vote);
    })

    // console.log("updating");
    myChart.update();
}, 1000);