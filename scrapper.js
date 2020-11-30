const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const { connect } = require('http2');
const { resolve } = require('path');
const naturalLanguageParser = require('./parseTOSText');

//var url = "https://twitter.com/tos";
var results = [];

function callScrapper(url){
    return new Promise(function(resolve, reject){
        scrape(url)
        .then(function(result){
            //console.log(result) //this should be the TOS data
            resolve(result)
        })
        .catch(function(error){
            console.log("ERROR")
        });
    });
}

function scrape(link){
	url = link;
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
			else {                
				reject(error);
	        }
        }, (error) => console.log(error) );
        //return tos;
    });
}

module.exports = {callScrapper};
