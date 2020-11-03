
function TOSSentence(sentence, isHighlight, phraseID, phrase, UIType, imageName) {
    this.sentence = sentence;
    this.isHighlight =  isHighlight;
    this.phraseID = phraseID;
    this.phrase = phrase;
    this.UIType = UIType;
    this.imageName = imageName;
    
    this.getDetails = function() {
        console.log("Initial Sentence: "+this.sentence)
        if (this.isHighlight) {
            console.log("TOAST translation: "+ this.phrase)
        }
        else {
            console.log("Not translated!")
        }
        console.log("\n")
    };
  };
module.exports = TOSSentence;
//let testSentence = new TOSSentence("testing!", true, 32, "Test Phrase", "Images", "Fun!");
//testSentence.getDetails()
