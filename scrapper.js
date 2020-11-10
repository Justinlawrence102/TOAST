const axios = require('axios');
const cheerio = require('cheerio');
const http = require('http');
const { stringify } = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

var tos = [];

axios.get('https://twitter.com/en/tos').then((response) => {
	const $ = cheerio.load(response.data);
	$('p').each(function(i,elem){
		let curP = $(this).text();
		tos.push(curP); 
	})
})

console.log(tos[0])