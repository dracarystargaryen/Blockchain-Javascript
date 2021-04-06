"use strict";
var express = require('express');
var app = express();
const Blockchain = require("./blockchain");

function uuidv4() {
    return 'xxxxxxxxx-xxxx-4xxx-xxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var i = Math.random() * 16 | 0, j = k == 'x' ? r : (r & 0x3 | 0x8);
        return j.toString(16); 
    });
}

let nodes = uuidv4();
app.get('/', function (req, res) {
    res.send(JSON.stringify(Blockchain.chain));
});
app.get('/chain', function(req, res){
    res.send(JSON.stringify(Blockchain));
});

app.get('/mine', function(req,res){
    var lastproof;
    let lastblock = Blockchain.lastblock();
    if (lastblock == 0 ){
        lastproof = 0;
    }
    else{
        lastproof = lastblock.proof;
    }
    var proof = Blockchain.proofOfWork(lastproof);
    //Begins adding blockchains to be mined.
    var index = Blockchain.newTransaction(0, nodeId, 1);
    let previousHash = Blockchain.hash(lastblock);
    let block = Blockchain.newblock (proof, previousHash);

    res.send(JSON.stringify(block));
});

app.post('/nodes/register', function (req,res){
    var nodes = req.query.nodes;
    if (nodes == ""){
        res.send("List of nodes here");
    }
    nodes.forEach(element => {
        Blockchain.register_node(element);
    });
    res.send("Nodes added to the block");
});

app.get('/nodes/resolve', function (req, res){
    var replace = Blockchain.resolveconflicts();
    res.send(JSON.stringify(Blockchain));
});

var args = process.argv.slice(2)[0];
console.log('Launching bitnode to the port: ', args);

var server = app.listen(args, function(){

});