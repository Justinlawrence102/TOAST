const natural = require('natural');
const axios = require('axios');
//const fetch = require("node-fetch");
let TOSSentence = require('./TOSSentenceObject');

var phrases = new Array();

var blockOfText = "1. Who May Use the Services You may use the Services only if you agree to form a binding contract with Twitter and are not a person barred from receiving services under the laws of the applicable jurisdiction. In any case, you must be at least 13 years old, or in the case of Periscope 16 years old, to use the Services. If you are accepting these Terms and using the Services on behalf of a company, organization, government, or other legal entity, you represent and warrant that you are authorized to do so and have the authority to bind such entity to these Terms, in which case the words “you” and “your” as used in these Terms shall refer to such entity. 2. Privacy Our Privacy Policy (https://www.twitter.com/privacy) describes how we handle the information you provide to us when you use our Services. You understand that through your use of the Services you consent to the collection and use (as set forth in the Privacy Policy) of this information, including the transfer of this information to the United States, Ireland, and/or other countries for storage, processing and use by Twitter and its affiliates. 3. Content on the Services. You are responsible for your use of the Services and for any Content you provide, including compliance with applicable laws, rules, and regulations. You should only provide Content that you are comfortable sharing with others. Any use or reliance on any Content or materials posted via the Services or obtained by you through the Services is at your own risk. We do not endorse, support, represent or guarantee the completeness, truthfulness, accuracy, or reliability of any Content or communications posted via the Services or endorse any opinions expressed via the Services. You understand that by using the Services, you may be exposed to Content that might be offensive, harmful, inaccurate or otherwise inappropriate, or in some cases, postings that have been mislabeled or are otherwise deceptive. All Content is the sole responsibility of the person who originated such Content. We may not monitor or control the Content posted via the Services and, we cannot take responsibility for such Content. We reserve the right to remove Content that violates the User Agreement, including for example, copyright or trademark violations or other intellectual property misappropriation, impersonation, unlawful conduct, or harassment. Information regarding specific policies and the process for reporting or appealing violations can be found in our Help Center "
getPhrases(blockOfText);

//(async (function getPhrases() {
    //let phraseData = await (downloadData());
function getPhrases(blockOfText) {
    var TOASTTranslation = new Array();
    
    
    axios.get('http://www.toastapp.infinityfreeapp.com/getDatabaseData.php')
    .then((response) => {
        phrases = response.data;
        var sentences = blockOfText.split(".");

        // var sentences = sentence.split(";");
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
                    let testSentence = new TOSSentence(sentences[i], true, phrases[j]['phraseID'], phrases[j]['phrase'], phrases[j]['UIType'], phrases[j]['imageName'], phrases[j]['sourceURL'], toastScore);
                    //testSentence.getDetails()
                    TOASTTranslation.push(testSentence)
                    foundTranslation = true
                    break;
                }
            }
            if (!foundTranslation && sentences[i] != "") {
                let testSentence = new TOSSentence(sentences[i], false);
                TOASTTranslation.push(testSentence)
                //testSentence.getDetails()
            }
        }
        console.log(TOASTTranslation)
        return (TOASTTranslation);
        //  res.end("Done!");
        //parseParagraph(blockOfText);
    });
}
