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
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

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
    //var toastObjectArray = [{ sentence: "1", isHighlight: false},{ sentence: "Who May Use the Services You may use the Services only if you agree to form a binding contract with Twitter and are not a person barred from receiving services under the laws of the applicable jurisdiction", "isHighlight": true, "phraseID": 10, "phrase": "You agree to not misuse the Service", "UIType": "Pull Quotes and Factoids", "imageName": "id_10_do_not_misuse.png", "sourceURL": 'www.com', "confidence": 9}];

   //tos = tool.test(link);
//    res.render('results.html',{
//          test: "testing"
//        });
    tool.callScrapper(link)
        .then(function(result){
            //var personObject = result.toString()
            //console.log(result)
            res.render('results.html',{
            //var toastObjectArray = [{ 'sentence': '1', 'isHighlight': false},{ 'sentence': ' Who May Use the Services You may use the Services only if you agree to form a binding contract with Twitter and are not a person barred from receiving services under the laws of the applicable jurisdiction', 'isHighlight': true, 'phraseID': 10, 'phrase': 'You agree to not misuse the Service', 'UIType': 'Pull Quotes and Factoids', 'imageName': 'id_10_do_not_misuse.png', 'sourceURL': '', 'confidence': 9}];
            test: JSON.stringify(result).replace(/\\/g, '\\\\').replace(/"/g, '\\\"')
                });
            fs.readFile(__dirname + "/results.html")
                .then(contents => {
                    res.setHeader("Content-Type", "text/html");
                 //   res.sendData(result)
                  //  res.json(result)
                    res.writeHead(200);

                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
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

