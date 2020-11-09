const natural = require('natural');
const fetch = require("node-fetch");
let TOSSentence = require('./TOSSentenceObject');


var phrases = new Array();


getPhrases();

async function getPhrases() {
    let phraseData = await downloadData();
    phrases = phraseData
   // console.log(phrases[0]["words"]);
    //var blockOfText = "If you violate these Terms, we may stop providing Services to you or we may close your Microsoft account. We may also block delivery of a communication (like email, file sharing or instant message) to or from the Services in an effort to enforce these Terms or we may remove or refuse to publish Your Content for any reason. When investigating alleged violations of these Terms, Microsoft reserves the right to review Your Content in order to resolve the issue. However, we cannot monitor the entire Services and make no attempt to do so."
    var blockOfText = "You may end your legal agreement with Twitter at any time by deactivating your accounts and discontinuing your use of the Services6. See https://help.twitter.com/en/managing-your-account/how-to-deactivate-twitter-account (and for Periscope, https://help.pscp.tv/customer/portal/articles/2460220) for instructions on how to deactivate your account and the Privacy Policy for more information on what happens to your information. We may suspend or terminate your account or cease providing you with all or part of the Services at any time for any or no reason, including, but not limited to, if we reasonably believe: (i) you have violated these Terms or the Twitter Rules and Policies or Periscope Community Guidelines, (ii) you create risk or possible legal exposure for us; (iii) your account should be removed due to unlawful conduct, (iv) your account should be removed due to prolonged inactivity (v) our provision of the Services to you is no longer commercially viable.  We will make reasonable efforts to notify you by the email address associated with your account or the next time you attempt to access your account, depending on the circumstances. In all such cases, the Terms shall terminate, including, without limitation, your license to use the Services, except that the following sections shall continue to apply: II, III, V, and VI. If you believe your account was terminated in error you can file an appeal following the steps found in our Help Center (https://help.twitter.com/forms/general?subtopic=suspended). For the avoidance of doubt, these Terms survive the deactivation or termination of your account."
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
                //console.log(phrases[j]["words"])
                for (x = 0; x<phrases[j]["words"].length; x++) {
                    if ((phrases[j]["words"][x]["word"]) == curSentence[k]) {
                        toastScore = toastScore + phrases[j]["words"][x]["score"]
                        break
                    }
                }
//                if (phrases[j]["words"]["word"].includes(curSentence[k])) {
//                    numMatches ++
//                }
            }
           // var percentMatch = (numMatches/phrases[j]["words"].length)
           // console.log(percentMatch)
            if (toastScore >= 8) {
                console.log(toastScore)
                let testSentence = new TOSSentence(sentences[i], true, phrases[j]["phraseID"], phrases[j]["phrase"], phrases[j]["uiType"], phrases[j]["imageName"]);
                testSentence.getDetails()
                foundTranslation = true
                break
            }
        }
        if (!foundTranslation && sentences[i] != "") {
                let testSentence = new TOSSentence(sentences[i], false);
                testSentence.getDetails()
        }
    }
}

