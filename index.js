const { response } = require('express');
const express = require('express');
const http = require("http")
const fs = require("fs").promises

var tool = require("./scrapper.js");


const app = express();
const PORT = 3000;

var link = "";
var tos = [];

app.use(express.json());

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

app.get('/',(req,res) => {
	fs.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});

app.get('/results.html',(req,res)=> {
    link = req.query.link;
    tos = tool.test(link);
    console.log(tos);
    fs.readFile(__dirname + "/results.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});

app.get('/index.html',(req,res) => {
	fs.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});


app.get('/about.html',(req,res) => {
	fs.readFile(__dirname + "/about.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});

app.get('/contact.html',(req,res) => {
	fs.readFile(__dirname + "/contact.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});

app.get('/popular.html',(req,res) => {
	fs.readFile(__dirname + "/popular.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});

