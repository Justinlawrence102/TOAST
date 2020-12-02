const natural = require('natural');
const axios = require('axios');
//const fetch = require("node-fetch");
let TOSSentence = require('./TOSSentenceObject');

var phrases = new Array();

//getPhrases(blockOfText)
//getPhrases(["TEST", "Hello World!"])
//    .then(function(result){
//        console.log(result)
//    })
//    .catch(function(error){
//        console.log("ERROR")
//});

function getPhrases(blockOfTextArray) {
    var TOASTTranslation = new Array();
    var existingPhrases = new Array();

    return new Promise(function(resolve, reject){
        axios.get('http://www.toastapp.infinityfreeapp.com/getDatabaseData.php')
        .then((response) => {
            phrases = response.data;
            //console.log(blockOfTextArray.length)
            for (m = 0; m < blockOfTextArray.length; m++) {
                //    console.log(m);
                var sentences = blockOfTextArray[m].split(".");
                for (i = 0; i < sentences.length; i++) { //loops through each sentnce in paragraph
                    var foundTranslation = false;
                    natural.PorterStemmer.attach();
                    //splits up by sentance
                    var curSentence = sentences[i].tokenizeAndStem()
                    //loop through common phrases to find potentail matches
                    //        console.log("testing sentence: ")
                    //        console.log(sentences[i])
                    for (j = 0; j < phrases.length; j++) { //loops through each of our TOAST phrases to find a match
                        //console.log(phrases[j]["words"])
                        var toastScore = 0
                        for( k = 0; k < curSentence.length; k++) { //loops through each word in the sentnce..do we have a match?
                            //    console.log(curSentence[k])
                            for (x = 0; x<phrases[j]["words"].length; x++) {
                                if ((phrases[j]["words"][x]["word"]) == curSentence[k]) {
                                    toastScore = toastScore + phrases[j]["words"][x]["score"]
                                    break;
                                }
                            }
                            //                if (phrases[j]["words"]["word"].includes(curSentence[k])) {
                            //                    numMatches ++
                            //                }
                        }
                        // var percentMatch = (numMatches/phrases[j]["words"].length)
                        //  console.log(toastScore)
                        if (toastScore >= 7) {
                            if (toastScore > 10) {toastScore = 10}
                            if (existingPhrases.includes(phrases[j]['phraseID'])) {
                                let testSentence = new TOSSentence(sentences[i], true);
                                //testSentence.getDetails()
                                TOASTTranslation.push(testSentence)
                                foundTranslation = true
                                break;
                            }
                            else {
                                existingPhrases.push(phrases[j]['phraseID'])
                                let testSentence = new TOSSentence(sentences[i], true, phrases[j]['phraseID'], phrases[j]['phrase'], phrases[j]['UIType'], phrases[j]['imageName'], phrases[j]['sourceURL'], toastScore);
                                //testSentence.getDetails()
                                TOASTTranslation.push(testSentence)
                                foundTranslation = true
                                break;
                            }
                        }
                    }
                    if (!foundTranslation && sentences[i] != "") {
                        let testSentence = new TOSSentence(sentences[i], false);
                        TOASTTranslation.push(testSentence)
                        //testSentence.getDetails()
                    }
                }
                //  res.end("Done!");
            }
            //console.log(TOASTTranslation)
            resolve(TOASTTranslation);
        });
    });
        
}
module.exports = { getPhrases };
