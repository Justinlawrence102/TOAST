const natural = require('natural');
const fetch = require("node-fetch");

var phrases = new Array();

getPhrases();

async function getPhrases() {
    let phraseData = await downloadData();
    phrases = phraseData
   // console.log(phrases[0]["words"]);
    var blockOfText = "If you violate these Terms, we may stop providing Services to you or we may close your Microsoft account. We may also block delivery of a communication (like email, file sharing or instant message) to or from the Services in an effort to enforce these Terms or we may remove or refuse to publish Your Content for any reason. When investigating alleged violations of these Terms, Microsoft reserves the right to review Your Content in order to resolve the issue. However, we cannot monitor the entire Services and make no attempt to do so."
    //var blockOfText = "If you’re under the age required to manage your own Google Account, you must have your parent or legal guardian’s permission to use a Google Account. Please have your parent or legal guardian read these terms with you. If you’re a parent or legal guardian, and you allow your child to use the services, then these terms apply to you and you’re responsible for your child’s activity on the services"
    parseParagraph(blockOfText);
}

async function downloadData() {
    var url = "http://www.toastapp.infinityfreeapp.com/getDatabaseData.php";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function parseParagraph(paragraph) {
    var sentences = paragraph.split(".");
    for (i = 0; i < sentences.length; i++) {
        natural.PorterStemmer.attach();
        //splits up by sentance
        var curSentence = sentences[i].tokenizeAndStem()
        //loop through common phrases to find potentail matches
        console.log("testing sentence: ")
        console.log(sentences[i])
        for (j = 0; j < phrases.length; j++) {
            var numMatches = 0
            //console.log(phrases[j]["words"])
            for( k = 0; k < curSentence.length; k++) { //loops through each word
                //console.log(curSentence[k])
                if (phrases[j]["words"].includes(curSentence[k])) {
                    numMatches ++
                }
            }
            var percentMatch = (numMatches/phrases[j]["words"].length)
           // console.log(percentMatch)
            if (percentMatch >= 0.4) {
                console.log("found match! ")
                console.log(numMatches)
                console.log(phrases[j]["words"].length)
                console.log(phrases[j]["phrase"])
                console.log("\n")
                //break
            }
        }
    }
}

