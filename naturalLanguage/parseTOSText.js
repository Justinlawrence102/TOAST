const natural = require('natural');
const fetch = require("node-fetch");
let TOSSentence = require('./TOSSentenseObject');
//require('./TOSSentenseObject.js');


var phrases = new Array();
//function TOSSentence(sentence, isHighlight, phraseID, phrase, UIType, imageName) {
//    this.sentence = sentence;
//    this.isHighlight =  isHighlight;
//    this.phraseID = phraseID;
//    this.phrase = phrase;
//    this.UIType = UIType;
//    this.imageName = imageName;
//
//    this.getDetails = function() {
//        console.log("Initial Sentence: "+this.sentence+"\n TOAST translation: "+ this.phrase)
//    };
//  };
//
//let testSentence = new TOSSentence("testing!", true, 32, "Test Phrase", "Images", "Fun!");
//testSentence.getDetails()

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
    data = '[{"phraseID":19,"phraseTitle":null,"phrase":"You must be 16 years or older to enter into the terms of the service. The Service is not intended for children under 16","UIType":"Typographic Manipulation","importanceScore":10,"privacyScore":0,"words":["16","year","us","enter","intend"]},{"phraseID":28,"phraseTitle":null,"phrase":"You may need to create an account with a valid payment method to use the Service","UIType":"Typographic Manipulation","importanceScore":7,"privacyScore":0,"words":["account","log","payment","valid","us","servc"]},{"phraseID":30,"phraseTitle":null,"phrase":"If you are under the age 18, you much only use the service with a parent or gaurdian","UIType":"Typographic Manipulation","importanceScore":10,"privacyScore":0,"words":["18",null,"parent","gaurdian"]},{"phraseID":38,"phraseTitle":null,"phrase":"You enter a legally binding contract to purchase when you commit to buy an item, even if you are interacting with a 3rd party seller","UIType":"Typographic Manipulation","importanceScore":7,"privacyScore":0,"words":["legal","bind","contract","commit","bui","item","3rd","parti"]},{"phraseID":5,"phraseTitle":"will finish (Hannah)","phrase":"All conent is the responsibitity of the person who created the content.","UIType":"Pull Quotes and Factoids","importanceScore":6,"privacyScore":0,"words":["legal","respons","post","conet","respons"]},{"phraseID":10,"phraseTitle":null,"phrase":"You agree to not misuse the Service","UIType":"Pull Quotes and Factoids","importanceScore":10,"privacyScore":0,"words":["agre","not","misus","servic"]},{"phraseID":11,"phraseTitle":null,"phrase":"We are not liable for loss or damage if you do not comply with any of the terms listed here","UIType":"Pull Quotes and Factoids","importanceScore":7,"privacyScore":0,"words":["not","liabl","loss","damag","failur","compli","term"]},{"phraseID":18,"phraseTitle":null,"phrase":"The Service will maintain reasonalbe safegaurds to prevent unauthorized access to your Conent","UIType":"Pull Quotes and Factoids","importanceScore":8,"privacyScore":0,"words":["maintain","reason","prevent","unathor","access"]},{"phraseID":21,"phraseTitle":null,"phrase":"If you cancel your payments to the Service, you will not receive a refund for any service already paid for","UIType":"Pull Quotes and Factoids","importanceScore":8,"privacyScore":0,"words":["cancel","not","refund","servc","paid"]},{"phraseID":29,"phraseTitle":null,"phrase":"You are responsible for maintaining the confidentility of you account user name and password. You accept responsibility for activities that occur when signed into your account","UIType":"Pull Quotes and Factoids","importanceScore":6,"privacyScore":0,"words":["respons","confidenti","password","account","access","respons"]},{"phraseID":35,"phraseTitle":null,"phrase":"If we beleive you are misusing the Service in any way, we may, at our own discretion, reove your account and access to the Service","UIType":"Pull Quotes and Factoids","importanceScore":4,"privacyScore":0,"words":["abus","discret","termin","account","misus"]},{"phraseID":0,"phraseTitle":"Legal Guardian Required","phrase":"consent from a Legal Guardian is required if under age 13 to use this service","UIType":"Iconic symbols","importanceScore":8,"privacyScore":0,"words":["legal","gardian","respons","child","under","ag","underag","at","least"]},{"phraseID":4,"phraseTitle":"May Include Offensive\/Harmful Content","phrase":"You may be exposed on offensive, harmfull, or inacurrate content. Use at your own discgrssion","UIType":"Iconic symbols","importanceScore":8,"privacyScore":0,"words":["expos","offens","harm","inaccur","inappropri","reserv","liabl","transmit","conent"]},{"phraseID":8,"phraseTitle":null,"phrase":"The Service may evolve its rules how 3rd parties may interact with your content","UIType":"Iconic symbols","importanceScore":8,"privacyScore":0,"words":["evolv","rule","partner","3rd","parti","interact","content"]},{"phraseID":9,"phraseTitle":null,"phrase":"You may be exposed to 3rd party advertising while view content on the service","UIType":"Iconic symbols","importanceScore":4,"privacyScore":0,"words":["third","advertis","content","inform"]},{"phraseID":15,"phraseTitle":null,"phrase":"You may not preform any actions that may disrupt, abuse, or interfers with the Servers network","UIType":"Iconic symbols","importanceScore":6,"privacyScore":0,"words":["abus","interfer","distrupt","network"]},{"phraseID":16,"phraseTitle":null,"phrase":"You may not use the Service in order to copy or create a compeative product","UIType":"Iconic symbols","importanceScore":6,"privacyScore":0,"words":["build","copi","featur","competit","function"]},{"phraseID":24,"phraseTitle":null,"phrase":"You must comply with applicable laws, including export control, sanctions, and human trafficking laws.","UIType":"Iconic symbols","importanceScore":7,"privacyScore":0,"words":["follow","obei","laws","unlaw"]},{"phraseID":27,"phraseTitle":null,"phrase":"All content included in the Service including text, graphics, logos, and images is the property of the Service, and it is protected by US copyright law","UIType":"Iconic symbols","importanceScore":5,"privacyScore":0,"words":["content","text","graphic","logo","imag","audio","download","properti","copyright","law","protect"]},{"phraseID":33,"phraseTitle":null,"phrase":"By using our Products, you agree that we can show you ads that we think will be relevant to you and your interests. We use your personal data to help determine which ads to show you.","UIType":"Iconic symbols","importanceScore":8,"privacyScore":0,"words":["ad","advertis","person","inform"]},{"phraseID":34,"phraseTitle":null,"phrase":"You may not use this service to post or update inappropiate content, brake any laws, or post any false or misleading content","UIType":"Iconic symbols","importanceScore":8,"privacyScore":0,"words":["content","post","upload","inappropi","law","breach","inacur","mislead"]},{"phraseID":41,"phraseTitle":null,"phrase":"this content is presented for general informational purposes only. It should not be taken as professional advice","UIType":"Iconic symbols","importanceScore":6,"privacyScore":0,"words":[]},{"phraseID":1,"phraseTitle":"Do Not Post Prohibited Content","phrase":"You must not use the product in any way that is unlawful, misleading, discriminatory or fraudulent","UIType":"Vignettes","importanceScore":10,"privacyScore":0,"words":["violat","commun","standard","polici"]},{"phraseID":2,"phraseTitle":"You Are Responsible","phrase":"You are responsible for your use of the Service and any content you post","UIType":"Vignettes","importanceScore":8,"privacyScore":0,"words":["respons","conent","law","provide"]},{"phraseID":7,"phraseTitle":null,"phrase":"By submitting content, you provide us a royalty-free license to use, copy, adapt, and distribute content at any time","UIType":"Vignettes","importanceScore":10,"privacyScore":0,"words":["submit","grant","royalti","licens","copi","reproduc","adapt","displai","distribut","content","later","host",null,"publish","perform","modifi","deriv","worldwid","exclus","non","exclus"]},{"phraseID":12,"phraseTitle":null,"phrase":"You may end the legal agreement with the service by deactivating your account and disconnect from the Service","UIType":"Vignettes","importanceScore":10,"privacyScore":0,"words":["end","agreement","deactiv","discontinu","legal","stop","us","close","remov"]},{"phraseID":14,"phraseTitle":null,"phrase":"You may not mdify, decompile, or revse engineer the service to attempt to gain access to the source code","UIType":"Vignettes","importanceScore":8,"privacyScore":0,"words":["modifi","decompil","access","code"]},{"phraseID":17,"phraseTitle":null,"phrase":"You may not reporduce, resell, or redistribute the Serice or data gathered by the Service","UIType":"Vignettes","importanceScore":8,"privacyScore":0,"words":["reproduc","resel","distribut","data"]},{"phraseID":20,"phraseTitle":null,"phrase":"The Service may charge your credit card for any charge or fees on your account","UIType":"Vignettes","importanceScore":8,"privacyScore":0,"words":["charg","credit","card","account","amount","due"]},{"phraseID":22,"phraseTitle":null,"phrase":"The Service is not designed to be used in hazardous enviernments","UIType":"Vignettes","importanceScore":5,"privacyScore":0,"words":["not","design","hazard","environment","fail","safe"]},{"phraseID":25,"phraseTitle":null,"phrase":"You must respect the rights of others, including their intellectual and property rights.","UIType":"Vignettes","importanceScore":7,"privacyScore":0,"words":["respect","right","bulli","harm","abuse","threaten","mislead","defraud","defam","harass","stalk","mislead","discrimanatori","discrimin"]},{"phraseID":26,"phraseTitle":null,"phrase":"You consent to the communication from the Service by means of email, text, or modile push notices","UIType":"Vignettes","importanceScore":4,"privacyScore":0,"words":["consent","receiv","email","text","commun","push"]},{"phraseID":32,"phraseTitle":null,"phrase":"Any disputes made with the Service may be resolved by binding arbittration rather than in court","UIType":"Vignettes","importanceScore":5,"privacyScore":0,"words":["disput","claim","resolv","bind","arbitr"]},{"phraseID":36,"phraseTitle":null,"phrase":"If an account is unused for an extended period of time, we may cancel the account","UIType":"Vignettes","importanceScore":3,"privacyScore":0,"words":["cancel","account","inact","period","time","extend"]},{"phraseID":37,"phraseTitle":null,"phrase":"You must have a payment method on file to use the Service, and pay all taces and fees by the payment due date","UIType":"Vignettes","importanceScore":8,"privacyScore":0,"words":["payment","file","pai","fee"]},{"phraseID":3,"phraseTitle":"At Your Own Risk","phrase":"Use and or reliance on the Content provided by the Service is at your own risk. We can not guarantee completness or truthfulness","UIType":"Textured","importanceScore":10,"privacyScore":0,"words":["provid","us","relianc",null,"risk","complet","truth"]},{"phraseID":6,"phraseTitle":null,"phrase":"We reserve the right to remove any conent that violates the terms of service. This includes copyrite, trademark violations, unlawful behavior, or harassment","UIType":"Textured","importanceScore":6,"privacyScore":0,"words":["right","remov","content","violat","trademark","copyright","haras"]},{"phraseID":13,"phraseTitle":null,"phrase":"We will try to notify you when the Terms of Serivce changes. Once you continue using the Service, you agree to the revised Terms","UIType":"Textured","importanceScore":5,"privacyScore":0,"words":["notifi","revis","chang","bound","agre","term","agreement","amend"]},{"phraseID":23,"phraseTitle":null,"phrase":"At any time and or any reason, features, functionalities, and services may be added, removed, or modified.","UIType":"Textured","importanceScore":5,"privacyScore":0,"words":["featur","function","chang","modifi","offer"]},{"phraseID":31,"phraseTitle":null,"phrase":"You many not use a false email to impersonate any person, or mislead others about your identity","UIType":"Textured","importanceScore":7,"privacyScore":0,"words":["fals","ident","imperson","mislead","content"]},{"phraseID":39,"phraseTitle":null,"phrase":"The Service may contact you vie a prerecorded call or text message to notify you about your account, or other reasons","UIType":"Textured","importanceScore":6,"privacyScore":0,"words":["autodi","precal","text","telephon","regard","account","dispbut","debt"]},{"phraseID":40,"phraseTitle":null,"phrase":"we do not represent or guarantee the truthfulness, accuracy, or reliability of any submitted community content","UIType":"Textured","importanceScore":10,"privacyScore":0,"words":[]}]'
    return JSON.parse(data);//data.json();
    //    var url = "http://www.toastapp.infinityfreeapp.com/getDatabaseData.php";
    //    try {
    //        let res = await fetch(url);
    //        return await res.json();
    //    } catch (error) {
    //        console.log(error);
    //    }
}

function parseParagraph(paragraph) {
    var sentences = paragraph.split(".");
    for (i = 0; i < sentences.length; i++) {
        var foundTranslation = false;
        natural.PorterStemmer.attach();
        //splits up by sentance
        var curSentence = sentences[i].tokenizeAndStem()
        //loop through common phrases to find potentail matches
//        console.log("testing sentence: ")
//        console.log(sentences[i])
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
                //console.log("found match! ")
//                console.log(numMatches)
//                console.log(phrases[j]["words"].length)
//                console.log(phrases[j]["phrase"])
//                console.log("\n")
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

