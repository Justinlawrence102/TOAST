const { response } = require('express');
const express = require('express');
const http = require("http")
const fs = require("fs").promises

var tool = require("./scrapper.js");


const app = express();
const PORT = 3000;
const path = require('path'); 

app.use(express.static(path.join(__dirname, "public")));
//app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', './');

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

var link = "";
var tos = [];

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
    tool.callScrapper(link)
        .then(function(result){
            res.render('results.html',{
            send_var: JSON.stringify(result).replace(/\\/g, '\\\\').replace(/"/g, '\\\"')
                });
        })
        .catch(function(error){
            console.log(error)
    });
    //console.log(tos);
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

