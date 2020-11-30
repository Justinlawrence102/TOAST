const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const { connect } = require('http2');
const { resolve } = require('path');
const naturalLanguageParser = require('./parseTOSText');

var url = "https://twitter.com/en/tos";
var results = [];

scrape(url)
    .then(function(result){
        console.log(result) //this should be the TOS data
    })
    .catch(function(error){
        console.log("ERROR")
});

function scrape(link){
    var tos = [];
    return new Promise(function(resolve, reject){
        axios.get(link)
        .then((response)=> {
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                $('p').each(async function(i, elem) {
                    tos.push($(this).text());
                })
               // resolve(tos);
                resolve(naturalLanguageParser.getPhrases(tos));
            }
        }, (error) => console.log(err) );
        //return tos;
    });
}

results = scrape(url);
console.log(results);
