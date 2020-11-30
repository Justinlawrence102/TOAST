const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const { connect } = require('http2');
const { resolve } = require('path');
const naturalLanguageParser = require('./parseTOSText');

var url = "https://twitter.com/en/tos";
var results = [];


function scrape(link){
	var tos = [];
	axios.get(link)
		.then((response)=> {
			if(response.status === 200) {
				const html = response.data;
				const $ = cheerio.load(html);
				$('p').each(async function(i, elem) {
					tos.push($(this).text());
				})
                naturalLanguageParser.getPhrases(tos)
			}
		}, (error) => console.log(err) );
		return tos;
}

results = scrape(url);
console.log(results);
